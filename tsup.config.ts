import { defineConfig } from 'tsup'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  entry: ['src/index.tsx'], // Entry point for the module
  format: ['cjs', 'esm'], // Output both CommonJS and ESM
  dts: {
    resolve: true // Resolve external types
  },
  sourcemap: true, // Include source maps for debugging
  clean: true, // Clean the output directory before building
  external: ['react', 'react-dom'], // Mark these dependencies as external
  target: 'es2022', // Modern JavaScript target
  splitting: false, // Disable code splitting for libraries
  minify: false, // Keep unminified for easier debugging
  metafile: true, // Generate a metafile for detailed build stats
  esbuildOptions(options) {
    options.assetNames = 'assets/[name]-[hash]'
  },
  onSuccess: async () => {
    // Manually copy fonts from src/fonts to dist/fonts
    const srcFontsDir = path.resolve(__dirname, 'src/fonts')
    const distFontsDir = path.resolve(__dirname, 'dist/')

    if (fs.existsSync(srcFontsDir)) {
      fs.mkdirSync(distFontsDir, { recursive: true })
      fs.readdirSync(srcFontsDir).forEach((file) => {
        fs.copyFileSync(
          path.join(srcFontsDir, file),
          path.join(distFontsDir, file)
        )
      })
    }
  }
})
