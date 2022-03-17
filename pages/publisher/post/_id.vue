<template>
  <div>
    <PageTitle :title="$t('publisherPostUpdate')" />
    <Content class="private-content">
      <PublisherPostUpdate />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import PublisherPostUpdate from "@/components/publishers/posts/PublisherPostUpdate";

export default {
  components: {
    PageTitle,
    PublisherPostUpdate
  },
}
</script>
