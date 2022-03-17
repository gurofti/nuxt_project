<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="Eğitim Bilgileri"></Step>
      <Step title="Eğitim Görseli"></Step>
      <Step title="Eğitim Detayları"></Step>
    </Steps>
    <br>

    <!-- Step 1 -->
    <EducationForm
      formAction="create"
      :basicKnowledge="basicKnowledge"
      :formData="formData"
      v-show="current===0"/>

    <!-- Step 2 -->
    <UploadFile
      v-if="current===1"
      @fileSuccess="fileSuccess($event)"
      @loadingButton="loadingButton($event)"
      :uploadDetail="uploadDetail"
    />

    <!-- Step 3 -->
    <div v-if="current===2" style="margin: 0 auto">
      <EducationSubCategory type="create" :uploadDetail="uploadDetail" />
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
import EducationForm from "@/components/educations/EducationForm";
import EducationSubCategory from "@/components/educations/EducationSubCategory";

export default {
  head: {
    title: 'Eğitimi Oluştur - Sualsizler',
  },
  components: {
    UploadFile,
    EducationForm,
    EducationSubCategory
  },
  data() {
    return {
      current: 0,
      loading: false,
      basicKnowledge: false,
      formData: {
        trainingId: '',
        educationName: '',
        educationDescription: '',
        educationStatus: ''
      },
      headers: {
        Authorization: `${this.$auth.strategy.token.get()}`,
      },
      uploadDetail: {
        multiple: false,
        maxSize: 102400,
        data: {
          action: 'education_attachment',
          attachmentId: null
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['jpg', 'jpeg', 'png']
      },
    }
  },
  computed: {
    ...mapState('educations', {
      item: state => state.item
    })
  },
  methods: {
    ...mapActions('trainings', {
      trainingsGet: TRAININGS
    }),
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
      this.loading = data
    },
    fileSuccess(data) {
      if (data) this.next()
    },
    next() {
      this.current === 3 ? this.current = 0 : this.current += 1
    },
  },
  created() {
    if (this.trainings !== null) this.trainingsGet()
  },
  watch: {
    item (item) {
      this.uploadDetail.data.attachmentId = item.data.educationId
      if (item) this.next()
    }
  }
}
</script>
