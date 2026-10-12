import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {federation} from "@module-federation/vite";



// MFE plugin for vite is helping the app so that it can expose modules at runtime
// via remoteEntry.js file instaed of copying entire source code . This is the file that will be loaded by the host app to get the exposed modules.


export default defineConfig({
  plugins: [
    federation({
    name: 'products', //unique remote name
    filename: 'remoteEntry.js',
    exposes: {
      './ProductList': './src/App.tsx', // expose the ProductList component to the host app
      // './ProductItem': './src/components/ProductItem.tsx'
    },
    
    dts: false, // disable generation of dts file for now
    dev : {
      disableDynamicRemoteTypeHints : true 
    },

     shared : {
        react : {
          singleton : true,
          requiredVersion : '^19.2.8'
        },
        'react/' : {
          singleton : true,
          requiredVersion : '^19.2.8'
        },
        'react-dom' : {
          singleton : true,
          requiredVersion : '^19.2.8'
        }
      },
  }),

  react()
  ],

  // if host run on 3000 port then base run on port 3001 so that host can load the remoteEntry.js file from this port


  base : 'http://localhost:3001',

   server: {
    port: 3001,

    // if port 3000 fail then fail the build, do not try to find another port like 3001,
    strictPort : true ,
    origin: 'http://localhost:3001',

  },
  build : {
    target : "chrome89"
  }
})
