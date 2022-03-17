<template>
  <div>

    <!-- Step 1 -->
    <div class="mt-4">
      <Divider orientation="left">Soru Bilgileri</Divider>
    </div>
    <QuestionForm
      v-if="questionFormArea"
      formAction="update"
      :basicKnowledge="basicKnowledge"
      :formData="formData"
      />

    <!-- Submit -->
    <div class="demo-drawer-footer">
      <Button @click="formCancel" style="margin-right: 8px">
        {{ $t('cancel') }}
      </Button>
      <Button type="primary"
              :loading="loading"
              @click="handleSubmit(0)">
        <span v-if="!loading">{{ $t('update') }}</span>
        <span v-else>{{ $t('waiting') }}</span>
      </Button>
    </div>

    <!-- Step 2 -->
    <div class="mt-14">
      <Form :label-width="50" label-position="left">
        <Divider orientation="left">Soru Formatı</Divider>
        <p>Hazırladığınız soruyu bir yazı mı yoksa görsel şeklinde mi yükleyeceğinizi seçiniz. </p>
        <br>

        <!-- Question Type -->
        <FormItem label="Biçim">
          <Select v-model="formData.questionType" placeholder="Seçiniz">
            <Option v-for="type in typeSelection"
                    :value="type.value"
                    :key="type.value">{{ type.label }}</Option>
          </Select>
        </FormItem>

        <!-- Question Value -->
        <FormItem label="Değer">
          <UploadFile
            v-if="formData.questionType === '1'"
            @fileSuccess="fileSuccess($event)"
            @loadingButton="loadingButton($event)"
            :uploadDetail="uploadDetail"
          />
          <Input
            v-else
            v-model="formData.questionValue"
            type="textarea" placeholder="Soruyu yazınız." />
        </FormItem>

        <!-- Submit -->
        <div class="demo-drawer-footer"
             v-if="formData.questionType === '2'">
          <Button @click="formCancel" style="margin-right: 8px">
            {{ $t('cancel') }}
          </Button>
          <Button type="primary"
                  :loading="loading"
                  @click="handleSubmit(1)">
            <span v-if="!loading">{{ $t('update') }}</span>
            <span v-else>{{ $t('waiting') }}</span>
          </Button>
        </div>
      </Form>
    </div>

    <!-- Step 3 -->
    <div v-if="questionFormArea"
         style="margin: 0 auto">
      <QuestionAnswer class="mt-14"
                      :question="formData"
                      type="update" :items="items"/>
    </div>

  </div>
</template>
<script>
import {mapActions} from "vuex";
import {QUESTION_ANSWER_FIND, QUESTION_ATTACHMENT_UPDATE, QUESTION_FIND} from "@/store/constants";
import UploadFile from "@/components/general/form/UploadFile";
import QuestionForm from "@/components/questions/QuestionForm";
import QuestionAnswer from "@/components/questions/QuestionAnswer";

export default {
  head: {
    title: 'Soru Güncelle - Sualsizler',
  },
  components: {
    UploadFile,
    QuestionForm,
    QuestionAnswer
  },
  data() {
    return {
      current: 0,
      loading: false,
      questionFormArea: false,
      basicKnowledge: false,
      items: [],
      formData: {
        questionId: '',
        createdByName: '',
        questionName: '',
        questionType: '1',
        educationVideoId: null,
        questionListNo: '',
        questionStatus: '',
      },
      headers: {
        Authorization: `${this.$auth.strategy.token.get()}`,
      },
      uploadDetail: {
        multiple: false,
        maxSize: 102400,
        data: {
          action: 'question_attachment',
          attachmentId: null,
          type: '1',
          value: '',
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['jpg', 'jpeg', 'png']
      },
      typeSelection: [
        {
          label: 'Görsel',
          value: '1'
        },
        {
          label: 'Metin',
          value: '2'
        }
      ]
    }
  },
  methods: {
    ...mapActions('questions', {
      questionAttachmentUpdate: QUESTION_ATTACHMENT_UPDATE,
      questionFind: QUESTION_FIND,
      questionAnswerFind: QUESTION_ANSWER_FIND,
    }),
    async handleSubmit(type) {
      if (type === 0) {
        this.basicKnowledge = !this.basicKnowledge
      } else if (type === 1) {
        this.questionAttachmentUpdate({
          questionId: this.formData.questionId,
          questionAttachmentId: this.formData.questionAttachentId,
          value: this.formData.questionValue
        })
        this.next()
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
    formCancel () {
      this.$router.push('/question')
    }
  },
  async mounted() {
    await this.questionFind({questionId: this.$route.params.id})
      .then(res => {
        if (!res) {
          this.$Message.error(this.$t('isNotFound'));
          return this.$router.push('/question')
        }
        let data = res.data
        this.formData.questionId = data.question.id
        this.uploadDetail.data.attachmentId = data.question.id
        this.formData.createdByName = data.question.createdBy.fullName
        this.formData.questionName = data.question.name
        this.formData.questionListNo = data.question.listNo
        this.formData.questionStatus = data.question.status
        this.formData.questionAttachentId = data.questionAttachment.id
        this.formData.questionType = data.questionAttachment.type.toString()
        this.formData.questionValue = data.questionAttachment.type === '1' ? ''
                                      : data.questionAttachment.value

        this.formData.educationVideo = data.educationVideo
        this.formData.educationVideoId = data.educationVideo.id

        this.questionAnswerFind({
          questionId: data.question.id
        }).then(res => {
          this.items = res.data
        })
        this.$forceUpdate()
      })
    this.questionFormArea = true
  }
}
</script>
