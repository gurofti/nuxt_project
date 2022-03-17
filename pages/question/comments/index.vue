<template>
  <div>
    <PageTitle
      :title="$t('questionComments')"
      :button="{status: false}"
      :search="{status: true, placeholder: $t('commentSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <QuestionComments :search="search" />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import QuestionComments from "@/components/questions/QuestionComments";

export default {
  head: {
    title: `Soru Yorumları - Sualsizler`,
  },
  components: {
    PageTitle,
    QuestionComments
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
