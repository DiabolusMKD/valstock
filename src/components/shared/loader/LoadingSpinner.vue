<template>
  <div class="spinner"></div>
</template>

<style>
.spinner {
  display: inline-block;
  width: 100px;
  height: 100px;
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 1;
}
.spinner:after {
  content: " ";
  display: block;
  width: 150px;
  height: 150px;
  margin: 8px;
  border-radius: 50%;
  border: 15px solid var(--black);
  border-color: var(--black) transparent var(--black) transparent;
  animation: spinner 1.2s linear infinite;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>