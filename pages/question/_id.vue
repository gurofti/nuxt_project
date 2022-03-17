<template>
  <div>
    <PageTitle :title="$t('questionUpdate')" />
    <Content class="private-content">
      <QuestionUpdate />
    </Content>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import QuestionUpdate from "@/components/questions/QuestionUpdate";

export default {
  components: {
    PageTitle,
    QuestionUpdate
  },
}
</script>

<style scoped>

</style>
