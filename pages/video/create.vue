<template>
  <div>
    <PageTitle :title="$t('videoCreate')" />
    <Content class="private-content">
      <VideoCreate />
    </Content>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import VideoCreate from "@/components/videos/VideoCreate";

export default {
  components: {
    PageTitle,
    VideoCreate
  }
}
</script>

<style scoped>

</style>
