import {
  AXIOS,
  TRAINING_CREATE,
  TRAINING_ITEM_ADD, TRAINING_ITEM_UPDATE,
  TRAINING_UPDATE,
  TRAININGS,
  TRAININGS_PAGE_ITEM_UPDATE
} from "@/store/constants";

export default {
  [TRAININGS] ({dispatch, commit}) {
    dispatch(AXIOS, {
      url: `api/trainings`, type: 'get', alert: false
    }, {root: true})
      .then(data => {
        if (data) {
          commit(TRAININGS_PAGE_ITEM_UPDATE, data)
        }
      })
  },

  [TRAINING_CREATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/training-create`, type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(TRAINING_ITEM_ADD, data)
        }
      })
  },

  [TRAINING_UPDATE] ({dispatch, commit}, payload) {
    dispatch(AXIOS, {
      url: `api/training-update`, type: 'post', alert: true, data: payload
    }, {root: true})
      .then(data => {
        if (data) {
          commit(TRAINING_ITEM_UPDATE, payload)
        }
      })
  },

}
