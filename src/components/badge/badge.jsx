export default class BadgeComponent extends HTMLElement {
  constructor() {
    super();

    this.count = 0;
    this.predicate = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { count, predicate } = this;
    const conditionalClass = predicate ? 'met' : 'unmet';
    const conditionalText = predicate ? ' 🥳' : '';

    return (
      <span class={conditionalClass}>{count}{conditionalText}</span>
    );
  }
}

customElements.define('wcc-badge', BadgeComponent);