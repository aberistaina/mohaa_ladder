import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  "rules": {
  "react/prop-types": "off"
},
build: {
    sourcemap: true, // Habilita los source maps para depuración en producción
  },

})
