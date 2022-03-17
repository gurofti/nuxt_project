import {VIDEO_COMMENTS_PAGE_ITEM_UPDATE, VIDEO_NEW_ITEM, VIDEO_STATE_DELETE, VIDEOS_LIST} from "@/store/constants";

export default {
  [VIDEOS_LIST] (state, payload) {
    state.videos = payload
  },

  [VIDEO_STATE_DELETE] (state) {
    state.videos = {}
  },

  [VIDEO_NEW_ITEM] (state, payload) {
    state.item = payload.data
  },

  // Comments
  [VIDEO_COMMENTS_PAGE_ITEM_UPDATE] (state, payload) {
    state.videoComments = payload
  },

}
