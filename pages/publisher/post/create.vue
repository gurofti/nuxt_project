<template>
  <div>
    <PageTitle :title="$t('publisherPostCreate')" />
    <Content class="private-content">
      <PublisherPostCreate />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import PublisherPostCreate from "@/components/publishers/posts/PublisherPostCreate";

export default {
  components: {
    PageTitle,
    PublisherPostCreate
  },
}
</script>
