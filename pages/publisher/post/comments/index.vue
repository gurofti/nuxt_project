<template>
  <div>
    <PageTitle
      :title="$t('publisherPostComments')"
      :button="{status: false}"
      :search="{status: true, placeholder: $t('commentSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <PublisherPostComments :search="search" />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import PublisherPostComments from "@/components/publishers/posts/comments/PublisherPostComments";

export default {
  head: {
    title: `Paylaşım Yorumları - Sualsizler`,
  },
  components: {
    PageTitle,
    PublisherPostComments
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
