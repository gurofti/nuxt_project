<template>
  <div>
    <PageTitle :title="$t('educationCreate')" />
    <Content class="private-content">
      <EducationCreate />
    </Content>
  </div>
</template>
<script>
import PageTitle from "@/components/layout/PageTitle";
import EducationCreate from "@/components/educations/EducationCreate";

export default {
  components: {
    PageTitle,
    EducationCreate
  },
}
</script>
