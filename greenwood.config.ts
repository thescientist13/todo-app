import { greenwoodPluginImportJsx } from '@greenwood/plugin-import-jsx';
import type { Config } from '@greenwood/cli';

export default {
  prerender: true,
  plugins: [
    greenwoodPluginImportJsx({ inferredObservability: true })
  ]
} satisfies Config;
