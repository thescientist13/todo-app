import '../badge/badge.jsx';
import '../todo-list-item/todo-list-item.jsx';

export default class TodoList extends HTMLElement {
  constructor() {
    super();
    this.todos = [];
  }

  connectedCallback() {
    this.render();

    document.addEventListener('deleteTodo', (event) => this.deleteTodo(event.detail));
    document.addEventListener('completeTodo', (event) => this.completeTodo(event.detail));
  }

  addTodo() {
    // TODO e.preventDefault();
    const inputElement = this.getElementsByTagName('input')[0];
    const userInput = inputElement.value;

    if (userInput && userInput !== '') {
      const now = Date.now();

      this.todos = [
        ...this.todos,
        {
          completed: false,
          task: userInput,
          id: now,
          created: now
        }
      ];

      inputElement.value = '';

      this.render();
    } else {
      console.warn('invalid input, please try again'); // eslint-disable-line
    }

    return false;
  }

  completeTodo(todoId) {
    const updatedTodos = this.todos.map(todo => {
      todo.completed = todoId === todo.id ? !todo.completed : todo.completed;

      return todo;
    });

    this.todos = [...updatedTodos];
    this.render();
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== todoId;
    });
    this.render();
  }

  // TODO
  // default form event handling
  // <form onsubmit={(e) => { this.addTodo(e); }}>
  render() {
    const { todos } = this;
    const completedTodos = todos.filter(todo => todo.completed);
    const allTodosCompleted = completedTodos.length !== 0 && completedTodos.length === todos.length;
    const list = this.todos.map((todo) => `
      <li>
        <wcc-todo-list-item
          todo='${JSON.stringify(todo)}'
        ></wcc-todo-list-item>
      </li>
    `).join('');

    return (
      <div>
        <h3><u>My Todo List 📝</u></h3>
        <h5>Completed TODOs:
          <wcc-badge count={completedTodos.length} predicate={allTodosCompleted}></wcc-badge>
        </h5>

        <form>
          <input class="todo-input" type="text" placeholder="Food Shopping" required/>
          <button class="add-todo" type="button" onclick={this.addTodo}>+ Add</button>
        </form>

        <ol>
          {list}
        </ol>

      </div>
    );
  }
}

customElements.define('wcc-todo-list', TodoList);