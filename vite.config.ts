import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import config from './package.json' with {type:"json"};
export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({
            include: ['components/'],
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },

    build: {
        lib: {
            entry: resolve('components', 'index.ts'),
            formats: ['es'],
        },

        rollupOptions: {
            external: [...Object.keys(config.peerDependencies)],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
