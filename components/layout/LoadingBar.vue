<template>
  <div class="loading_container" v-if="loadingBar">
    <svg xmlns="http://www.w3.org/2000/svg" id="motasl_logo" class="center" width="440.88" height="434" viewBox="0 0 440.88 434">
      <mask id="archMask">
        <path id="mask" d="M366.5,100.5s-122-2-161,9-88,50-94,58-27.78,36.63-29,83c-1,38-5,63,19,108s81,69,98,75,61,12,99,4,76-56,88-67,29-40,36-83c7.43-45.67,7-52,7-52" transform="translate(-35.13 -53.86)" ></path>
      </mask>
      <path id="arch" mask="url(#archMask)" d="M378.22,271.83A128.52,128.52,0,1,1,187,159.59c39.95-22.38,89.07-16.06,133-16.29,8.25,0,34.31-.05,39.15-.05V82.1q0-11.75,0-23.5c0-1.12-110.23.68-119.9,1.18-18.84,1-37.17,3-55.17,8.94a214,214,0,0,0-147,186.73q-.63,8.18-.63,16.38C36.49,389.38,132.11,485,249.67,485s213.17-95.62,213.17-213.17Z" transform="translate(-35.13 -53.86)" style="fill: #161c2c"></path>

      <circle id="downdot" cx="385.00" cy="156.0" r="37.34" style="fill: #df301b"></circle>
      <circle id="updot" cx="385.00" cy="47.00" r="37.34" style="fill: #df301b"></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LoadingBar",
  data() {
    return {
      loadingBar: true
    }
  },
  mounted() {
    this.loadingBar = false
  }
}
</script>
