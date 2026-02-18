<template>
  <div class="login-container">
    <form v-if="!loginStatus" @submit.prevent="hacerLogin">
      <input v-model="user" type="text" placeholder="Usuario (ej: admin1)">
      <input v-model="password" type="password" placeholder="Contraseña (ej: 1234)">
      <input type="submit" value="Entrar">
    </form>

    <div v-else>
      <PanelControl>
      </PanelControl>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PanelControl from "@/components/PanelControl.vue";

const user = ref("");
const password = ref("");
const loginStatus = ref(false);
const datosUsuario = ref(null);

const hacerLogin = async () => {
  try {
    const response = await fetch("http://100.52.46.68:3000/usuarios");
    const usuarios = await response.json();

    const datosValidos = usuarios.find(u =>
      u.login === user.value && u.password_hash === password.value
    );

    if (datosValidos) {
      loginStatus.value = true;
      datosUsuario.value = datosValidos;
    } else {
      alert("Credenciales incorrectas");
    }
  } catch (error) {
    alert("Error de conexión con la API");
  }
};
</script>
