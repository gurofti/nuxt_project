import {
  AXIOS,
  VIDEO_COMMENT_REPLIES, VIDEO_COMMENT_REPLY_CREATE, VIDEO_COMMENT_REPLY_UPDATE,
  VIDEO_COMMENTS,
  VIDEO_COMMENTS_PAGE_ITEM_UPDATE,
  VIDEO_CREATE,
  VIDEO_DELETE,
  VIDEO_FIND,
  VIDEO_NEW_ITEM,
  VIDEO_UPDATE,
  VIDEOS,
  VIDEOS_LIST
} from "@/store/constants";

export default {
  async [VIDEOS] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/education/videos?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(VIDEOS_LIST, data)
        }
      })
  },

  async [VIDEO_CREATE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/education/video-create`, type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(VIDEO_NEW_ITEM, data)
        }
      })
  },

  async [VIDEO_UPDATE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/education/video-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  async [VIDEO_DELETE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/education/video-delete`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [VIDEO_FIND] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/education/video-find', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  // Comments
  [VIDEO_COMMENTS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/education/video/comments?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(VIDEO_COMMENTS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  // Replies
  [VIDEO_COMMENT_REPLIES] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/education/video/comment-replies-find`, type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [VIDEO_COMMENT_REPLY_CREATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/education/video/comment-reply-create`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [VIDEO_COMMENT_REPLY_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/education/video/comment-reply-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  }
}
