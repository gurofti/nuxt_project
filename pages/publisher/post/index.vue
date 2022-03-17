<template>
  <div>
    <PageTitle
      :title="$t('publisherPosts')"
      :button="{type: 'success', status: true, title: $t('publisherPostCreate')}"
      @buttonAction="createForm($event)"
      :search="{status: true, placeholder: $t('publisherPostSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <PublisherPosts :search="search" />
    </Content>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import PublisherPosts from "@/components/publishers/posts/PublisherPosts";

export default {
  head: {
    title: 'Tüm Paylaşımlar - Sualsizler',
  },
  data () {
    return {
      search: ''
    }
  },
  components: {
    PageTitle,
    PublisherPosts,
  },
  methods: {
    createForm () {
      this.$router.push('/publisher/post/create')
    },
    searchAction (search) {
      this.search = search
    }
  }
}
</script>
