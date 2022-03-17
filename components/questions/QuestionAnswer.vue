<template>
  <div v-if="questionAnswerArea">
    <Divider orientation="left">Soru Cevap Şıkları</Divider>
    <p>Hazırladığınız soruya ait cevap seçeneklerini aşağıdaki alanları doldurak oluşturabilirsiniz. </p>
    <br>

    <Form v-for="(item, index) in items" :key="index"
          :rules="formRule"
          ref="formDynamic" :model="item" :label-width="80">
      <div>
        <Row>
          <Divider plain orientation="left">Cevap - {{ item.title }}</Divider>

          <!-- Title -->
          <Col span="12">
            <FormItem
              :label="'Başlık'"
              prop="title">
              <Input type="text" v-model="item.title" placeholder="Soru Başlığı: A,B,C,D,E..."/>
            </FormItem>
          </Col>

          <!-- Type -->
          <Col span="12">
            <FormItem
              :label="'Biçim'"
              prop="type">
              <Select v-model="item.type" placeholder="Seçiniz" @on-change="typeChange(index)">
                <Option v-for="type in typeSelection"
                        :value="type.value"
                        :key="type.value">{{ type.label }}
                </Option>
              </Select>
            </FormItem>
          </Col>

          <!-- Value -->
          <Col span="24">
            <FormItem
              v-if="item.type === '1'"
              label="Değer">
              <UploadFile
                v-if="item.type === '1'"
                :disabled-pri="item.id === null"
                disabled-pri-message="Lütfen önce kayıt et butonuna tıklayınız ve sonra görsel yükleyiniz."
                @fileSuccess="fileSuccess($event)"
                @loadingButton="loadingButton($event)"
                :uploadDetail="uploadDetailFunc(item.id)"
              />
            </FormItem>
            <FormItem
              v-else
              label="Değer"
              prop="value">
              <Input
                v-model="item.value"
                type="textarea" placeholder="Cevabı yazınız."/>
            </FormItem>
          </Col>

          <!-- Answer -->
          <Col span="12">
            <FormItem
              :label="'Yanıt'"
              prop="answer">
              <Select v-model="item.answer" placeholder="Yanıt doğru mu yanlış mı belirtiniz.">
                <Option v-for="answer in answerSelection"
                        :value="answer.value"
                        :key="answer.value">{{ answer.label }}
                </Option>
              </Select>
            </FormItem>
          </Col>

          <!-- Status -->
          <Col span="12">
            <FormItem
              :label="'Durum'"
              prop="status">
              <Select
                v-model="item.status"
                :placeholder="$t('status')">
                <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="24" class="flex flex-row-reverse">
            <Button type="error" class="mx-1" ghost @click="answerDelete(index)">Sil</Button>
            <Button v-if="item.id === null" type="primary" ghost @click="answerCreate(index)">Kayıt Et</Button>
            <Button v-else type="success" ghost @click="answerUpdate(index)">Güncelle</Button>
          </Col>

        </Row>
      </div>
    </Form>

    <!-- Submit -->
    <Row class-name="mt-5">
      <Col span="24">
        <Button type="dashed" long @click="handleAdd" icon="md-add">Yeni Cevap Ekle</Button>
      </Col>
    </Row>
    <Row class="mt-5">
      <Button type="primary" @click="handleSubmit()">{{ type === 'update' ? $t('update') : $t('complete') }}</Button>
    </Row>

  </div>
</template>
<script>
import UploadFile from "@/components/general/form/UploadFile";
import {mapActions, mapState} from "vuex";
import {
  QUESTION_ANSWER_CREATE,
  QUESTION_ANSWER_DELETE,
  QUESTION_ANSWER_UPDATE
} from "@/store/constants";

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    question: {
      type: Object,
      default: () => {}
    },
    type: {}
  },
  components: {
    UploadFile
  },
  data() {
    return {
      questionAnswerArea: false,
      test: {
        id: null,
        title: 'Yeni Cevap',
        type: '1',
        value: '',
        answer: '0',
        status: '1'
      },
      formRule: {
        title: this.$required({required: true, min:1}),
        type: this.$required({required: true, min:1}),
        value: this.$required({required: true, min:1}),
        answer: this.$required({required: true, min:1}),
        status: this.$required({required: true, min:1}),
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
      ],
      answerSelection: [
        {
          label: 'Doğru',
          value: '1'
        },
        {
          label: 'Yanlış',
          value: '0'
        }
      ],
      uploadDetail: {
        multiple: false,
        maxSize: 102400,
        data: {
          action: 'question_answer',
          attachmentId: null
        },
        action: process.env.ATTACHMENT_UPLOAD,
        format: ['jpg', 'jpeg', 'png']
      },
      formTest: {
        title: '',
      },
      formDynamic: {
        items: []
      }
    }
  },
  methods: {
    ...mapActions('questions', {
      questionAnswerCreate: QUESTION_ANSWER_CREATE,
      questionAnswerUpdate: QUESTION_ANSWER_UPDATE,
      questionAnswerDelete: QUESTION_ANSWER_DELETE,
    }),
    handleSubmit() {
      this.$router.push('/question')
    },
    handleAdd() {
      this.items.push({
        id: null,
        questionId: null,
        title: 'Yeni Cevap',
        type: '1',
        value: '',
        answer: '0',
        status: '1'
      });
      this.$forceUpdate()
    },
    handleRemove(index) {
      this.items[index].status = 0;
    },
    loadingButton(data) {

    },
    fileSuccess(data) {

    },
    typeChange(index) {
      if (this.type === 'update') {
        this.items[index].value = ''
      }
      this.$forceUpdate()
    },
    answerCreate(index) {
      this.$refs['formDynamic'][index].validate((valid) => {
        if (valid) {
          let data = this.items[index]
          if (this.type === 'create') {
            data.questionId = this.item.question.id
          } else {
            data.questionId = this.question.questionId
          }
          this.questionAnswerCreate(data)
            .then(res => {
              this.items[index] = res.data
              this.$forceUpdate()
            })
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
    answerUpdate(index) {
      this.questionAnswerUpdate(this.items[index])
    },
    answerDelete(index) {
      if (this.items[index].id !== null) {
        this.questionAnswerDelete(this.items[index])
      }
      this.items.splice(index, 1)
    },
    uploadDetailFunc(id) {
      let uploadData = this.uploadDetail
      uploadData.data.attachmentId = id
      return uploadData
    }
  },
  created() {
    this.questionAnswerArea = true
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapState('questions', {
      item: state => state.item
    })
  }
}
</script>
