<script setup lang="ts">
import SignupForm from "~/components/SignupForm.vue";

</script>
<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <SignupForm />
        </div>
      </div>
    </div>
    <div class="bg-muted relative hidden lg:block">
      <NuxtImg src="/logo.jpg" alt="Image"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
    </div>
  </div>
</template>
