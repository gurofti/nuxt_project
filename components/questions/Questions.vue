<template>
  <div v-if="questionArea">
    <List item-layout="vertical">
      <ListItem v-for="(item, index) in data.data" :key="item.title">
        <ListItemMeta :avatar="item.question.createdBy.profileImage"
                      :title="item.question.name"
                      :description="item.educationVideo.title" />
        {{ item.educationVideo.description }}
        <template slot="action">
          <li>
            <Icon type="ios-chatbubbles-outline" />
            {{ item.questionCommentCount }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.question.createdAt }}
          </li>
        </template>
        <template slot="extra">
          <img :src="item.questionAttachment.attachmentValue" style="width: 280px">
          <div class="private-action-area">
            <n-link :to="`/question/${item.question.id}`">
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
        :total="data.meta.last_page * 10"
        :current="currentPage"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {QUESTIONS, QUESTIONS_GET, QUESTION_DELETE} from "@/store/constants";

export default {
  props: {
    search: {
      type: String
    }
  },
  data () {
    return {
      currentPage: 1,
      questionArea: false
    }
  },
  computed: {
    ...mapGetters('questions', {
      data: QUESTIONS_GET
    })
  },
  methods: {
    ...mapActions('questions', {
      questions: QUESTIONS,
      questionDelete: QUESTION_DELETE
    }),
    async pageChange(e) {
      this.educationArea = false
      await this.questions({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    remove (index) {
      this.questionDelete({
        questionId: this.data.data[index].question.id
      })
      this.data.data.splice(index, 1);
    }
  },
  created () {
    this.questions({
      page: 1,
      search: this.search
    })
  },
  watch: {
    data (data) {
      if (data) {
        this.questionArea = true
      }
    },
    search (data) {
      this.questionArea = false
      this.questions({
        page: 1,
        search: data
      })
    }
  },
  beforeDestroy() {
    this.questionArea = false
  }
}
</script>

<style scoped>

</style>
