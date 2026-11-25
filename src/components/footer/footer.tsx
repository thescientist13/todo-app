export default class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    return (
      <footer>
        <a href="https://projectevergreen.github.io">Project Evergreen</a>
      </footer>
    );
  }
}

customElements.define('wcc-footer', Footer);