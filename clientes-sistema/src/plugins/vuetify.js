import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// 1. IMPORTA ESTO (Es vital para el build de Vercel)
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  // 2. REGISTRA LOS COMPONENTES
  components,
  directives,
  theme: {
    defaultTheme: 'miTema',
    themes: {
      miTema: {
        dark: false,
        colors: {
          background: '#DBD2C9',
          surface: '#DBD2C9',
          primary: '#7F1D25',
          secondary: '#9F6162',
          accent: '#CD9395',
          error: '#63131C',
          info: '#CD9395'
        }
      }
    }
  }
})