<script setup>
import { ref } from 'vue'
import { endpointElegido, cabeceras, obtenerDatos } from '@/DatosJSON.js'

const idABorrar = ref('')
const mensaje = ref('')

const borrarRegistro = async () => {
  if (!idABorrar.value) {
    mensaje.value = 'Por favor, introduce un ID.'
    return
  }


  const API_URL = `http://100.52.46.68:3000/${endpointElegido.value}/${idABorrar.value}`

  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
    })

    if (response.ok) {
      mensaje.value = `¡${endpointElegido.value.replace(/s$/, '')} eliminado con éxito!`
      idABorrar.value = ''
      await obtenerDatos()
    } else {
      mensaje.value = 'Error: No se encontró el ID o el servidor falló.'
    }
  } catch (error) {
    mensaje.value = `Error: No se pudo conectar con la API: ${error}`
  }
}
</script>

<template>
  <div class="formulario-dinamico">
    <h1>Borrar {{ endpointElegido.replace(/s$/, '') }}</h1>

    <div v-if="cabeceras.length > 0">
      <p>
        Introduce el <strong>{{ cabeceras[0].toUpperCase() }}</strong> para eliminar:
      </p>

      <form @submit.prevent="borrarRegistro">
        <input v-model="idABorrar" type="text" required />
        <button type="submit" class="btn-borrar">Eliminar de {{ endpointElegido }}</button>
      </form>
    </div>

    <p v-else class="cargando">Cargando estructura...</p>

    <p
      v-if="mensaje"
      :class="{ error: mensaje.includes('Error'), exito: !mensaje.includes('Error') }"
    >
      {{ mensaje }}
    </p>
  </div>
</template>

<style scoped>
.formulario-dinamico {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.btn-borrar {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  font-weight: bold;
}

</style>
