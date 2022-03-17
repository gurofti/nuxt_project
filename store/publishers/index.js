import mutations from "@/store/publishers/mutations"
import actions from "@/store/publishers/actions"
import getters from "@/store/publishers/getters"

export default {
  state () {
    return {
      publishers: {
        meta: {
          last_page: 1
        },
      },
      publisherPostComments: {
        meta: {
          last_page: 1
        },
      },
      selectedId: null,
      item: null
    }
  },
  mutations,
  actions,
  getters
}
