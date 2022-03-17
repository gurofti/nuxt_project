<template>
  <div>
    <PageTitle
      :title="$t('eduTrainings')"
      :button="{type: 'success', status: true, title: $t('eduTrainingCreate')}"
      @buttonAction="create = !create"
      :search="{status: false}"/>

    <Trainings class="m-2" :create="create"/>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import Trainings from "@/components/trainings/Trainings";

export default {
  head: {
    title: 'Kategoriler - Sualsizler',
  },
  components: {
    PageTitle,
    Trainings
  },
  methods: {
    createForm (data) {

    }
  },
  data () {
    return {
      create: false
    }
  }
}
</script>

<style scoped>

</style>
