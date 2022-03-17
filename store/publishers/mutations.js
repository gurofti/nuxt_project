import {
  PUBLISHER_POST_COMMENTS_PAGE_ITEM_UPDATE,
  PUBLISHER_POST_CREATE_DETAILS, PUBLISHER_POST_STATE_DELETE,
  PUBLISHER_POSTS_PAGE_ITEM_UPDATE
} from "@/store/constants";

export default {
  // General
  [PUBLISHER_POSTS_PAGE_ITEM_UPDATE] (state, payload) {
    state.publishers = payload
  },

  [PUBLISHER_POST_CREATE_DETAILS] (state, payload) {
    state.item = payload
  },

  [PUBLISHER_POST_STATE_DELETE] (state, payload) {
    state.publishers.data.splice(payload, 1)
  },

  // Comments
  [PUBLISHER_POST_COMMENTS_PAGE_ITEM_UPDATE] (state, payload) {
    state.publisherPostComments = payload
  },

}

