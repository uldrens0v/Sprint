<template>
  <form @submit.prevent="">
    <label>
      <p>Elige tu endpoint</p>
      <select v-model="endpointElegido" >
        <option v-for="[nombre, valor] in endpoints" :key="nombre" :value="valor">
          {{ nombre }}
        </option>
      </select>
    </label>
  </form>

  <p>
    Endpoint seleccionado: <strong>{{ endpointElegido }}</strong>
  </p>
</template>

<script setup>
import { endpoints, endpointElegido } from '@/DatosJSON.js'

</script>
