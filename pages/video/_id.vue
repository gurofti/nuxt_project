<template>
  <div>
    <PageTitle :title="$t('videoUpdate')" />
    <Content class="private-content">
      <VideoUpdate />
    </Content>
  </div>
</template>

<script>
import VideoUpdate from "@/components/videos/VideoUpdate";
import PageTitle from "@/components/layout/PageTitle";

export default {
  components: {
    PageTitle,
    VideoUpdate
  }
}
</script>

<style scoped>

</style>
