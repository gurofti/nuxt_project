<template>
  <div>
    <PageTitle :title="$t('educationUpdate')" />
    <Content class="private-content">
      <EducationUpdate />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import EducationUpdate from "@/components/educations/EducationUpdate";

export default {
  components: {
    PageTitle,
    EducationUpdate
  },
}
</script>
