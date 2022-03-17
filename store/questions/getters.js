import {QUESTION_NEW_ITEM_DETAILS, QUESTIONS_GET} from "@/store/constants";

export default {
  [QUESTIONS_GET] (state) {
    return state.questions
  },

  [QUESTION_NEW_ITEM_DETAILS] (state) {
    return state.item
  }
}
