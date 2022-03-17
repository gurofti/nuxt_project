<template>
  <div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {ALERT_MESSAGE_DELETE_MUTATION} from "~/store/constants";

export default {
  name: "AlertMessage",
  computed: {
    ...mapState({
        id: state => state.alertMessage.id,
        type: state => state.alertMessage.type,
        data: state => state.alertMessage.data,
    }),
  },
  methods: {
    ...mapMutations({
      alertMessageDelete: ALERT_MESSAGE_DELETE_MUTATION
    }),
  },
  watch: {
    id(data) {
      console.log(this.type)
      // Success
      if (this.type === 'success') {
        this.$Notice.success({
          title: 'İşlem Başarılı!',
          desc: this.data !== '' ? this.data : this.$t('form.success')
        });

      // Error
      } else if (this.type === 'error') {
        for (let field of Object.keys(this.data)) {
          this.$Notice.error({
            title: 'Uyarı',
            desc: this.data[field][0]
          });
        }

      // Error 404
      }  else if (this.type === 'error404') {
        console.log('err404')
        this.$Notice.error({
          title: 'Uyarı',
          desc: this.$t('isNotFound')
        });

      // Warning
      } else {
        this.$Notice.warning({
          title: 'Uyarı',
          desc: this.$t('form.unexpected')
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
