<template>
  <div>
    <PageTitle
      :title="$t('videos')"
      :button="{type: 'success', status: true, title: $t('videoCreate')}"
      @buttonAction="createForm($event)"
      :search="{status: true, placeholder: $t('videoSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <Videos :search="search"/>
    </Content>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import Videos from "@/components/videos/Videos";

export default {
  head: {
    title: 'Tüm Videolar - Sualsizler',
  },
  components: {
    PageTitle,
    Videos
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    createForm () {
      this.$router.push('video/create')
    },
    searchAction (search) {
      this.search = search
    }
  }
}
</script>

<style scoped>

</style>
