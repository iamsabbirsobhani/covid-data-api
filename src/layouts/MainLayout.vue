<template>
  <q-layout  view="lHh Lpr lFf" class="layout">
    <q-header  elevated style="background-color: #26A69A">
      <q-toolbar >
        <q-toolbar-title >
          Covid Information
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
    }
  }
})
</script>
