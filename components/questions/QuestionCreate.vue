<template>
  <div>
    <br>
    <Steps :current="current">
      <Step title="Soru Bilgileri"></Step>
      <Step title="Soru Görseli/Yazısı"></Step>
      <Step title="Soru Detayları"></Step>
    </Steps>
    <br>

    <!-- Step 1 -->
    <QuestionForm
      formAction="create"
      :basicKnowledge="basicKnowledge"
      :formData="formData"
      v-if="current===0"/>

    <!-- Step 2 -->
    <div v-if="current===1">
      <Form :label-width="50" label-position="left">
        <Divider orientation="left">Soru Formatı</Divider>
        <p>Hazırladığınız soruyu bir yazı mı yoksa görsel şeklinde mi yükleyeceğinizi seçiniz. </p>
        <br>

        <!-- Question Type -->
        <FormItem label="Biçim">
          <Select v-model="uploadDetail.data.type" placeholder="Seçiniz">
            <Option v-for="type in typeSelection"
                    :value="type.value"
                    :key="type.value">{{ type.label }}</Option>
          </Select>
        </FormItem>

        <!-- Question Value -->
        <FormItem label="Değer">
          <UploadFile
            v-if="uploadDetail.data.type === '1'"
            @fileSuccess="fileSuccess($event)"
            @loadingButton="loadingButton($event)"
            :uploadDetail="uploadDetail"
          />
          <Input
            v-else
            v-model="uploadDetail.data.value"
            type="textarea" placeholder="Soruyu yazınız." />
        </FormItem>

      </Form>
    </div>

    <!-- Step 3 -->
    <div v-if="current===2" style="margin: 0 auto">
      <QuestionAnswer
        type="create"/>
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
import {EDUCATION_DELETE, QUESTION_ATTACHMENT_UPDATE, QUESTION_DELETE} from "@/store/constants";
import UploadFile from "@/components/general/form/UploadFile";
import QuestionForm from "@/components/questions/QuestionForm";
import QuestionAnswer from "@/components/questions/QuestionAnswer";

export default {
  head: {
    title: 'Soru Oluştur - Sualsizler',
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
      basicKnowledge: false,
      formData: {
        questionId: '',
        createdByName: '',
        questionName: '',
        questionType: '1',
        educationVideoId: '',
        questionListNo: '',
        questionStatus: '',
        educationVideo: null,
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
  computed: {
    ...mapState('questions', {
      item: state => state.item
    })
  },
  methods: {
    ...mapActions('questions', {
      questionDelete: QUESTION_DELETE,
      questionAttachmentUpdate: QUESTION_ATTACHMENT_UPDATE,
    }),
    async formCancel () {
      if (this.item) {
        await this.questionDelete({
          id: this.item.question.id,
        })
      }
      await this.$router.push('/question')
    },
    async handleSubmit() {
      if (this.current === 0) {
        this.basicKnowledge = !this.basicKnowledge
      } else if (this.current === 1 && this.uploadDetail.data.type === '2') {
        this.questionAttachmentUpdate({
          questionId: this.item.question.id,
          questionAttachmentId: this.item.questionAttachment.id,
          value: this.uploadDetail.data.value
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
  },
  created() {
  },
  watch: {
    item (item) {
      console.log('item', item)
      this.uploadDetail.data.attachmentId = item.question.id
      if (item) this.next()
    }
  }
}
</script>
