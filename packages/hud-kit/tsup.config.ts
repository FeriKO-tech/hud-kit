import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'framer-motion'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  onSuccess: 'echo "Build complete!"',
});
