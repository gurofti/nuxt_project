<template>
  <div>
    <!-- Comments -->
    <List v-if="educationCommentArea" item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :avatar="item.educationComment.createdBy.profileImage"
                      :title="item.educationComment.createdBy.name + ' ' + item.educationComment.createdBy.surname"
                      :description="item.education.name"
        />
        {{ item.educationComment.content }}
        <template slot="action">
          <li>
            <Icon type="ios-thumbs-up-outline"/>
            {{ item.educationComment.likes }}
          </li>
          <li title="Cevap yaz" @click="handleComments(item.education.name, item.educationComment.id)">
            <Icon type="ios-chatbubbles-outline"/>
            {{ item.educationComment.replies }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.educationComment.createdAt }}
          </li>
        </template>

      </ListItem>
    </List>

    <!-- Reply -->
    <EducationCommentReplies
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
import {EDUCATION_COMMENTS} from "@/store/constants";
import EducationCommentReplies from "@/components/educations/EducationCommentReplies";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    EducationCommentReplies
  },
  data() {
    return {
      action: false,
      replyDetail: {},
      currentPage: 1,
      educationCommentArea: false,
    }
  },
  computed: {
    ...mapState('educations', {
      data: state => state.educationComments.data,
      total: state => state.educationComments.meta.last_page,
    })
  },
  methods: {
    ...mapActions('educations', {
      educationComments: EDUCATION_COMMENTS,
    }),
    async pageChange(e) {
      this.educationCommentsArea = false
      this.educationComments({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    handleComments(educationName, commentId) {
      this.replyDetail = {
        educationName: educationName,
        commentId: commentId
      }
      this.action = !this.action
    }
  },
  async created() {
    await this.educationComments(this.currentPage)
  },
  watch: {
    data(data) {
      if (data) {
        this.educationCommentArea = true
      }
    },
    search (data) {
      this.educationComments({
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
