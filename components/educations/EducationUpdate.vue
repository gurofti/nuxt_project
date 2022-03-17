<template>
  <div>
    <!-- Step 1 -->
    <div class="mt-2">
      <Divider orientation="left">Eğitim Bilgileri</Divider>
    </div>
    <EducationForm
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
      <Divider orientation="left">Eğitim Görseli</Divider>
    </div>
    <UploadFile
      @fileSuccess="fileSuccess($event)"
      @loadingButton="loadingButton($event)"
      :uploadDetail="uploadDetail"
    />

    <!-- Step 3 -->
    <div class="mt-10">
      <EducationSubCategory v-if="subCategoryArea" type="update" :uploadDetail="uploadDetail" />
    </div>

  </div>
</template>
<script>
import {mapActions} from "vuex";
import {EDUCATION_FIND, TRAININGS} from "@/store/constants";
import UploadFile from "@/components/general/form/UploadFile";
import EducationForm from "@/components/educations/EducationForm";
import EducationSubCategory from "@/components/educations/EducationSubCategory";

export default {
  head: {
    title: 'Eğitimi Güncelle - Sualsizler',
  },
  components: {
    UploadFile,
    EducationForm,
    EducationSubCategory
  },
  data() {
    return {
      loading: false,
      subCategoryArea: false,
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
          attachmentId: null,
          items: []
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['jpg', 'jpeg', 'png']
      },
    }
  },
  methods: {
    ...mapActions('educations', {
      educationFind: EDUCATION_FIND
    }),
    async handleSubmit() {
      this.basicKnowledge = !this.basicKnowledge
    },
    loadingButton(data) {
      this.loading = data
    },
    fileSuccess () {
      //
    }
  },
  async mounted() {
    await this.educationFind({educationId: this.$route.params.id})
      .then(edu => {
        if (!edu) {
          this.$Message.error(this.$t('isNotFound'));
          return this.$router.push('/education')
        }
        this.formData = edu.education
        this.uploadDetail.data.attachmentId = edu.education.educationId
        this.uploadDetail.data.items = edu.educationSubCategories
        this.subCategoryArea = true
      })
  }
}
</script>
