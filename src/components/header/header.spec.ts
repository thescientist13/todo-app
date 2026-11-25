import { expect } from '@esm-bundle/chai';
import Header from './header.tsx';

describe('Components/Header', () => {
  let header: Header;

  beforeEach(() => {
    header = document.createElement('wcc-header') as Header;

    document.body.appendChild(header);
  });

  afterEach(() => {
    header.remove();
  });

  describe('Default Behavior', () => {

    it('should have a greeting', () => {
      const greeting = header.querySelectorAll('header h2')[0];

      expect(greeting.innerHTML).to.equal('Todo App Example');
    });

  });

});
