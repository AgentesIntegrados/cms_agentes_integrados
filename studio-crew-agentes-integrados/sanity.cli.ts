import {defineCliConfig} from 'sanity/cli'
import {type UserConfig} from 'vite'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'qj4a8id6'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'crew-agentes-integrados',
  vite(viteConfig: UserConfig): UserConfig {
    return {
      ...viteConfig,
      define: {
        ...viteConfig.define,
        // `sanity dev` enables speedy in both development and production, this line restores the default `styled-components` behaviour of only enabling it in production
        'process.env.SC_DISABLE_SPEEDY': JSON.stringify(process.env.NODE_ENV !== 'production'),
      },
    }
  },
})
