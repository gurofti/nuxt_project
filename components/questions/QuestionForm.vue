<template>
  <Form class="p-0"
        ref="formData"
        :model="formData"
        :rules="formRule"
        method="post">

    <input type="hidden"
           v-model="formData.questionId"/>

    <!-- Created By Name -->
    <FormItem :label="$t('creator')" label-position="top">
      <Input disabled
             v-model="formData.createdByName"
             :placeholder="$t('creator')"/>
    </FormItem>

    <!-- Question Name -->
    <FormItem prop="questionName" :label="$t('questionName')" label-position="top">
      <Input
        v-model="formData.questionName"
        :placeholder="$t('questionName')"/>
    </FormItem>


    <!-- Question/Education Video -->
    <FormItem prop="educationVideoId" :label="$t('queEducationVideo')" label-position="top">
      <Select
          v-model="formData.educationVideoId"
          :remote-method="remoteMethod"
          :placeholder="$t('queEducationVideo')" filterable>
        <Option v-if="formData.educationVideo"
                :value="formData.educationVideoId"
                :key="formData.educationVideoId">{{ formData.educationVideo.title }}</Option>
        <Option v-for="item in videoList.data"
                :value="`${item.video.id}`"
                :key="item.video.id">{{ item.video.title }}</Option>
      </Select>
    </FormItem>

    <!-- Question List No -->
    <FormItem prop="questionListNo" :label="$t('questionListNo')" label-position="top">
      <Input type="number"
            v-model="formData.questionListNo"
            :placeholder="$t('questionListNo')"/>
    </FormItem>

    <!-- Question Status -->
    <FormItem prop="questionStatus" :label="$t('status')" label-position="top">
      <Select
        v-model="formData.questionStatus"
        :placeholder="$t('status')">
        <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
      </Select>
    </FormItem>

  </Form>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {
  EDUCATION_SUB_CATEGORIES,
  EDUCATION_SUB_CATEGORIES_GET,
  QUESTION_CREATE,
  QUESTION_UPDATE,
  VIDEO_CREATE,
  VIDEO_STATE_DELETE,
  VIDEO_UPDATE,
  VIDEOS,
  VIDEOS_GET,
} from "@/store/constants";

export default {
  props: {
    basicKnowledge: {},
    formAction: {
      type: String
    },
    formData: {
      type: Object
    }
  },
  data () {
    return {
      subCategoryArea: false,
      formRule: {
        educationVideoId: this.$required({required: true}),
        questionName: this.$required({required: true, min:2, type: 'string'}),
        questionDescription: this.$required({required: true, min:2, type: 'string'}),
        questionListNo: this.$required({required: true, min:0}),
        questionStatus: this.$required({required: true, min:0})
      },
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapGetters('videos', {
      videoList: VIDEOS_GET
    }),
  },
  methods: {
    ...mapActions('videos', {
      videos: VIDEOS,
    }),
    ...mapMutations('videos', {
      videoStateRemove: VIDEO_STATE_DELETE
    }),
    ...mapActions('questions', {
      questionCreate: QUESTION_CREATE,
      questionUpdate: QUESTION_UPDATE,
    }),
    remoteMethod (query) {
      if (this.formAction === 'create') {
        if (query !== '') {
          this.videos({
            search: query
          })
        }
      } else {
        if (query !== '' && query !== this.formData.educationVideo.title) {
          this.videos({
            search: query,
            videoId: this.formData.educationVideoId
          })
        }
      }
    },
  },
  watch: {
    async basicKnowledge() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.formAction === 'create') {
            this.questionCreate(this.formData)
          } else {
            this.questionUpdate(this.formData)
          }
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
  },
  async mounted () {
    if (this.formAction === 'create') {
      await this.videos({
        page: 1
      })
    }
  },
  beforeDestroy() {
    this.videoStateRemove()
  }
}
</script>
