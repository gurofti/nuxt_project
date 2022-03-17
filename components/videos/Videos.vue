<template>
  <div v-if="videoArea">
    <List item-layout="vertical">
      <ListItem v-for="(item, index) in data.data" :key="item.title">
        <ListItemMeta :avatar="item.video.createdBy.profileImage"
                      :title="item.video.title"
                      :description="item.subCategory ? item.subCategory.title : 'Alt Kategori Seçilmedi'" />
        {{ item.video.description }}
        <template slot="action">
          <li>
            <Icon type="ios-chatbubbles-outline" />
            {{ item.videoComment }}
          </li>
          <li>
            <Icon type="ios-calendar-outline"/>
            {{ item.video.createdAt }}
          </li>
        </template>
        <template slot="extra">
          <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
          <div class="private-action-area">
            <n-link :to="`/video/${item.video.id}`">
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
import {VIDEO_DELETE, VIDEOS, VIDEOS_GET} from "@/store/constants";

export default {
  props: {
    search: {
      type: String
    }
  },
  data () {
    return {
      currentPage: 1,
      videoArea: false
    }
  },
  computed: {
    ...mapGetters('videos', {
      data: VIDEOS_GET
    })
  },
  methods: {
    ...mapActions('videos', {
      videos: VIDEOS,
      videoDelete: VIDEO_DELETE
    }),
    async pageChange(e) {
      this.educationArea = false
      await this.videos({
        page: e,
        search: this.search
      })
      this.currentPage = e
    },
    remove (index) {
      this.videoDelete({
        videoId: this.data.data[index].video.id
      })
      this.data.data.splice(index, 1);
    }
  },
  created () {
    this.videos({
      page: 1,
      search: this.search
    })
  },
  watch: {
    data (data) {
      if (data) {
        this.videoArea = true
      }
    },
    search (data) {
      this.videoArea = false
      this.videos({
        page: 1,
        search: data
      })
    }
  },
  beforeDestroy() {
    this.videoArea = false
  }
}
</script>

<style scoped>

</style>
