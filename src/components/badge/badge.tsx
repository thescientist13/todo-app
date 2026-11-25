import { Signal } from 'signal-polyfill';

export const inferredObservability = true;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wcc-badge': { count?: number; predicate?: boolean };
    }
  }
}

export default class BadgeComponent extends HTMLElement {
  count: Signal.State<number>;
  predicate: Signal.State<boolean>;
  #celebration: Signal.Computed<string>;
  #className: Signal.Computed<string>;

  constructor() {
    super();
    this.count = new Signal.State(0);
    this.predicate = new Signal.State(false);
    this.#celebration = new Signal.Computed(() => this.predicate.get() ? ' 🥳' : '');
    this.#className = new Signal.Computed(() => this.predicate.get() ? 'met' : 'unmet');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { count, predicate } = this;

    return (
      <span class={this.#className.get()} data-completed={predicate.get()}>{count.get()}{this.#celebration.get()}</span>
    );
  }
}

customElements.define('wcc-badge', BadgeComponent);
