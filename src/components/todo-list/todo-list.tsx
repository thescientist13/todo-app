import { Signal } from 'signal-polyfill';
import { effect } from 'wc-compiler/effect';
import type { Todo } from '../todo-list-item/todo-list-item.tsx';
import '../badge/badge.tsx';
import '../todo-list-item/todo-list-item.tsx';

export default class TodoList extends HTMLElement {
  #todos = new Signal.State<Todo[]>([]);
  #stopEffect?: () => void;
  #nextId = 0;
  #onDelete = (event: Event) => this.#deleteTodo((event as CustomEvent<number>).detail);
  #onComplete = (event: Event) => this.#completeTodo((event as CustomEvent<number>).detail);

  connectedCallback() {
    this.render();
    // TODO: Replace this full-render effect with inferred observability when reactive loops are supported.
    // https://github.com/ProjectEvergreen/wcc/issues/304
    this.#stopEffect = effect(() => {
      this.#todos.get();
      // Track only the list state, not signals read while mounting child elements.
      Signal.subtle.untrack(() => this.render());
    });
    this.addEventListener('deleteTodo', this.#onDelete);
    this.addEventListener('completeTodo', this.#onComplete);
  }

  disconnectedCallback() {
    this.#stopEffect?.();
    this.removeEventListener('deleteTodo', this.#onDelete);
    this.removeEventListener('completeTodo', this.#onComplete);
  }

  #addTodo(event: Event) {
    event.preventDefault();
    const input = this.querySelector<HTMLInputElement>('.todo-input');
    const task = input?.value.trim();

    if (input && task) {
      const now = Date.now();
      this.#nextId = Math.max(now, this.#nextId + 1);
      this.#todos.set([
        ...this.#todos.get(),
        { completed: false, task, id: this.#nextId, created: now }
      ]);
      input.value = '';
    }
  }

  #completeTodo(todoId: number) {
    this.#todos.set(this.#todos.get().map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  #deleteTodo(todoId: number) {
    this.#todos.set(this.#todos.get().filter(todo => todo.id !== todoId));
  }

  render() {
    const todos = this.#todos.get();
    const completedCount = todos.filter(todo => todo.completed).length;
    const allTodosCompleted = todos.length > 0 && completedCount === todos.length;

    return (
      <div>
        <h3><u>My Todo List 📝</u></h3>
        <h5>Completed TODOs:
          <wcc-badge count={completedCount} predicate={allTodosCompleted}/>
        </h5>
        <form onsubmit={this.#addTodo}>
          <input class="todo-input" type="text" placeholder="Food Shopping" required/>
          <button class="add-todo" type="submit">+ Add</button>
        </form>
        <ol>
          {todos.map(todo => (
            <li><wcc-todo-list-item todo={JSON.stringify(todo)}/></li>
          ))}
        </ol>
      </div>
    );
  }
}

customElements.define('wcc-todo-list', TodoList);
