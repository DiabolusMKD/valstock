<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Input from '@/components/shared/form/Input.vue'
import Button from '@/components/shared/form/Button.vue'
import footerImg from '/vector.svg'
import { computed, reactive } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const loginData = reactive({
  username: '',
  password: ''
})

const loginStore = useLoginStore()
const router = useRouter()

const rules = computed(() => {
  return {
    username: { required, minLength: minLength(3) },
    password: { required, minLength: minLength(3) },
  }
})

const usernameError = computed(() => v$.value.username.$errors[0]?.$message as string || '') 
const passwordError = computed(() => v$.value.password.$errors[0]?.$message as string || '') 

const v$ = useVuelidate(rules, loginData)


const login = () => {
  v$.value.$validate()
  if(!v$.value.$error) {
    loginStore.login(loginData.username, loginData.password)
    router.push({ name: 'Dashboard'})
  }
}
</script>

<template>
  <Layout :showFooter="true">
    <template #header>
      <Navigation></Navigation>
    </template>
    <template #content>
      <h1>Join our stock community!</h1>
      <p>Download free photos and videos powered by the best photographers.</p>
      <Input 
        type="text"
        v-model="loginData.username"
        placeholder="Enter username here..."
        label="Username"
        :error="usernameError">
      </Input>
      <Input
        type="password"
        v-model="loginData.password"
        placeholder="Enter password here..."
        label="Password"
        :error="passwordError">
      </Input>
      <Button class="mt-40" @click="login">Log in</Button>
    </template>
    <template #footer>
      <img :src="footerImg" />
    </template>
  </Layout>
</template>

<style>
.content {
  text-align: center;
}
.content h1 {
  margin-top: 160px;
  font-size: 44px;
  line-height: 55px;
  letter-spacing: -2.2px;
}
.content p {
  font-size: 22px;
  line-height: 28px;
}
</style>
