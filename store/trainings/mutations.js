import {TRAINING_ITEM_ADD, TRAINING_ITEM_UPDATE, TRAININGS_PAGE_ITEM_UPDATE} from "@/store/constants";

export default {
  [TRAININGS_PAGE_ITEM_UPDATE] (state, payload) {
    state.trainings = payload
  },

  [TRAINING_ITEM_ADD] (state, payload) {
    state.trainings.data.push(payload.data)
  },

  [TRAINING_ITEM_UPDATE] (state, payload) {
    console.log('payload', payload)
    state.trainings.data[payload.index] = payload
  }
}
