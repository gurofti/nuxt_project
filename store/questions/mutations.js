import {
  QUESTION_COMMENTS_PAGE_ITEM_UPDATE, QUESTION_NEW_ITEM,
  QUESTIONS_LIST,
} from "@/store/constants";

export default {
  [QUESTIONS_LIST] (state, payload) {
    state.questions = payload
  },

  // Comments
  [QUESTION_COMMENTS_PAGE_ITEM_UPDATE] (state, payload) {
    state.questionComments = payload
  },

  [QUESTION_NEW_ITEM] (state, payload) {
    console.log('payload', payload)
    state.item = payload.data
    console.log('state item', state.item)
  },
}
