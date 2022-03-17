import {
  AXIOS,
  EDUCATION_STATE_DELETE,
  EDUCATION_CREATE_DETAILS,
  EDUCATION_COMMENTS,
  EDUCATION_COMMENTS_PAGE_ITEM_UPDATE,
  EDUCATION_COMMENT_REPLIES,
  EDUCATION_COMMENT_REPLY_CREATE,
  EDUCATION_COMMENT_REPLY_UPDATE,
  PUBLISHER_POSTS,
  PUBLISHER_POST_CREATE,
  PUBLISHER_POST_UPDATE,
  PUBLISHER_POST_DELETE,
  PUBLISHER_POST_FIND,
  PUBLISHER_POSTS_PAGE_ITEM_UPDATE,
  PUBLISHER_POST_CREATE_DETAILS,
  PUBLISHER_POST_TAG_CREATE,
  PUBLISHER_POST_TAG_DELETE,
  PUBLISHER_POST_TAG_LIST,
  PUBLISHER_POST_ATTACHMENTS,
  PUBLISHER_POST_ATTACHMENT_DELETE,
  PUBLISHER_POST_ATTACHMENT_LIST_CHANGE,
  PUBLISHER_POST_COMMENT_REPLY_UPDATE,
  PUBLISHER_POST_COMMENT_REPLY_CREATE,
  PUBLISHER_POST_COMMENT_REPLIES,
  PUBLISHER_POST_COMMENTS,
  PUBLISHER_POST_COMMENTS_PAGE_ITEM_UPDATE,
  PUBLISHER_POST_STATE_DELETE
} from "@/store/constants";

export default {
  // General
  [PUBLISHER_POSTS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/publisher-posts?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(PUBLISHER_POSTS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  [PUBLISHER_POST_CREATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/publisher-post-create', type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(PUBLISHER_POST_CREATE_DETAILS, {...data})
        }
      })
  },

  [PUBLISHER_POST_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/publisher-post-update', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_DELETE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/publisher-post-delete', type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          if (!payload.type) {
            commit(PUBLISHER_POST_STATE_DELETE, payload.index)
          }
        }
      })
  },

  [PUBLISHER_POST_FIND] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post-find', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  // Attachment
  [PUBLISHER_POST_ATTACHMENTS] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post-attachments', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_ATTACHMENT_LIST_CHANGE] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post-attachment-list-change', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_ATTACHMENT_DELETE] ({dispatch}, payload) {
    dispatch(AXIOS, {
      url: 'api/publisher-post-attachment-delete', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  // Tags
  [PUBLISHER_POST_TAG_LIST] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post/tags', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_TAG_CREATE] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post/tag-create', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_TAG_DELETE] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/publisher-post/tag-delete', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  // Comments
  [PUBLISHER_POST_COMMENTS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/publisher-post-comments?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(PUBLISHER_POST_COMMENTS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  // Replies
  [PUBLISHER_POST_COMMENT_REPLIES] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/publisher-post-comment-replies`, type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_COMMENT_REPLY_CREATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/publisher-post-comment-reply-create`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [PUBLISHER_POST_COMMENT_REPLY_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/publisher-post-comment-reply-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

}
