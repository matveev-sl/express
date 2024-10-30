<template>
  <v-app>
    <v-main>
      <Hea/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hea from "@/components/Header.vue"
export default defineComponent({
  name: 'App',
  components: {
    Hea
  },
  data () {
    return {
      //
    }
  },
})

</script>
