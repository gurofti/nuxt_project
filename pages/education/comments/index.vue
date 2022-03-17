<template>
  <div>
    <PageTitle
      :title="$t('educationComments')"
      :button="{status: false}"
      :search="{status: true, placeholder: $t('commentSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <EducationComments :search="search" />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import EducationComments from "@/components/educations/EducationComments";

export default {
  head: {
    title: `Eğitim Yorumları - Sualsizler`,
  },
  components: {
    PageTitle,
    EducationComments
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchAction (search) {
      this.search = search
    }
  }
}
</script>

<style scoped>

</style>
