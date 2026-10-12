import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// fix port so remotes always know where host live 
export default defineConfig({
  plugins: [
    react(),
    federation({
      name : 'host', // unique host name
      remotes : {
        products : {
          type : 'module',
          name : 'products',
          entry : 'http://localhost:3001/remoteEntry.js',
          entryGlobalName : 'products',
          shareScope : 'default'
        },
        cart : {
          type : 'module',
          name : 'cart',
          entry : 'http://localhost:3002/remoteEntry.js',
          entryGlobalName : 'cart',
          shareScope : 'default'
        },
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
      dts : false, // disable generation of dts file for now
    })

  ],

  server: {
    port: 3000,
    // if port 3000 fail then fail the build, do not try to find another port like 3001,
    strictPort : true ,
    origin: 'http://localhost:3000',

  },

  build : {
    target : "chrome89"
  }

})
