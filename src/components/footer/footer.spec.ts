import { expect } from '@esm-bundle/chai';
import Footer from './footer.tsx';

describe('Components/Footer', () => {
  let footer: Footer;

  beforeEach(() => {
    footer = document.createElement('wcc-footer') as Footer;

    document.body.appendChild(footer);
  });

  afterEach(() => {
    footer.remove();
  });

  describe('Default Behavior', () => {
    let content: HTMLAnchorElement;

    beforeEach(() => {
      content = footer.querySelectorAll<HTMLAnchorElement>('footer a')[0];
    });

    it('should have a link to the project that displays the project name', () => {
      expect(content.textContent).to.equal('Project Evergreen');
    });

    it('should have a link to the project with the project name', () => {
      expect(content.href).to.equal('https://projectevergreen.github.io/');
    });
  });

});
