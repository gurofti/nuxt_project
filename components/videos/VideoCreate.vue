<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="Video Bilgileri"></Step>
      <Step title="Video Dosyası"></Step>
      <Step title="Video Detayları"></Step>
    </Steps>
    <br>

    <!-- Step 1 -->
    <VideoForm
      formAction="create"
      :basicKnowledge="basicKnowledge"
      :formData="formData"
      v-show="current===0" />

    <!-- Step 2 -->
    <UploadFile
      v-if="current===1"
      @fileSuccess="fileSuccess($event)"
      @loadingButton="loadingButton($event)"
      :uploadDetail="uploadDetail"
    />

    <!-- Step 3 -->
    <div v-if="current===2" style="margin: 0 auto">
      <VideoActionDetails type="create"/>
    </div>

    <!-- Submit -->
    <div class="demo-drawer-footer" v-if="current !== 2">
      <Button @click="formCancel" style="margin-right: 8px">
        {{ $t('cancel') }}
      </Button>
      <Button type="primary"
              :loading="loading"
              @click="handleSubmit()">
        <span v-if="!loading">{{ $t('continue') }}</span>
        <span v-else>{{ $t('waiting') }}</span>
      </Button>
    </div>

  </div>
</template>

<script>
import VideoForm from "@/components/videos/VideoForm";
import UploadFile from "@/components/general/form/UploadFile";
import VideoActionDetails from "@/components/videos/VideoActionDetails";
import {VIDEO_DELETE, VIDEO_NEW_ITEM_DETAILS} from "@/store/constants";
import {mapActions, mapGetters} from "vuex";

export default {
  head: {
    title: 'Video Oluştur - Sualsizler',
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
      basicKnowledge: false,
      formData: {
        videoSubCategory: null,
        videoTitle: '',
        videoDescription: '',
        videoListNo: '',
        videoStatus: '1'
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
      videoDelete: VIDEO_DELETE
    }),
    async formCancel () {
      if (this.current === 0) {
        await this.$router.push('/video')
      } else {
        await this.videoDelete({
          videoId: this.uploadDetail.data.attachmentId
        })
        return this.$router.push('/video')
      }
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
  watch: {
    item (item) {
      console.log('item change', item.video.id)
      this.uploadDetail.data.attachmentId = item.video.id
      if (item) this.next()
    }
  }
}
</script>

<style scoped>

</style>
