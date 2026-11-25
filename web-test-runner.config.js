import fs from 'node:fs/promises';
import { defaultReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';
import { greenwoodPluginImportJsx } from '@greenwood/plugin-import-jsx';
import ts from 'typescript';

const importJsxResource = greenwoodPluginImportJsx()[0].provider({});
const configPath = new URL('./tsconfig.json', import.meta.url);
const { config } = ts.readConfigFile(configPath.pathname, ts.sys.readFile);
const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(config.compilerOptions, process.cwd());

/** @type {import('@web/test-runner').TestRunnerConfig} */
export default {
  files: './src/**/*.spec.ts',
  nodeResolve: true,
  mimeTypes: { '**/*.ts': 'js', '**/*.tsx': 'js' },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    junitReporter({ outputPath: './reports/test-results.xml' })
  ],
  coverage: true,
  coverageConfig: { reportDir: './reports' },
  plugins: [{
    name: 'import-jsx',
    async transform(context) {
      const url = new URL(`.${context.path}`, import.meta.url);

      if (await importJsxResource.shouldServe(url)) {
        const response = await importJsxResource.serve(url);

        return { body: await response.text(), type: 'js' };
      }
    }
  }, {
    // strip types from .ts tests before serving them to the browser
    name: 'transpile-typescript',
    async transform(context) {
      const url = new URL(`.${context.path}`, import.meta.url);

      if (url.pathname.endsWith('.ts')) {
        const contents = await fs.readFile(url, 'utf-8');
        const { outputText } = ts.transpileModule(contents, { compilerOptions, fileName: url.pathname });

        return { body: outputText, type: 'js' };
      }
    }
  }]
};
