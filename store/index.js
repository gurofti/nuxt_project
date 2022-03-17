import {
  ALERT_MESSAGE_CREATE_MUTATION,
  ALERT_MESSAGE_DELETE_MUTATION,
  ALERT_MESSAGE_LIST,
  AXIOS, LOGIN_ACTION,
  REGISTER_ACTION
} from "~/store/constants";
export const strict = false
export default {
  namespaced: true,
  state() {
    return {
      // GLOBAL
      alertMessage: {
        id: '',
        type: '',
        data: {},
      },
      metaTitle: 'meta Title',

      // FORM
      status: [
        {
          value: '0',
          text: 'passive'
        },
        {
          value: '1',
          text: 'active'
        },
        {
          value: '2',
          text: 'outOfOrder'
        }
      ],
    }
  },
  mutations: {
    [ALERT_MESSAGE_DELETE_MUTATION](state) {
      state.alertMessage = {}
    },
    [ALERT_MESSAGE_CREATE_MUTATION](state, payload) {
      state.alertMessage.id = Math.random().toString(36).substr(2, 9);
      state.alertMessage.type = payload.type
      state.alertMessage.data = payload.data
    }
  },
  getters: {
    [ALERT_MESSAGE_LIST]: state => {
      return state.alertMessage
    },
  },
  actions: {
    // Axios
    /**
     *
     * @param commit
     * @param payload
     *        payload.url: path..
     *        payload.type:post|get|put etc.
     *        payload.alert:true|false
     * @returns {Promise<*>}
     */
    async [AXIOS]({commit}, payload) {
      try {
        let axios;
        if (payload.type === 'post') {
          axios = this.$axios.$post(payload.url, payload.data)
        } else if (payload.type === 'get') {
          axios = this.$axios.$get(payload.url)
        }
        return await axios
          .then(response => {
            console.log('res', response)
            if (payload.alert) {
              commit(ALERT_MESSAGE_CREATE_MUTATION, {type: 'success', data: response.message ?? ''})
            }
            return response
          })
          .catch(err => {
            console.log('err', err)
            if (err.status === 404) {
              if (payload.alert) {
                return commit(ALERT_MESSAGE_CREATE_MUTATION, {type: 'error404', data: ''})
              }
            }
            if (err.response.status === 500) {
                return commit(ALERT_MESSAGE_CREATE_MUTATION, {type: 'error500', data: err.response})
            }
            if (payload.alert) {
              commit(ALERT_MESSAGE_CREATE_MUTATION, {type: 'error', data: err.response.data.errors})
            }
            return null
          })
      } catch (e) {
        console.log('e', e)
        if (payload.alert) {
          commit(ALERT_MESSAGE_CREATE_MUTATION, {type: '', data: ''})
        }
        return null
      }
    },

    // Auth - Login
    async [LOGIN_ACTION]({dispatch}, payload) {
      let data = payload.data
      return await dispatch(AXIOS, {
        url: '/api/auth/login',
        type: 'post',
        alert: false,
        data
      })
    },

    // Auth - Register
    async [REGISTER_ACTION]({commit, dispatch, $auth}, payload) {
      console.log('auth-register', payload)
      return await dispatch(AXIOS, {
        url: '/api/auth/register',
        type: 'post',
        alert: true,
        data: payload.data
      })
    }
  },
}
