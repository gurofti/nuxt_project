<template>
  <Form ref="registerForm" :model="registerForm" :rules="ruleLogin">
    <br>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mt-2 text-center uppercase">{{ $t('register') }}</h3>
    <br>

    <!-- Name/Surname -->
    <FormItem>
      <Row>
        <Col span="11">
          <FormItem prop="name">
            <Input type="text" size="large" v-model="registerForm.name" :placeholder="$t('name')">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Col>
        <Col span="1">
          &nbsp;
        </Col>
        <Col span="12">
          <FormItem prop="surname">
            <Input type="text" size="large" v-model="registerForm.surname" :placeholder="$t('surname')">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </FormItem>

    <!-- E-Posta -->
    <FormItem prop="email">
      <Input type="text" size="large" v-model="registerForm.email" :placeholder="$t('email')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <!-- Username -->
    <FormItem prop="username">
      <Input type="text" size="large" v-model="registerForm.username" :placeholder="$t('username')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <!-- Password -->
    <FormItem prop="password">
      <Input type="password" size="large" v-model="registerForm.password" :placeholder="$t('password')">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <!-- Password Confirm -->
    <FormItem prop="confirmPassword">
      <Input type="password" size="large" v-model="registerForm.confirmPassword" :placeholder="$t('confirmPassword')">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>

    <!-- Submit -->
    <FormItem class="mb-1">
      <Button
        class="float-right font-semibold uppercase"
        type="success" long
        @click="handleSubmit('registerForm')"
      >
        {{ $t('register') }}
      </Button>
    </FormItem>

    <FormItem class="mb-1 text-right">
      <n-link
        to="/auth/login"
      >
        {{ $t('hAccountAvailable') }}
      </n-link>
    </FormItem>

  </Form>
</template>

<script>

import {mapActions} from "vuex";
import {REGISTER_ACTION} from "@/store/constants";

export default {
  name: "login",
  layout: 'auth',
  data() {
    return {
      registerForm: {
        name: 'Osman',
        surname: 'Ayzit',
        username: 'osman34',
        email: 'osman@gmail.com',
        password: 'asdasd',
        confirmPassword: 'asdasd',
        type: 2
      },
      ruleLogin: {
        name: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
        ],
        surname: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
        ],
        username: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'string', min: 6, message: this.$t('form.min.string', {min:6}), trigger: 'blur'}
        ],
        email: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'email', message: this.$t('form.email'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'string', min: 6, message: this.$t('form.min.string', {min:6}), trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, message: this.$t('form.required'), trigger: 'blur'},
          {type: 'string', min: 6, message: this.$t('form.min.string', {min:6}), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      register: REGISTER_ACTION
    }),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          Promise.resolve(
            this.register({data: this.registerForm})
          ).then(res => {
            if (res) {
              this.$auth.loginWith('local', {data: this.registerForm})
            }
          })
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    }
  }
}
</script>
