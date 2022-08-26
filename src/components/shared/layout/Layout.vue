<script setup lang="ts">
</script>

<template>
  <header>
    <div class="header">
      <slot name="header" />
    </div>
  </header>
  <main>
    <div class="content">
      <slot name="content" />
    </div>
  </main>
  <footer>
    <div class="footer">
      <slot name="footer" />
    </div>
  </footer>
</template>

<style>
.header {
  background-color: var(--black);
  color: var(--white);
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer {
  height: 250px;
  text-align: center;
  background-color: var(--black);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
footer {
  margin-top: 250px;
}
</style>
