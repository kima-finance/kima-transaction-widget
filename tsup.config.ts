import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'], // Entry point for the module
  format: ['cjs', 'esm'], // Output both CommonJS and ESM
  dts: {
    resolve: true // Resolve external types
  },
  sourcemap: true, // Include source maps for debugging
  clean: true, // Clean the output directory before building
  external: ['react', 'react-dom'], // Mark these dependencies as external
  target: 'esnext', // Modern JavaScript target
  splitting: false, // Disable code splitting for libraries
  minify: false, // Keep unminified for easier debugging
  metafile: true // Generate a metafile for detailed build stats
})
