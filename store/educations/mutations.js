import {
  EDUCATION_COMMENTS_PAGE_ITEM_UPDATE,
  EDUCATION_CREATE_DETAILS,
  EDUCATION_STATE_DELETE, EDUCATION_SUB_CATEGORIES_LIST,
  EDUCATIONS_PAGE_ITEM_UPDATE
} from "@/store/constants";

export default {
  // General
  [EDUCATIONS_PAGE_ITEM_UPDATE] (state, payload) {
    state.educations = payload
  },

  [EDUCATION_CREATE_DETAILS] (state, payload) {
    state.item = payload
  },

  [EDUCATION_STATE_DELETE] (state, payload) {
    state.educations.data.splice(payload, 1)
  },

  // Comments
  [EDUCATION_COMMENTS_PAGE_ITEM_UPDATE] (state, payload) {
    state.educationComments = payload
  },

  // Sub Categories
  [EDUCATION_SUB_CATEGORIES_LIST] (state, payload) {
    state.educationSubCategories = payload.data
  },
}

