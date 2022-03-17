<template>
  <div>
    <!-- Step 1 -->
    <div class="mt-2">
      <Divider orientation="left">Paylaşım Bilgileri</Divider>
    </div>
    <PublisherPostForm
      formAction="update"
      :basicKnowledge="basicKnowledge"
      :formData="formData" />

    <!-- Submit -->
    <div class="demo-drawer-footer">
      <n-link to="/education">
        <Button style="margin-right: 8px">
          {{ $t('cancel') }}
        </Button>
      </n-link>
      <Button type="primary"
              :loading="loading"
              @click="handleSubmit()">
        <span v-if="!loading">{{ $t('update') }}</span>
        <span v-else>{{ $t('waiting') }}</span>
      </Button>
    </div>

    <!-- Step 2 -->
    <div class="mt-10">
      <Divider orientation="left">Paylaşım Dosyaları</Divider>
    </div>
    <UploadFile
      @fileSuccess="fileSuccess($event)"
      @loadingButton="loadingButton($event)"
      @fileCount="fileCountPlus"
      :uploadDetail="uploadDetail"
    />

    <!-- Step 3 -->
    <div class="mt-10">
      <PublisherPostDetails v-if="postDetailArea" type="update" :postDetail="postDetail" :uploadDetail="uploadDetail" />
    </div>

  </div>
</template>
<script>
import {mapActions} from "vuex";
import {PUBLISHER_POST_FIND} from "@/store/constants";
import UploadFile from "@/components/general/form/UploadFile";
import PublisherPostForm from "@/components/publishers/posts/PublisherPostForm";
import PublisherPostDetails from "@/components/publishers/posts/PublisherPostDetails";

export default {
  head: {
    title: 'Paylaşım Güncelle - Sualsizler',
  },
  components: {
    UploadFile,
    PublisherPostForm,
    PublisherPostDetails
  },
  data() {
    return {
      loading: false,
      fileCount: 0,
      basicKnowledge: false,
      postDetailArea: false,
      postDetail: null,
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
  methods: {
    ...mapActions('publishers', {
      publisherPostFind: PUBLISHER_POST_FIND
    }),
    async handleSubmit() {
      this.basicKnowledge = !this.basicKnowledge
    },
    loadingButton(data) {
      if (this.fileCount !== 0) {
        this.loading = true
        this.postDetailArea = false
      }
    },
    fileSuccess(data) {
      if (this.fileCount === 0) {
        this.postDetailArea = true
        this.loading = false
      }
    },
    fileCountPlus(type) {
      type === 1 ? this.fileCount++ : this.fileCount--
    }
  },
  async mounted() {
    await this.publisherPostFind({publisherPostId: this.$route.params.id})
      .then(res => {
        let data = res.data
        if (!res) {
          this.$Message.error(this.$t('isNotFound'));
          return this.$router.push('/publisher/post')
        }
        this.postDetail = data
        this.formData.publisherPostId = data.post.id
        this.formData.publisherPostContent = data.post.content
        this.formData.publisherPostStatus = data.post.status
        this.uploadDetail.data.attachmentId = data.post.id

        this.postDetailArea = true
      })
  }
}
</script>
