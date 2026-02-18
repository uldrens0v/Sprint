<template>
  <div class="gestion-dinamica">
    <h1>Listado de {{ endpointElegido }}</h1>
    <button @click="obtenerDatos" class="btn-refrescar">Refrescar Lista</button>

    <div v-if="datosJSON.length > 0" class="table-container">
      <table border="1">
        <thead>
          <tr>
            <th v-for="columna in cabeceras" :key="columna">
              {{ columna.toUpperCase().replace('_', ' ') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fila, index) in datosJSON" :key="index">
            <td v-for="columna in cabeceras" :key="columna">
              {{ fila[columna] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="info">Cargando datosJSON o tabla vacía...</p>
  </div>
</template>

<script setup>
import {  onMounted, watch } from 'vue'
import { endpointElegido,datosJSON,obtenerDatos,cabeceras } from '@/DatosJSON.js'


// Propiedad computada para sacar los nombres de las columnas




watch(endpointElegido, () => {
  obtenerDatos()
})

onMounted(() => {
  obtenerDatos()
})
</script>
