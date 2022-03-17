<template>
  <Form class="p-0"
        ref="formData"
        :model="formData"
        :rules="formRule"
        enctype="multipart/form-data"
        method="post">

    <input type="hidden"
           v-model="formData.publisherPostId"/>

    <!-- Created By Name -->
    <FormItem :label="$t('creator')" label-position="top">
      <Input disabled
             v-model="formData.createdByName"
             :placeholder="$t('creator')"/>
    </FormItem>

    <!-- Publisher Post Content -->
    <FormItem prop="publisherPostContent" :label="$t('publisherPostContent')" label-position="top">
      <Input type="textarea"
             v-model="formData.publisherPostContent" :rows="4"
             :placeholder="$t('publisherPostContent')"/>
    </FormItem>

    <!-- Publisher Post Status -->
    <FormItem prop="publisherPostStatus" :label="$t('status')" label-position="top">
      <Select
        v-model="formData.publisherPostStatus"
        :placeholder="$t('status')">
        <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
      </Select>
    </FormItem>
  </Form>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {
  PUBLISHER_POST_CREATE,
  PUBLISHER_POST_UPDATE,
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
      formRule: {
        publisherPostContent: this.$required({required: true, min:2, type: 'string'}),
        publisherPostStatus: this.$required({required: true})
      }
    }
  },
  methods: {
    ...mapActions('publishers', {
      handleCreate: PUBLISHER_POST_CREATE,
      handleUpdate: PUBLISHER_POST_UPDATE,
    }),
  },
  computed: {
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
  }
}
</script>
