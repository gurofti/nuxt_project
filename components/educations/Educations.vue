<template>
  <div>
    <List v-if="educationArea" item-layout="vertical">
      <ListItem v-for="(item, index) in data" :key="item.title">
        <ListItemMeta :avatar="item.createdByProfile" :title="item.educationName" :description="item.trainingName" />
        {{ item.educationDescription }}
        <template slot="action">
          <li style="top: 5px">
            <RateStar :rating="item.educationRate.toFixed(1)" />
          </li>
          <li>
            <Icon type="ios-star-outline" />
            {{ item.userInEducations }}
          </li>
          <li>
            <Icon type="ios-chatbubbles-outline" />
            {{ item.educationComments }}
          </li>
        </template>
        <template slot="extra">
          <img :src="item.educationAttachment" @error="imageUrlAlt" class="pri-image-area">
          <div class="private-action-area">
            <n-link :to="`/education/${item.educationId}`">
              <Button class="pri-button" type="success" icon="ios-color-wand">{{ $t('update') }}</Button>
            </n-link>
            <Button class="pri-button"
              @click="remove(index)"
              type="error"
              icon="md-trash">{{ $t('delete') }}</Button>
          </div>
        </template>
      </ListItem>
    </List>

    <div class="h-8 mt-4">
      <Page
        class="float-right"
        :total="total * 10"
        :current="currentPage"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {EDUCATION_DELETE, EDUCATIONS, TRAININGS} from "@/store/constants";
import RateStar from "@/components/general/form/RateStar";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    RateStar
  },
  data() {
    return {
      currentPage: 1,
      selected: null,
      sendForm: {},
      valueCustomText: 3.5,
      educationArea: false
    }
  },
  computed: {
    ...mapState('educations', {
      data: state => state.educations.data,
      total: state => state.educations.meta.last_page,
    })
  },
  methods: {
    ...mapActions('educations', {
      educations: EDUCATIONS,
      educationDelete: EDUCATION_DELETE
    }),
    ...mapActions('trainings', {
      trainings: TRAININGS
    }),
    remove(index) {
      this.data.splice(index, 1);
      this.educationDelete({
        index: index,
        educationId: this.data[index].educationId
      })
    },
    async pageChange(e) {
      this.educationArea = false
      await this.educations({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    imageUrlAlt(event) {
      event.target.src = "default.jpg"
    }
  },
  async created() {
    await this.educations(this.currentPage)
    await this.trainings()
  },
  watch: {
    data (data) {
      if (data) {
        this.educationArea = true
      }
    },
    search (data) {
      this.educationArea = false
      this.educations({
        page: 1,
        search: data
      })
    }
  },
  beforeDestroy() {
    this.educationArea = false
  }
}
</script>
