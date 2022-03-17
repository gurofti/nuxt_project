import {
  AXIOS,
  QUESTION_CREATE,
  QUESTION_DELETE,
  QUESTION_FIND,
  QUESTION_NEW_ITEM,
  QUESTION_UPDATE,
  QUESTIONS,
  QUESTION_COMMENT_REPLIES,
  QUESTION_COMMENT_REPLY_CREATE,
  QUESTION_COMMENT_REPLY_UPDATE,
  QUESTION_COMMENTS,
  QUESTION_COMMENTS_PAGE_ITEM_UPDATE,
  QUESTIONS_LIST,
  QUESTION_ANSWER_CREATE,
  QUESTION_ANSWER_UPDATE,
  QUESTION_ATTACHMENT_UPDATE, QUESTION_ANSWER_DELETE, QUESTION_ANSWER_FIND
} from "@/store/constants";

export default {
  // General
  [QUESTIONS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/questions?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(QUESTIONS_LIST, data)
        }
      })
  },

  async [QUESTION_CREATE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/question-create`, type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(QUESTION_NEW_ITEM, data)
        }
      })
  },

  async [QUESTION_UPDATE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/question-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  async [QUESTION_DELETE] ({dispatch, commit}, payload) {
    await dispatch(AXIOS, {
      url: `api/question-delete`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [QUESTION_FIND] ({dispatch}, payload) {
    return dispatch(AXIOS, {
      url: 'api/question-find', type: 'post', alert: false, data: payload
    }, {root: true})
  },

  // Attachment
  [QUESTION_ATTACHMENT_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/question-attachment-text-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  // Comments
  [QUESTION_COMMENTS] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/question-comments?page=${payload.page}`, type: 'post', alert: false, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(QUESTION_COMMENTS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  // Replies
  [QUESTION_COMMENT_REPLIES] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-comment-replies`, type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [QUESTION_COMMENT_REPLY_CREATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-comment-reply-create`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [QUESTION_COMMENT_REPLY_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/question-comment-reply-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  // Answer
  [QUESTION_ANSWER_FIND] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-answer-find`, type: 'post', alert: false, data: payload
    }, {root: true})
  },

  [QUESTION_ANSWER_CREATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-answer-create`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [QUESTION_ANSWER_UPDATE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-answer-update`, type: 'post', alert: true, data: payload
    }, {root: true})
  },

  [QUESTION_ANSWER_DELETE] ({dispatch, commit}, payload) {
    return dispatch(AXIOS, {
      url: `api/question-answer-delete`, type: 'post', alert: true, data: payload
    }, {root: true})
  },
}

