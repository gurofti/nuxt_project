<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="Paylaşım Bilgileri"></Step>
      <Step title="Paylaşım Dosyaları"></Step>
      <Step title="Paylaşım Detayları"></Step>
    </Steps>
    <br>

    <!-- Step 1 -->
    <div v-show="current===0">
      <PublisherPostForm
        formAction="create"
        :basicKnowledge="basicKnowledge"
        :formData="formData"/>
    </div>

    <!-- Step 2 -->
    <div v-if="current===1">
      <UploadFile
        @fileSuccess="fileSuccess($event)"
        @loadingButton="loadingButton($event)"
        @fileCount="fileCountPlus"
        :uploadDetail="uploadDetail"
      />
    </div>

    <!-- Step 3 -->
    <div v-if="current===2" style="margin: 0 auto">
      <PublisherPostDetails type="create" :uploadDetail="uploadDetail" />
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
import {mapActions, mapState} from "vuex";
import {EDUCATION_DELETE, TRAININGS} from "@/store/constants";
import UploadFile from "@/components/general/form/UploadFile";
import PublisherPostForm from "@/components/publishers/posts/PublisherPostForm";
import PublisherPostDetails from "@/components/publishers/posts/PublisherPostDetails";

export default {
  head: {
    title: 'Paylaşım Oluştur - Sualsizler',
  },
  components: {
    UploadFile,
    PublisherPostForm,
    PublisherPostDetails
  },
  data() {
    return {
      current: 0,
      fileCount: 0,
      loading: false,
      basicKnowledge: false,
      formData: {
        publisherPostId: null,
        publisherPostContent: '',
        publisherPostStatus: ''
      },
      headers: {
        Authorization: `${this.$auth.strategy.token.get()}`,
      },
      uploadDetail: {
        multiple: true,
        maxSize: 102400,
        data: {
          action: 'publisher_post_attachment',
          attachmentId: null
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['jpg', 'jpeg', 'png', 'mp4']
      },
    }
  },
  computed: {
    ...mapState('publishers', {
      item: state => state.item
    })
  },
  methods: {
    ...mapActions('educations', {
      educationDelete: EDUCATION_DELETE
    }),
    async formCancel () {
      if (this.item) {
        await this.educationDelete({
          educationId: this.item.data.educationId,
          type: 'cancel'
        })
      }
      await this.$router.push('/education')
    },
    async handleSubmit() {
      if (this.current === 0) {
        this.basicKnowledge = !this.basicKnowledge
      }
    },
    loadingButton(data) {
      if (this.fileCount !== 0) {
        this.loading = true
      }
    },
    fileSuccess(data) {
      if (this.fileCount === 0) {
        this.loading = false
        if (data) this.next()
      }
    },
    next() {
      this.current === 3 ? this.current = 0 : this.current += 1
    },
    fileCountPlus(type) {
      type === 1 ? this.fileCount++ : this.fileCount--
    }
  },
  watch: {
    item (item) {
      this.uploadDetail.data.attachmentId = item.data.post.id
      if (item) this.next()
    }
  }
}
</script>
