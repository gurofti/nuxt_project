<template>
  <div>
    <PageTitle :title="$t('questionCreate')" />
    <Content class="private-content">
      <QuestionCreate />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import QuestionCreate from "@/components/questions/QuestionCreate";


export default {
  components: {
    PageTitle,
    QuestionCreate
  },
}
</script>
