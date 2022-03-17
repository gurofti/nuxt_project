<template>
  <Upload
    :multiple="uploadDetail.multiple"
    name="file"
    type="drag"
    :max-size="uploadDetail.maxSize"
    :headers="headers"
    :data="uploadDetail.data"
    :disabled="disabled"
    :action="uploadDetail.action"
    :format="uploadDetail.format"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
  >
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p v-if="disabledPri===true" class="text-red-500">{{ disabledPriMessage }}</p>
      <p>{{ $t('drag.description') }}</p>
      <small class="uppercase">{{ formatList }}</small>
    </div>
  </Upload>
</template>

<script>
export default {
  props: {
    disabledPri: {
      default: false,
    },
    disabledPriMessage: {
      default: ''
    },
    fileCount: {
      default: 0
    },
    uploadDetail: {
      type: Object
    }
  },
  data () {
    return {
      disabled: false,
      file: '',
      formatList: '',
      headers: {
        Authorization: `${this.$auth.strategy.token.get()}`,
      }
    }
  },
  methods: {
    handleSuccess () {
      if (this.uploadDetail.multiple) {
        this.$emit('fileCount', -1)
      }
      this.loadingButtonAction(false)
      this.$emit('fileSuccess', 'true')
      this.$Message.success(this.$t('fileUploaded'))
    },
    handleError () {
      this.loadingButtonAction(false)
      this.$Message.error(this.$t('fileUploadError'));
    },
    handleFormatError (file) {
      this.loadingButtonAction(false)
      this.$Notice.warning({
        title: this.$t('drag.file_incorrect_title'),
        desc: this.$t('drag.file_incorrect_desc', {filename: file.name, format: this.uploadDetail.format.join(', ')})
      });
    },
    handleMaxSize (file) {
      this.loadingButtonAction(false)
      this.$Notice.warning({
        title: this.$t('drag.on_exceeded_title'),
        desc: this.$t('drag.on_exceeded_desc', {filename: file.name})
      });
    },
    async handleBeforeUpload () {
      if (this.uploadDetail.multiple) {
        await this.$emit('fileCount', 1)
      }
      await this.loadingButtonAction(true)
    },
    loadingButtonAction(data) {
      this.disabled = data
      this.$emit('loadingButton', data)
    }
  },
  watch: {
    uploadDetail (status) {
      //
    },
    disabledPri (data) {
      if (!data) {
        this.disabled = false
      }
    }
  },
  created() {
    this.disabled = this.disabledPri
    this.formatList = this.uploadDetail.format.join(', ')
  }
}
</script>

<style scoped>

</style>
