import {VIDEO_NEW_ITEM_DETAILS, VIDEOS_GET} from "@/store/constants";

export default {
  [VIDEOS_GET] (state) {
    return state.videos
  },

  [VIDEO_NEW_ITEM_DETAILS] (state) {
    return state.item
  }
}
