<template>
  <div class="row">

    <!-- Post Tags -->
    <div class="mt-3">
      <Divider orientation="left">Paylaşımınızın Etiketleri</Divider>
      <p>Paylaşımınıza eklediğiniz etiketler paylaşımınızın ilgili alanlarda gösterilmesini sağlar.</p>
      <br>
      <Tag v-for="(item, index) in tags" :key="item.id" :name="index"
           class="private-tag" closable
           @on-close="handleClose">{{ item.tag }}
      </Tag>
      <Input style="width: auto" v-model="tagTitle" @on-enter="handleAdd">
        <Icon type="ios-add" @click="handleAdd" slot="suffix"/>
      </Input>
    </div>

    <!-- File List -->
    <div class="mt-14">
      <Divider orientation="left">Görüntülenme Sırası</Divider>
      <p>Paylaşımınıza eklediğiniz dosyaların görüntülenme sırasını sürükleyerek değiştirebilirsiniz.</p>
      <br>
      <draggable class="list-group private-draggable" :list="attachments" group="people">
        <Card :bordered="false"
              style="width:24%"
              class="list-group-item border-gray-200"
              v-for="(element, index) in attachments"
              :key="element.value">
          <div class="private-card-title">
            <div>
              <Icon class="pb-1" type="md-aperture"/>
              Sıra: {{ index+1 }}
            </div>
            <div>
              <Icon v-if="element.type === '2'" type="md-videocam" title="Bu bir video"/>
              <Icon v-else type="ios-image" title="Bu bir resim"/>
            </div>
          </div>
          <div class="text-center">
            <img :src="element.value">
            <div class="private-attachment-details">
              <small>
                <Icon type="ios-calendar-outline"/>
                {{ element.createdAt }}
              </small>
              <Button type="error" size="small" ghost @click="handleAttachmentDelete(index, element.id)">Sil</Button>
            </div>
          </div>
        </Card>
      </draggable>
    </div>

    <div class="mt-3">
      <Button type="primary"
              @click="handleAttachmentChange" ghost
              icon="ios-keypad">Sıralamayı Güncelle</Button>
    </div>

    <div class="mt-12" v-if="type === 'create'">
      <Divider orientation="left">Her şey tamam!</Divider>
      <p>Paylaşımınızı başarıyla tamamladınız.</p>
      <br>
      <Button type="primary" long ghost icon="ios-send" @click="$router.push('/publisher/post')">{{ $t('complete') }}</Button>
    </div>

  </div>
</template>
<script>
import draggable from "vuedraggable";
import {mapActions, mapState} from "vuex";
import {
  PUBLISHER_POST_ATTACHMENT_DELETE, PUBLISHER_POST_ATTACHMENT_LIST_CHANGE,
  PUBLISHER_POST_ATTACHMENTS,
  PUBLISHER_POST_TAG_CREATE,
  PUBLISHER_POST_TAG_DELETE,
  PUBLISHER_POST_TAG_LIST
} from "@/store/constants";

export default {
  props: {
    type: {
      type: String
    },
    postDetail: {
      default: () => {}
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      tagTitle: '',
      tags: [],
      attachments: [],
    };
  },
  computed: {
    ...mapState('publishers', {
      item: state => state.item
    })
  },
  methods: {
    ...mapActions('publishers', {
      tagCreate: PUBLISHER_POST_TAG_CREATE,
      tagDelete: PUBLISHER_POST_TAG_DELETE,
      tagList: PUBLISHER_POST_TAG_LIST,
      postAttachments: PUBLISHER_POST_ATTACHMENTS,
      postAttachmentDelete: PUBLISHER_POST_ATTACHMENT_DELETE,
      postAttachmentListChange: PUBLISHER_POST_ATTACHMENT_LIST_CHANGE,
    }),
    handleAdd() {
      let publisherPostId = null
      if (this.type === 'update') {
        publisherPostId = this.postDetail.post.id
      } else {
        publisherPostId = this.item.data.post.id
      }
      this.tagCreate({
        publisherPostId: publisherPostId,
        tag: this.tagTitle
      }).then(res => {
        this.tags.push({
          id: res.data.id,
          tag: res.data.tag
        })
      })
      this.tagTitle = ''
    },
    handleClose(event, index) {
      this.tagDelete({
        publisherPostTagId: this.tags[index].id,
      }).then(res => {
        this.tags.splice(index, 1);
      })
    },
    handleAttachmentDelete(index, id) {
      this.postAttachmentDelete({
        publisherPostAttachmentId: id
      }).then(res => {
        this.attachments.splice(index, 1)
      })
    },
    handleAttachmentChange() {
      let publisherPostId = null
      if (this.type === 'update') {
        publisherPostId = this.postDetail.post.id
      } else {
        publisherPostId = this.item.data.post.id
      }
      this.postAttachmentListChange({
        publisherPostId: publisherPostId,
        attachments: this.attachments
      })
    }
  },
  created() {
    if (this.type === 'update') {
      this.tagList({
        publisherPostId: this.postDetail.post.id,
      }).then(res => {
        this.tags = res.data
      })
      this.postAttachments({
        publisherPostId: this.postDetail.post.id,
      }).then(res => {
        this.attachments = res.data
      })
    } else {
      this.postAttachments({
        publisherPostId: this.item.data.post.id,
      }).then(res => {
        this.attachments = res.data
      })
    }
  },
};
</script>
<style lang="scss">
.private-draggable {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .private-card-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 3px;
  }

  .list-group-item {
    margin: 0.5%;
    border: 1px solid #e6e5e5e0;
    height: 220px;
    overflow: hidden;

    img {
      height: 159px;
      width: 100%;
      object-fit: cover;
    }
  }
  .ivu-card-body {
    padding: 7px !important;
    padding-top: 3px !important;
  }
}

.private-attachment-details {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f1f1;
  padding-top: 3px;
}

.private-tag {
  height: 32px;
  line-height: 32px;
}
</style>
