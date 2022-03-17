<template>
  <div>
    <!-- Comments -->
    <List v-if="publisherPostCommentArea" item-layout="vertical">
      <ListItem v-for="(item, index) in data" :key="index">
        <ListItemMeta :avatar="item.createdBy.profileImage"
                      :title="item.createdBy.fullName"
        />
        {{ item.content }}
        <template slot="action">
          <li>
            <Icon type="ios-thumbs-up-outline"/>
            {{ item.commentLikes }}
          </li>
          <li title="Cevap yaz" @click="handleComments(item.createdBy.fullName, item.id)">
            <Icon type="ios-chatbubbles-outline"/>
            {{ item.commentReplies }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.createdAt }}
          </li>
        </template>

      </ListItem>
    </List>

    <!-- Reply -->
    <PublisherPostCommentReplies
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
import {PUBLISHER_POST_COMMENTS} from "@/store/constants";
import PublisherPostCommentReplies from "@/components/publishers/posts/comments/PublisherPostCommentReplies";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    PublisherPostCommentReplies
  },
  data() {
    return {
      action: false,
      replyDetail: {},
      currentPage: 1,
      publisherPostCommentArea: false,
    }
  },
  computed: {
    ...mapState('publishers', {
      data: state => state.publisherPostComments.data,
      total: state => state.publisherPostComments.meta.last_page,
    })
  },
  methods: {
    ...mapActions('publishers', {
      publisherPostComments: PUBLISHER_POST_COMMENTS,
    }),
    async pageChange(e) {
      this.publisherPostCommentArea = false
      this.publisherPostComments({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    handleComments(publisherPostName, commentId) {
      this.replyDetail = {
        publisherPostName: publisherPostName,
        commentId: commentId
      }
      this.action = !this.action
    }
  },
  async created() {
    await this.publisherPostComments({
      page: 1
    })
  },
  watch: {
    data(data) {
      if (data) {
        this.publisherPostCommentArea = true
      }
    },
    search (data) {
      this.publisherPostComments({
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
