import mutations from "@/store/trainings/mutations";
import getters from "@/store/trainings/getters";
import actions from "@/store/trainings/actions";

export default {
  state () {
    return {
      trainings: {
        data: {}
      }
    }
  },
  mutations,
  getters,
  actions
}
