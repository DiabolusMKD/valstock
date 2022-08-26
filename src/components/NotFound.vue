<script setup lang="ts">
import Layout from './shared/layout/Layout.vue'
import Navigation from './shared/navigation/Navigation.vue'

</script>

<template>
  <Layout>
    <template #header>
      <Navigation :dashboard="true"></Navigation>
    </template>
    <template #content>
      <h1>404</h1>
      <p>The page you are looking for could not be found...</p>
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
