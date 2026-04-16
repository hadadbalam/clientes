import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'miTema',
    themes: {
      miTema: {
        dark: false,
        colors: {
          background: '#DBD2C9',   // fondo claro
          surface: '#DBD2C9',      // tarjetas
          primary: '#7F1D25',      // 🔥 rojo cereza (principal)
          secondary: '#9F6162',    // tono medio
          accent: '#CD9395',       // rosa suave
          error: '#63131C',        // rojo oscuro fuerte
          info: '#CD9395'
        }
      }
    }
  }
})