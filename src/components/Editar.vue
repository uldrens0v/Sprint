<template>
  <div class="formulario-dinamico">
    <h1>Editar {{ endpointElegido }}</h1>

    <form v-if="cabeceras.length > 0" @submit.prevent="editar">
      <label v-for="columna in cabeceras" :key="columna">
        {{ columna.toUpperCase().replace('_', ' ') }}:
        <input v-model="form[columna]" type="text" required />
      </label>

      <button type="submit">
        Editar un {{ endpointElegido.valueOf().replace(/s$/, ' ') }} en la API
      </button>
    </form>

    <p v-else class="cargando">Esperando estructura de la tabla {{ endpointElegido }}...</p>

    <p v-if="mensaje" :class="{ error: mensaje.includes('Error') }">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import {  ref, watch } from 'vue'
import { datosJSON, endpointElegido, obtenerDatos,cabeceras } from '@/DatosJSON.js'

const mensaje = ref('')
const form = ref({})



//iniciamos el formularuio con campos vacios
const inicializarFormulario = () => {
  const nuevoEstado = {}
  cabeceras.value.forEach((columna) => {
    nuevoEstado[columna] = ''
  })
  form.value = nuevoEstado
}

//miramos el valor de cabeceras para inicializar el formulario
watch(
  cabeceras,
  (nuevasColumnas) => {
    if (nuevasColumnas.length > 0) {
      inicializarFormulario()
    }
  },
  { immediate: true },
)
const editar = async () => {
  const campoIdentificador = cabeceras.value[0]
  const valorIdentificador = form.value[campoIdentificador]
  const API_URL = `http://100.52.46.68:3000/${endpointElegido.value}/${valorIdentificador}`
  mensaje.value = 'Enviando...'

  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (response.ok) {
      mensaje.value = `¡Editado en ${endpointElegido.value}!`
      inicializarFormulario()
      await obtenerDatos()
    } else {
      mensaje.value = 'Error: El servidor rechazó los datos.'
    }
  } catch (error) {
    mensaje.value = 'Error de conexión: ' + error
  }
}
</script>

<style scoped>
.formulario-dinamico {
  max-width: 400px;
  margin: 20px auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: bold;
}
input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  background: #42b983;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  font-weight: bold;
}
.cargando {
  color: #666;
  font-style: italic;
}
</style>
