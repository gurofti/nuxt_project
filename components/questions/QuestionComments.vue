<template>
  <div>
    <!-- Comments -->
    <List v-if="questionCommentArea" item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :avatar="item.comment.createdBy.profileImage"
                      :title="item.comment.createdBy.fullName"
        />
        {{ item.comment.content }}
        <template slot="action">
          <li>
            <Icon type="ios-thumbs-up-outline"/>
            {{ item.commentLikes }}
          </li>
          <li title="Cevap yaz" @click="handleComments(item.comment.createdBy.fullName, item.comment.id)">
            <Icon type="ios-chatbubbles-outline"/>
            {{ item.commentReplies }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.comment.createdAt }}
          </li>
        </template>

      </ListItem>
    </List>

    <!-- Reply -->
    <QuestionCommentReplies
      :action="action"
      :replyDetail="replyDetail"
    />

    <!-- Pagination -->
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
import {EDUCATION_COMMENTS, QUESTION_COMMENTS} from "@/store/constants";
import QuestionCommentReplies from "@/components/questions/QuestionCommentReplies";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    QuestionCommentReplies
  },
  data() {
    return {
      action: false,
      replyDetail: {},
      currentPage: 1,
      questionCommentArea: false,
    }
  },
  computed: {
    ...mapState('questions', {
      data: state => state.questionComments.data,
      total: state => state.questionComments.meta.last_page,
    })
  },
  methods: {
    ...mapActions('questions', {
      questionComments: QUESTION_COMMENTS,
    }),
    async pageChange(e) {
      this.questionCommentsArea = false
      this.questionComments({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    handleComments(questionName, commentId) {
      this.replyDetail = {
        questionName: questionName,
        commentId: commentId
      }
      this.action = !this.action
    }
  },
  async created() {
    await this.questionComments(this.currentPage)
  },
  watch: {
    data(data) {
      if (data) {
        this.questionCommentArea = true
      }
    },
    search (data) {
      this.questionComments({
        page: 1,
        search: data
      })
    }
  }
}
</script>
<style scoped>
  span.private-image-avatar-area {
    width: 50px;
    height: 50px;
    display: inline-block;
  }

  span.private-image-avatar-area img {
    width: 100%;
    object-fit: cover;
    border-radius: 50px;
    padding: 4px;
  }
</style>
