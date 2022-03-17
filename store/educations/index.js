import mutations from "@/store/educations/mutations"
import actions from "@/store/educations/actions"
import getters from "@/store/educations/getters"

export default {
  state () {
    return {
      educations: {
        meta: {
          last_page: 1
        },
      },
      educationComments: {
        meta: {
          last_page: 1
        },
      },
      educationSubCategories: {},
      selectedId: null,
      item: null
    }
  },
  mutations,
  actions,
  getters
}
