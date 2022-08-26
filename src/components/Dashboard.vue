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
      <p>Dashboard</p>
    </template>
  </Layout>
</template>

<style>
</style>
