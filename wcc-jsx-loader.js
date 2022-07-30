/*
 *
 * Enables using JavaScript to import JSX files with WCC.
 *
 */
import { load } from 'wc-compiler/src/jsx-loader.js';
import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';
import { pathToFileURL } from 'url';

class JsxResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['.jsx'];
    this.contentType = 'text/javascript';
  }

  async serve(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await load(pathToFileURL(url));

        resolve({
          body: result.source,
          contentType: this.contentType
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

const greenwoodPluginJsx = (options = {}) => {
  return [{
    type: 'resource',
    name: 'plugin-jsx:resource',
    provider: (compilation) => new JsxResource(compilation, options)
    // }, {
    //   type: 'rollup',
    //   name: 'plugin-import-typescript:rollup',
    //   provider: (compilation) => {
    //     const compilerOptions = getCompilerOptions(compilation.context.projectDirectory, options.extendConfig);

    //     return [
    //       rollupPluginTypescript(compilerOptions)
    //     ];
    //   }
  }];
};

export {
  greenwoodPluginJsx
};