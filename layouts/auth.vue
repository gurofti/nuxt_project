<template>
  <section class="log-form">
    <LoadingBar />
    <AlertMessage />
    <div class="text-center">
      <div style="text-align:center; width: 220px; margin: 0 auto">
        <img src="@/static/logo.png">
      </div>
    </div>
    <Nuxt />
  </section>
</template>

<script>
import LoadingBar from "@/components/layout/LoadingBar";
import AlertMessage from "~/components/layout/AlertMessage";
export default {
  name: "auth",
  components: {
    LoadingBar,
    AlertMessage
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

body {
  background: #eee;
  -webkit-font-smoothing: antialiased;
}

hgroup {
  text-align: center;
  margin-top: 4em;
}


/*------------------------------------------------------------------
[ Login Form ]*/

.log-form {
  width: 500px;
  margin: 4em auto;
  padding: 3em 2em 2em 2em;
  background: #fafafa;
  border: 1px solid #ebebeb;
  box-shadow: rgb(255 255 255 / 15%) 0 1px 1px 0, rgb(255 255 255 / 10%) 0 1px 2px 0;
}



/*------------------------------------------------------------------
[ Button same code as contact form ]*/



</style>
