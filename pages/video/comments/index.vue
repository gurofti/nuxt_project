<template>
  <div>
    <PageTitle
      :title="$t('videoComments')"
      :button="{status: false}"
      :search="{status: true, placeholder: $t('commentSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <VideoComments :search="search" />
    </Content>
  </div></template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import VideoComments from "@/components/videos/VideoComments";

export default {
  head: {
    title: `Video Yorumları - Sualsizler`,
  },
  components: {
    PageTitle,
    VideoComments
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
