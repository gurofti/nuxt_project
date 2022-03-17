import {
  AXIOS,
  EDUCATIONS,
  EDUCATIONS_PAGE_ITEM_UPDATE,
  EDUCATION_DELETE,
  EDUCATION_STATE_DELETE,
  EDUCATION_CREATE,
  EDUCATION_CREATE_DETAILS,
  EDUCATION_FIND,
  EDUCATION_UPDATE,
  EDUCATION_SUB_CATEGORY_CREATE,
  EDUCATION_SUB_CATEGORY_DELETE,
  EDUCATION_COMMENTS,
  EDUCATION_COMMENTS_PAGE_ITEM_UPDATE,
  EDUCATION_COMMENT_REPLIES,
  EDUCATION_COMMENT_REPLY_CREATE,
  EDUCATION_COMMENT_REPLY_UPDATE,
  EDUCATION_SUB_CATEGORIES,
  EDUCATION_SUB_CATEGORIES_LIST
} from "@/store/constants";

export default {
  // General
  [EDUCATIONS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/educations?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(EDUCATIONS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  [EDUCATION_CREATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/education-create', type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(EDUCATION_CREATE_DETAILS, {...data})
        }
      })
  },

  [EDUCATION_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/education-update', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [EDUCATION_DELETE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: 'api/education-delete', type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          if (!payload.type) {
            commit(EDUCATION_STATE_DELETE, payload.index)
          }
        }
      })
  },

  [EDUCATION_FIND] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/education-find', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [EDUCATION_SUB_CATEGORIES] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/education/sub-categories`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(EDUCATION_SUB_CATEGORIES_LIST, data)
        }
      })
  },

  [EDUCATION_SUB_CATEGORY_CREATE] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/education/sub-category-action', type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [EDUCATION_SUB_CATEGORY_DELETE] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/education/sub-category-delete', type: 'post', alert: false, data: payload
    }, {root: true})
  },



  // Comments
  [EDUCATION_COMMENTS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/education/comments?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(EDUCATION_COMMENTS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  // Replies
  [EDUCATION_COMMENT_REPLIES] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/education/comment-replies-find`, type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [EDUCATION_COMMENT_REPLY_CREATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/education/comment-reply-create`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [EDUCATION_COMMENT_REPLY_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/education/comment-reply-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

}
