<template>
  <div>
    <!-- Comments -->
    <List v-if="videoCommentArea" item-layout="vertical">
      <ListItem v-for="item in data" :key="item.title">
        <ListItemMeta :avatar="item.videoComment.createdBy.profileImage"
                      :title="item.videoComment.createdBy.name + ' ' + item.videoComment.createdBy.surname"
                      :description="item.video.name"
        />
        {{ item.videoComment.content }}
        <template slot="action">
          <li>
            <Icon type="ios-thumbs-up-outline"/>
            {{ item.videoComment.likes }}
          </li>
          <li title="Cevap yaz" @click="handleComments(item.video.name, item.videoComment.id)">
            <Icon type="ios-chatbubbles-outline"/>
            {{ item.videoComment.replies }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.videoComment.createdAt }}
          </li>
        </template>

      </ListItem>
    </List>

    <!-- Reply -->
    <VideoCommentReplies
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
import {VIDEO_COMMENTS} from "@/store/constants";
import VideoCommentReplies from "@/components/videos/VideoCommentReplies";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  components: {
    VideoCommentReplies
  },
  data() {
    return {
      action: false,
      replyDetail: {},
      currentPage: 1,
      videoCommentArea: false,
    }
  },
  computed: {
    ...mapState('videos', {
      data: state => state.videoComments.data,
      total: state => state.videoComments.meta.last_page,
    })
  },
  methods: {
    ...mapActions('videos', {
      videoComments: VIDEO_COMMENTS,
    }),
    async pageChange(e) {
      this.videoCommentsArea = false
      this.videoComments({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    handleComments(videoName, commentId) {
      this.replyDetail = {
        videoName: videoName,
        commentId: commentId
      }
      this.action = !this.action
    }
  },
  async created() {
    await this.videoComments(this.currentPage)
  },
  watch: {
    data(data) {
      if (data) {
        this.videoCommentArea = true
      }
    },
    search (data) {
      this.videoComments({
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
