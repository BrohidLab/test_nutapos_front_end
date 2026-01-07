import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { mdi } from 'vuetify/iconsets/mdi'
import * as directives from 'vuetify/directives'

const md3Light = {
  dark: false,
  colors: {
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    secondary: '#625B71',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    background: '#FFFBFE',
    error: '#B3261E',
  },
}

const md3Dark = {
  dark: true,
  colors: {
    primary: '#D0BCFF',
    onPrimary: '#381E72',
    secondary: '#CCC2DC',
    background: '#1C1B1F',
    surface: '#1C1B1F',
    error: '#F2B8B5',
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
  },
  theme: {
    defaultTheme: 'md3Light',
    themes: {
      md3Light,
      md3Dark,
    },
  },
})
