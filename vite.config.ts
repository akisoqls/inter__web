import { defineConfig, normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: "./src",
  server: {
    port: 8082,
    open: true
  },
  build: {
    sourcemap: false,
    outDir: "../public",
  },
  mode: "production",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./assets/gltf/*",
          dest: "./assets/gltf"
        },
        {
          src: "./assets/jsons/*",
          dest: "./assets/jsons"
        },
        {
          src: "./assets/images/ogimage.png",
          dest: "./assets/images/"
        },
        {
          src: "./assets/images/artists_portrait/*",
          dest: "./assets/images/artists_portrait"
        }
      ]
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'last 2 versions',
            'ie > 11',
            'iOS >= 10',
            'Android >= 5'
          ]
        })
      ],
    },
  },
});