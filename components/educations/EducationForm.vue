<template>
  <Form class="p-0"
        ref="formData"
        :model="formData"
        :rules="formRule"
        enctype="multipart/form-data"
        method="post">

    <input type="hidden"
           v-model="formData.educationId"/>

    <!-- Created By Name -->
    <FormItem :label="$t('creator')" label-position="top">
      <Input disabled
             v-model="formData.createdByName"
             :placeholder="$t('creator')"/>
    </FormItem>

    <!-- Training -->
    <FormItem v-if="trainings" prop="trainingId" :label="$t('educationTrainingName')" label-position="top">
      <Select
        v-model="formData.trainingId"
        :placeholder="$t('educationTrainingName')">
        <Option v-for="training in trainings" :value="`${training.trainingId}`" :key="training.trainingId">{{ training.trainingName }}</Option>
      </Select>
    </FormItem>

    <!-- Education Name -->
    <FormItem prop="educationName" :label="$t('educationName')" label-position="top">
      <Input
        v-model="formData.educationName"
        :placeholder="$t('educationName')"/>
    </FormItem>

    <!-- Education Description -->
    <FormItem prop="educationDescription" :label="$t('educationDescription')" label-position="top">
      <Input type="textarea"
             v-model="formData.educationDescription" :rows="4"
             :placeholder="$t('educationDescription')"/>
    </FormItem>

    <!-- Education Status -->
    <FormItem prop="educationStatus" :label="$t('status')" label-position="top">
      <Select
        v-model="formData.educationStatus"
        :placeholder="$t('status')">
        <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
      </Select>
    </FormItem>
  </Form>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {EDUCATION_CREATE, EDUCATION_UPDATE, TRAININGS} from "@/store/constants";

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
      formRule: {
        trainingId: this.$required({required: true}),
        educationName: this.$required({required: true, type: 'string'}),
        educationDescription: this.$required({required: true, type: 'string'}),
        educationStatus: this.$required({required: true})
      }
    }
  },
  methods: {
    ...mapActions('educations', {
      handleCreate: EDUCATION_CREATE,
      handleUpdate: EDUCATION_UPDATE,
    }),
    ...mapActions('trainings', {
      trainingsGet: TRAININGS
    }),
  },
  computed: {
    ...mapState('trainings', {
      trainings: state => state.trainings.data,
    }),
    ...mapState({
      status: state => state.status
    }),
  },
  watch: {
    async basicKnowledge() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.formAction === 'create') {
            this.handleCreate(this.formData)
          } else {
            this.handleUpdate(this.formData)
          }
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
  },
  created () {
    this.trainingsGet()
  }
}
</script>

<style scoped>

</style>
