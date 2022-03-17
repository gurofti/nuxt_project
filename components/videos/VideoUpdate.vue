<template>
  <div>
    <!-- Step 1 -->
    <div class="mt-2">
      <Divider orientation="left">Video Bilgileri</Divider>
    </div>
    <VideoForm
      v-if="videoFormArea"
      formAction="update"
      :basicKnowledge="basicKnowledge"
      :formData="formData" />

    <!-- Submit -->
    <div class="demo-drawer-footer" v-if="current !== 2">
      <Button @click="formCancel" style="margin-right: 8px">
        {{ $t('cancel') }}
      </Button>
      <Button type="primary"
              :loading="loading"
              @click="handleSubmit()">
        <span v-if="!loading">{{ $t('update') }}</span>
        <span v-else>{{ $t('waiting') }}</span>
      </Button>
    </div>

    <!-- Step 2 -->
    <div class="mt-16">
      <Divider orientation="left">Video Dosyası</Divider>
    </div>
    <UploadFile
      @fileSuccess="fileSuccess($event)"
      @loadingButton="loadingButton($event)"
      :uploadDetail="uploadDetail"
    />

  </div>
</template>

<script>
import VideoForm from "@/components/videos/VideoForm";
import UploadFile from "@/components/general/form/UploadFile";
import VideoActionDetails from "@/components/videos/VideoActionDetails";
import {VIDEO_FIND, VIDEO_NEW_ITEM_DETAILS,} from "@/store/constants";
import {mapActions, mapGetters} from "vuex";

export default {
  head: {
    title: 'Video Güncelle - Sualsizler',
  },
  components: {
    VideoForm,
    UploadFile,
    VideoActionDetails
  },
  data () {
    return {
      current: 0,
      loading: false,
      videoFormArea: false,
      basicKnowledge: false,
      formData: {
        videoSubCategory: null,
        videoTitle: '',
        videoDescription: '',
        videoListNo: '',
        videoStatus: '1',
        videoPlusSubCategoryId: null,
      },
      uploadDetail: {
        multiple: false,
        maxSize: 102400,
        data: {
          action: 'education_video',
          attachmentId: null
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['mp4']
      }
    }
  },
  computed: {
    ...mapGetters('videos', {
      item: VIDEO_NEW_ITEM_DETAILS
    })
  },
  methods: {
    ...mapActions('videos', {
      videoFind: VIDEO_FIND,
    }),
    formCancel () {
      this.$router.push('/video')
    },
    handleSubmit() {
      if (this.current === 0) {
        this.basicKnowledge = !this.basicKnowledge
      }
    },
    loadingButton(data) {
      this.loading = data
    },
    fileSuccess(data) {
      if (data) this.next()
    },
    next() {
      this.current === 3 ? this.current = 0 : this.current += 1
    },
  },
  async mounted() {
    await this.videoFind({videoId: this.$route.params.id})
      .then(edu => {
        if (!edu) {
          this.$Message.error(this.$t('isNotFound'));
          return this.$router.push('/video')
        }
        const {id, createdBy, title, description, list_no, status} = edu.data.video
        this.formData.videoId = id
        this.formData.createdByName = createdBy.fullName
        this.formData.videoTitle = title
        this.formData.videoDescription = description
        this.formData.videoListNo = list_no.toString()
        this.formData.videoStatus = status
        this.formData.videoSubCategoryDetail = edu.data.subCategory ?? null
        this.formData.videoPlusSubCategoryId = edu.data.subCategory.id.toString() ?? null
        this.formData.videoPlusSubCategoryTitle = edu.data.subCategory.title.toString() ?? null

        this.uploadDetail.data.attachmentId = edu.data.video.id
      })
    this.videoFormArea = true
  },
  watch: {
    item (item) {
      this.uploadDetail.data.attachmentId = item.video.id
      if (item) this.next()
    }
  }
}
</script>

<style scoped>

</style>
