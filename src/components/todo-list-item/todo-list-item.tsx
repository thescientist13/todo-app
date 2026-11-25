export interface Todo {
  completed: boolean;
  task: string;
  id: number;
  created: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wcc-todo-list-item': { todo: string };
    }
  }
}

export default class TodoListItem extends HTMLElement {
  // TODO: Use a todo signal with inferredObservability instead of manual attribute handling and rendering.
  // Requires reactive conditional branches (todo && ...) and bindings within the selected branch:
  // https://github.com/ProjectEvergreen/wcc/issues/311
  // Nested signal bindings also need depthful reactivity:
  // https://github.com/ProjectEvergreen/wcc/issues/256
  #todo: Todo | null = null;

  static get observedAttributes() {
    return ['todo'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'todo' && newValue !== oldValue) {
      this.#todo = newValue ? JSON.parse(newValue) : null;
      this.render();
    }
  }

  #dispatchDeleteTodoEvent() {
    this.dispatchEvent(new CustomEvent('deleteTodo', { detail: this.#todo?.id, bubbles: true }));
  }

  #dispatchCompleteTodoEvent() {
    this.dispatchEvent(new CustomEvent('completeTodo', { detail: this.#todo?.id, bubbles: true }));
  }

  render() {
    const todo = this.#todo;

    return (
      <>{todo && (
          <span>
            {todo.task}
            {/* TODO: Use checked={todo.completed} when WCC omits false boolean attributes.
                https://github.com/ProjectEvergreen/wcc/issues/309 */}
            {todo.completed ? (
              <input class="complete-todo" type="checkbox" checked
                aria-label="Complete todo" onchange={this.#dispatchCompleteTodoEvent}/>
            ) : (
              <input class="complete-todo" type="checkbox"
                aria-label="Complete todo" onchange={this.#dispatchCompleteTodoEvent}/>
            )}
            <span>{todo.completed ? '✅' : '⛔'}</span>
            <button class="delete-todo" aria-label="Delete todo" onclick={this.#dispatchDeleteTodoEvent}>❌</button>
          </span>
        )}</>
    );
  }
}

customElements.define('wcc-todo-list-item', TodoListItem);
