<template>
  <Form ref="loginForm" :model="loginForm" :rules="ruleLogin">
    <br>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mt-2 text-center uppercase">{{ $t('login') }}</h3>
    <br>

    <FormItem prop="email">
      <Input type="text" size="large" v-model="loginForm.email" :placeholder="$t('email')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <FormItem prop="password">
      <Input type="password" size="large" v-model="loginForm.password" :placeholder="$t('password')">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <FormItem class="mb-1">
      <Button
        class="float-right font-semibold uppercase"
        type="success" long
        :loading="loadingButton"
        @click="handleSubmit('loginForm')"
      >
        {{ $t('login') }}
      </Button>
    </FormItem>

    <FormItem class="mb-1 text-right">
      <n-link
        to="/auth/register"
      >
        {{ $t('nAccountToRegister') }}
      </n-link>
    </FormItem>

  </Form>
</template>

<script>

import {mapActions} from "vuex";
import {LOGIN_ACTION} from "@/store/constants";

export default {
  name: "login",
  layout: 'auth',
  data() {
    return {
      loadingButton: false,
      loginForm: {
        email: 'gurofti@gmail.com',
        password: 'asdasd'
      },
      ruleLogin: {
        email: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'email', message: this.$t('form.email'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'string', min: 6, message: this.$t('form.min.string', {min: 6}), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      login: LOGIN_ACTION
    }),
    async handleSubmit(name) {
      this.loadingButton = true
      this.$refs[name].validate((valid) => {
        console.log('test 1')
        if (valid) {
          this.$auth.loginWith('local', {data: this.loginForm})
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
      this.loadingButton = false
    }
  },
}
</script>
