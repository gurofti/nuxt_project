<template>
  <div>
    <PageTitle
      :title="$t('questions')"
      :button="{type: 'success', status: true, title: $t('questionCreate')}"
      @buttonAction="createForm($event)"
      :search="{status: true, placeholder: $t('questionSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <Questions :search="search" />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import Questions from "@/components/questions/Questions";

export default {
  head: {
    title: 'Tüm Sorular - Sualsizler',
  },
  data () {
    return {
      search: ''
    }
  },
  components: {
    PageTitle,
    Questions,
  },
  methods: {
    createForm () {
      this.$router.push('question/create')
    },
    searchAction (search) {
      this.search = search
    }
  }
}
</script>
