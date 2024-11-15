<template>
    <v-dialog :model-value="isOpen" max-width="800">
      <v-card>
        <slot></slot>
        <v-btn @click="close">Close</v-btn>
      </v-card>
    </v-dialog>
  </template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const emits = defineEmits(['close']);

const {isOpen} = defineProps<{ isOpen: boolean }>()

const close = () => {
  emits("close");
};
</script>
