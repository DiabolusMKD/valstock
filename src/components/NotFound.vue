<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue'
</script>

<template>
  <Layout>
    <template #header>
      <Navigation :dashboard="true"></Navigation>
    </template>
    <template #content>
      <h1>404</h1>
      <p>The page you are looking for could not be found...</p>
      <router-link to="/dashboard">
        <Button class="mt-40">Home</Button>
      </router-link>
    </template>
  </Layout>
</template>

<style scoped>
h1 {
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}
p {
  text-align: center;
  font-weight: bold;
}
</style>
