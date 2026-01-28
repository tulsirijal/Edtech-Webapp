
export default defineConfig({
  plugins: [react()],
  define: {

    'global': 'globalThis',
    'process.env': {},
  },
  build: {
    sourcemap: true,

    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})