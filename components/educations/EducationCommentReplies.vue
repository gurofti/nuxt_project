<template>
  <div>
    <Drawer v-if="updateReply" :title="title" width="350" placement="left" :closable="false" v-model="updateDrawer">
      <Input v-model="updateReply.content" type="textarea" :placeholder="$t('writeAnswer')" />
      <Button @click="handleReplyUpdate" class="float-right mt-1" shape="circle" icon="ios-send-outline">
        {{ $t('update') }}
      </Button>
    </Drawer>

    <Drawer :title="title" width="450" :closable="false" v-model="drawer">
      <Divider size="small">{{ $t('commentsOrReplies') }}</Divider>
      <!-- Reply List -->
      <List v-if="replies" class="pri-message-list" item-layout="vertical">
        <ListItem v-for="reply in replies" :key="reply.commentReplyId">
          <ListItemMeta :avatar="reply.createdBy.profileImage"
                        :title="reply.createdBy.name + ' ' + reply.createdBy.surname"
                        :description="reply.content"/>
          <template slot="action">
            <li>
              <Icon type="ios-calendar-outline"/>
              {{ reply.createdAt }}
            </li>
            <li v-if="$auth.user.id === reply.createdBy.id">
              <Icon type="md-construct"/>
              <span @click="handleUpdate(reply)">Düzenle</span>
            </li>
          </template>
        </ListItem>
      </List>

      <!-- Message Send -->
      <div class="pri-drawer-message-area">
        <Input type="textarea" v-model="message" suffix="md-send" icon="md-send" :placeholder="$t('writeAnswer')"/>
        <Button @click="handleMessageSend" class="float-right mt-1" shape="circle" icon="ios-send-outline">
          {{ $t('send') }}
        </Button>
      </div>
    </Drawer>
  </div>

</template>

<script>
import {mapActions} from "vuex";
import {
  EDUCATION_COMMENT_REPLIES,
  EDUCATION_COMMENT_REPLY_CREATE,
  EDUCATION_COMMENT_REPLY_UPDATE
} from "@/store/constants";

export default {
  props: {
    action: {
      type: Boolean
    },
    replyDetail: {
      default: null
    }
  },
  data() {
    return {
      drawer: false,
      updateDrawer: false,
      updateReply: null,
      replies: null,
      title: '',
      message: '',
    }
  },
  methods: {
    ...mapActions('educations', {
      educationCommentReplies: EDUCATION_COMMENT_REPLIES,
      educationCommentReplyCreate: EDUCATION_COMMENT_REPLY_CREATE,
      educationCommentReplyUpdate: EDUCATION_COMMENT_REPLY_UPDATE,
    }),
    handleMessageSend() {
      this.educationCommentReplyCreate({
        educationCommentId: this.replyDetail.commentId,
        content: this.message
      }).then(res => {
        this.replies.push(res.data)
        this.message = ''
      })
    },
    handleUpdate (reply) {
      this.drawer = false
      this.updateReply = reply
      this.updateDrawer = true
    },
    handleReplyUpdate () {
      console.log('reply update', this.updateReply)
      this.educationCommentReplyUpdate({
        educationCommentReplyId: this.updateReply.commentReplyId,
        content: this.updateReply.content,
      })
    }
  },
  watch: {
    action() {
      this.drawer = true
      this.title = this.replyDetail.educationName
      this.educationCommentReplies({
        educationCommentId: this.replyDetail.commentId
      }).then(res => {
        this.replies = res.data
      })
    }
  }
}
</script>

<style scoped>
.pri-message-list {
  height: 70vh;
  overflow-y: auto;
}

.pri-drawer-message-area {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 8px;
  background: #f1f1f1a3;
}
</style>
