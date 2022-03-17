<template>
  <div>
    <List v-if="publisherArea" item-layout="vertical">
      <ListItem v-for="(item, index) in data" :key="index">
        <ListItemMeta :avatar="item.post.createdBy.profileImage"
                      :title="item.post.createdBy.fullName"/>
        {{ item.post.content }}
        <template slot="action">
          <li>
            <Icon type="ios-thumbs-up-outline"/>
            {{ item.likes }}
          </li>
          <li>
            <Icon type="ios-chatbubbles-outline"/>
            {{ item.comments }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.post.createdAt }}
          </li>
        </template>
        <template slot="extra">
          <img v-if="item.attachments[0]" :src="item.attachments[0].value" @error="imageUrlAlt" class="pri-image-area">
          <div class="private-action-area">
            <n-link :to="`/publisher/post/${item.post.id}`">
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
import {PUBLISHER_POST_DELETE, PUBLISHER_POSTS} from "@/store/constants";

export default {
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1,
      selected: null,
      sendForm: {},
      valueCustomText: 3.5,
      publisherArea: false
    }
  },
  computed: {
    ...mapState('publishers', {
      data: state => state.publishers.data,
      total: state => state.publishers.meta.last_page,
    })
  },
  methods: {
    ...mapActions('publishers', {
      publishers: PUBLISHER_POSTS,
      publisherPostDelete: PUBLISHER_POST_DELETE
    }),
    remove(index) {
      this.publisherPostDelete({
        index: index,
        publisherPostId: this.data[index].post.id
      })
    },
    async pageChange(e) {
      this.publisherArea = false
      await this.publishers({
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
    await this.publishers({page: this.currentPage})
  },
  watch: {
    data (data) {
      if (data) {
        this.publisherArea = true
      }
    },
    search (data) {
      this.publisherArea = false
      this.publishers({
        page: 1,
        search: data
      })
    }
  },
  beforeDestroy() {
    this.publisherArea = false
  }
}
</script>
