<template>
  <v-container>
    <h1>Gestión de Clientes</h1>

    <v-text-field
      v-model="search"
      label="Buscar cliente"
      prepend-icon="mdi-magnify"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="clientes"
      :search="search"
    ></v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Nombre', key: 'nombre' },
  { title: 'Correo', key: 'correo' },
  { title: 'Teléfono', key: 'telefono' },
]

const clientes = ref([
  { nombre: 'Juan Pérez', correo: 'juan@gmail.com', telefono: '123456789' },
  { nombre: 'Ana López', correo: 'ana@gmail.com', telefono: '987654321' },
])
</script>