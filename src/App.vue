<template>
  <div id="layout-principal">
  <Login></Login>
  </div>
</template>

<script setup>
import Login from "@/components/Login.vue";
import PanelControl from '@/components/PanelControl.vue'
import Dinamico from '@/components/Dinamico.vue'
</script>

<style>
#layout-principal {
  font-family: Arial, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center

}
hr {
  border: 0;
  border-top: 1px dashed #ccc;
}
</style>
