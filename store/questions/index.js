import mutations from "@/store/questions/mutations";
import getters from "@/store/questions/getters";
import actions from "@/store/questions/actions";

export default {
  state () {
    return {
      questions: {},
      item: null,
      questionComments: {
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
