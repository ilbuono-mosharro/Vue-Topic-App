<script setup>

</script>

<template>
    <header>
      <slot name="header"></slot>
    </header>
    <main class="container mt-4 py-5">
      <div class="row justify-content-center align-items-center py-5">
        <slot></slot>
      </div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
</template>

<style>
body {
  padding-top: 56px;
}
</style>