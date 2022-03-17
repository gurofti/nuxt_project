import mutations from "@/store/videos/mutations";
import getters from "@/store/videos/getters";
import actions from "@/store/videos/actions";

export default {
  state () {
    return {
      videos: {},
      item: null,
      subCategory: null,
      videoComments: {
        meta: {
          last_page: 1
        },
      },
    }
  },
  mutations,
  getters,
  actions
}
