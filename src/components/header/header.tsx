export default class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    return (
      <header>        
        <h2 class="header-text">Todo App Example</h2>
      </header>
    );
  }
}

customElements.define('wcc-header', Header);