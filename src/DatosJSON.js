import { computed, ref } from 'vue'

export const endpoints = new Map([
  ['Alumnos', 'alumnos'],
  ['Roles', 'roles'],
  ['Estados', 'estados_usuario'],
  ['Etapas', 'etapas'],
  ['Turnos', 'turnos'],
  ['Departamentos', 'departamentos'],
  ['Espacios', 'espacios'],
  ['Profesores', 'profesores'],
  ['Cursos', 'cursos'],
  ['Usuarios', 'usuarios'],
])

export const endpointElegido = ref('alumnos')

export const datosJSON = ref([])
export const obtenerDatos = async () => {
  const urlActual = `http://100.52.46.68:3000/${endpointElegido.value}`
  try {
    const response = await fetch(urlActual)
    if (response.ok) {
      datosJSON.value = await response.json()
      console.log(JSON.stringify(datosJSON.value))
    }
  } catch (error) {
    console.error('Error al obtener datosJSON:', error)
  }
}

export const cabeceras = computed(() => {
  if (datosJSON.value.length > 0) {
    // Sacamos las llaves del primer objeto de la lista
    return Object.keys(datosJSON.value[0])
  }
  return []
})
