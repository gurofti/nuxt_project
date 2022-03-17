<template>
  <Form class="p-0"
        ref="formData"
        :model="formData"
        :rules="formRule"
        enctype="multipart/form-data"
        method="post">

    <input type="hidden"
           v-model="formData.videoId"/>

    <!-- Created By Name -->
    <FormItem :label="$t('creator')" label-position="top">
      <Input disabled
             v-model="formData.createdByName"
             :placeholder="$t('creator')"/>
    </FormItem>

    <!-- Education Sub Category -->
    <FormItem prop="videoSubCategory" :label="$t('videoSubCategory')" label-position="top">
      <Select
          v-model="formData.videoSubCategory"
          :remote-method="remoteMethod"
          :placeholder="$t('videoSubCategory')" filterable>
        <Option v-if="formData.videoPlusSubCategoryId"
                :value="formData.videoPlusSubCategoryId"
                :key="formData.videoPlusSubCategoryId">{{ formData.videoPlusSubCategoryTitle }} </Option>
        <Option v-for="subCategory in eduSubCategories"
                :value="`${subCategory.id}`"
                :key="subCategory.id">{{ subCategory.title }}</Option>
      </Select>
    </FormItem>

    <!-- Video Title -->
    <FormItem prop="videoTitle" :label="$t('videoTitle')" label-position="top">
      <Input
        v-model="formData.videoTitle"
        :placeholder="$t('videoTitle')"/>
    </FormItem>

    <!-- Video Description -->
    <FormItem prop="videoDescription" :label="$t('videoDescription')" label-position="top">
      <Input type="textarea"
             v-model="formData.videoDescription" :rows="4"
             :placeholder="$t('videoDescription')"/>
    </FormItem>

    <!-- Video List No -->
    <FormItem prop="videoListNo" :label="$t('videoListNo')" label-position="top">
      <Input type="number"
            v-model="formData.videoListNo"
            :placeholder="$t('videoListNo')"/>
    </FormItem>

    <!-- Video Status -->
    <FormItem prop="videoStatus" :label="$t('status')" label-position="top">
      <Select
        v-model="formData.videoStatus"
        :placeholder="$t('status')">
        <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
      </Select>
    </FormItem>

  </Form>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {
  EDUCATION_SUB_CATEGORIES,
  EDUCATION_SUB_CATEGORIES_GET, VIDEO_CREATE, VIDEO_UPDATE,
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
        videoSubCategory: this.$required({required: true}),
        videoTitle: this.$required({required: true, min:2, type: 'string'}),
        videoDescription: this.$required({required: true, min:2, type: 'string'}),
        videoListNo: this.$required({required: true, min:0, type: 'string'}),
        videoStatus: this.$required({required: true, min:0})
      }
    }
  },
  computed: {
    ...mapState({
      status: state => state.status
    }),
    ...mapGetters('educations', {
      eduSubCategories: EDUCATION_SUB_CATEGORIES_GET
    })
  },
  methods: {
    ...mapActions('educations', {
      subCategories: EDUCATION_SUB_CATEGORIES
    }),
    ...mapActions('videos', {
      createVideo: VIDEO_CREATE,
      updateVideo: VIDEO_UPDATE,
    }),
    remoteMethod (query) {
      if (query !== '') {
        this.subCategories({
          search: query,
          subCategoryId: this.formData.videoPlusSubCategoryId
        })
      }
    },
  },
  watch: {
    async basicKnowledge() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.formAction === 'create') {
            this.createVideo(this.formData)
          } else {
            this.updateVideo(this.formData)
          }
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
  },
  async mounted () {
    if (this.formAction === 'create') {
      await this.subCategories()
    } else {
      const {videoPlusSubCategoryId} = this.formData
      await this.subCategories({
        subCategoryId: videoPlusSubCategoryId
      })
      this.formData.videoSubCategory = videoPlusSubCategoryId
    }
  }
}
</script>
