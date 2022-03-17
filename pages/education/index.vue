<template>
  <div>
    <PageTitle
      :title="$t('educations')"
      :button="{type: 'success', status: true, title: $t('educationCreate')}"
      @buttonAction="createForm($event)"
      :search="{status: true, placeholder: $t('educationSearch')}"
      @searchAction="searchAction" />
    <Content class="private-content">
      <Educations :search="search" />
    </Content>
  </div>
</template>

<script>
import PageTitle from "@/components/layout/PageTitle";
import Educations from "@/components/educations/Educations";

export default {
  head: {
    title: 'Tüm Eğitimler - Sualsizler',
  },
  data () {
    return {
      search: ''
    }
  },
  components: {
    PageTitle,
    Educations,
  },
  methods: {
    createForm () {
      this.$router.push('education/create')
    },
    searchAction (search) {
      this.search = search
    }
  }
}
</script>
