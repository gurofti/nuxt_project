<template>
  <div>
    <Button type="primary" @click="handleSubmit()">{{ type === 'update' ? $t('update') : $t('complete')}}</Button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: String
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push('/video')
    }
  }
}
</script>

<style scoped>

</style>
