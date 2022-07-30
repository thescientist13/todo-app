export default class TodoListItem extends HTMLElement {
  constructor() {
    super();
    console.log('ENTER TodoListItem');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    return (
      <h4>This is a todo list item</h4>
    );
  }
}

customElements.define('wcc-todo-list-item', TodoListItem);