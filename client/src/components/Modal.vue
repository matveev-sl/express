<template>
    <v-dialog v-model="isOpen" max-width="800">
      <v-card>
        <slot></slot>

      
      </v-card>
     
    </v-dialog>
  </template>

<script lang="ts">


import { ref, defineProps, defineEmits } from 'vue';
// const emits = defineEmits(['close']);
// const props = defineProps({
//       modelValue: {
//       type: Boolean,
//       required: true,
//     },
//   });


    // const isOpen = ref(true);
    // const close = () => {
    //   emit('update:modelValue', false);
    // };


</script>