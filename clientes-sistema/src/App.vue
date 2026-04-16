<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-h4 mb-6 text-center">Sistema de Clientes</h1>

        <v-card class="pa-6 mb-6" elevation="6" rounded="xl">
          <h2 class="text-h6 mb-4">
            {{ editando ? 'Editar cliente' : 'Agregar cliente' }}
          </h2>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.nombre" label="Nombre" variant="outlined" color="primary" density="comfortable" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.apellido" label="Apellido" variant="outlined" color="primary" density="comfortable" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.email" label="Correo" variant="outlined" color="primary" density="comfortable" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.direccion" label="Dirección" variant="outlined" color="primary" density="comfortable" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.telefono" label="Teléfono" variant="outlined" color="primary" density="comfortable" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.puntos" label="Puntos" type="number" variant="outlined" color="primary" density="comfortable" />
            </v-col>
          </v-row>

          <v-card-actions class="pa-0 mt-4">
            <v-btn color="primary" variant="elevated" @click="guardarCliente">
              {{ editando ? 'Actualizar' : 'Guardar' }}
            </v-btn>

            <v-btn color="secondary" variant="outlined" class="ml-2" @click="limpiarFormulario">
              Limpiar
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="pa-4" elevation="6" rounded="xl">
          <h2 class="text-h6 mb-4">Lista de clientes</h2>

          <v-table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Puntos</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellido }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.puntos }}</td>
                <td class="text-center">
                  <v-btn icon="mdi-pencil" variant="text" color="blue" @click="prepararEdicion(cliente)"></v-btn>
                  
                  <v-btn icon="mdi-delete" variant="text" color="error" @click="eliminarCliente(cliente.id)"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/clientes'

// Estado del formulario
const form = ref({
  id: null,
  nombre: '',
  apellido: '',
  email: '',
  direccion: '',
  telefono: '',
  puntos: 0
})

const clientes = ref([])
const editando = ref(false)

// 1. Obtener datos
const obtenerClientes = async () => {
  try {
    const res = await axios.get(API_URL)
    clientes.value = res.data
  } catch (error) {
    console.error("Error al obtener datos", error)
  }
}

// 2. Guardar o Actualizar
const guardarCliente = async () => {
  if (!form.value.nombre || !form.value.email) return alert("Nombre y Email son requeridos")

  try {
    if (editando.value) {
      // Si estamos editando, usamos PUT
      await axios.put(`${API_URL}/${form.value.id}`, form.value)
    } else {
      // Si es nuevo, usamos POST
      await axios.post(API_URL, form.value)
    }
    obtenerClientes()
    limpiarFormulario()
  } catch (error) {
    console.error("Error al guardar", error)
  }
}

// 3. Preparar edición (Cargar datos de la tabla al formulario)
const prepararEdicion = (cliente) => {
  form.value = { ...cliente }
  editando.value = true
}

// 4. Eliminar
const eliminarCliente = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este cliente?")) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    obtenerClientes()
  } catch (error) {
    console.error("Error al eliminar", error)
  }
}

const limpiarFormulario = () => {
  form.value = { id: null, nombre: '', apellido: '', email: '', direccion: '', telefono: '', puntos: 0 }
  editando.value = false
}

onMounted(obtenerClientes)
</script>