import {ALERT_MESSAGE_CREATE_MUTATION} from "@/store/constants";

export default ({ app }, inject) => {
  inject('clog', string => {
    Promise.resolve(string).then(data => {
      return data
    })
  })
}
