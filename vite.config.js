import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve:{
    alias: [
      { find: "@", replacement: path.resolve(__dirname, `src`) },
    ],
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        "vue",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [dts({
    insertTypesEntry: true
  })],
});
