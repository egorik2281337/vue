import { defineConfig } from 'eslint-config-fans'

export default defineConfig({
  typescript: true,
  vue: {
    a11y: true,
    extendUndefComponents: ['CustomComponent'],
  },
  stylistic: true,
})
