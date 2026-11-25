import { expect } from '@esm-bundle/chai';
import TodoList from './todo-list.tsx';

describe('Components/TodoList', () => {

  describe('Default Behavior', () => {
    let todoList: TodoList;

    beforeEach(() => {
      todoList = document.createElement('wcc-todo-list') as TodoList;

      document.body.appendChild(todoList);
    });

    it('should have no content output', () => {
      expect(todoList.textContent).to.contain('My Todo List');
    });

    afterEach(() => {
      todoList.remove();
    });
  });

  // TODO add test cases for event handling and adding a todo, and deleting one

});
