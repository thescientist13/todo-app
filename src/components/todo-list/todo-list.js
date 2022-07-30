import '../todo-list-item/todo-list-item.jsx';

export default class TodoList extends HTMLElement {
  constructor() {
    super();
    console.log('ENTER TodoList');
  }
  
  connectedCallback() {
    this.innerHTML = `
      <wcc-todo-list-item></wcc-todo-list-item>
    `;
  }
}

customElements.define('wcc-todo-list', TodoList);