import { expect } from '@esm-bundle/chai';
import TodoListItem from './todo-list-item.tsx';

describe('Components/TodoListItem', () => {

  describe('Default Behavior', () => {
    let todoListItem: TodoListItem;

    beforeEach(() => {
      todoListItem = document.createElement('wcc-todo-list-item') as TodoListItem;

      document.body.appendChild(todoListItem);
    });

    it('should have no content output', () => {
      expect(todoListItem.textContent).to.equal('');
    });

    afterEach(() => {
      todoListItem.remove();
    });
  });

  describe('Todo Display Output Behavior', () => {
    let todoListItem: TodoListItem;

    beforeEach(() => {
      const now = new Date().getTime();

      todoListItem = document.createElement('wcc-todo-list-item') as TodoListItem;
      todoListItem.setAttribute('todo', JSON.stringify({
        completed: false,
        task: 'run errands',
        id: now,
        created: now
      }));

      document.body.appendChild(todoListItem);
    });

    it('should display the task value', () => {
      const output = todoListItem.querySelectorAll('span')[0];

      expect(output.textContent).to.contain('run errands');
    });

    // TODO add more test cases

    afterEach(() => {
      todoListItem.remove();
    });
  });

});
