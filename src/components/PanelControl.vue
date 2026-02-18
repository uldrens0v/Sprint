<script setup>

import Insertar from "@/components/Insertar.vue";
import Obtener from "@/components/Obtener.vue";
import Editar from "@/components/Editar.vue";
import Eliminar from "@/components/Eliminar.vue";
import Dinamico from '@/components/Dinamico.vue'
</script>

<template>
  <div class="x_funciones">
    <Dinamico></Dinamico>
    <Insertar></Insertar>
    <Obtener></Obtener>
    <Editar></Editar>
    <Eliminar></Eliminar>
  </div>
</template>

<style scoped>
.x_funciones {
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  margin: 30px;

}

</style>
