import React from 'react';
import * as API from 'services/API';
import { TodosView } from './components/TodosView';
import { TodosActions, TodosState, useTodosModule } from './interface';

useTodosModule
  .epic()
  .onMany([TodosActions.$mounted, TodosActions.fetchTodo], async () => {
    const todos = await API.getAllTodos();
    return TodosActions.fetchTodoFulfilled(todos);
  })
  .on(TodosActions.addTodo, async ({ text }) => {
    await API.addTodo(text);
    return TodosActions.fetchTodo();
  })
  .on(TodosActions.toggleTodo, async ({ idx }) => {
    await API.toggleTodo(idx);
    return TodosActions.fetchTodo();
  });

const initialState: TodosState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [],
};

useTodosModule
  .reducer(initialState)
  .on(TodosActions.setVisibilityFilter, (state, { filter }) => {
    state.visibilityFilter = filter;
  })
  .on(TodosActions.fetchTodoFulfilled, (state, { todos }) => {
    state.todos = todos;
  })
  .on(TodosActions.addTodo, (state, { text }) => {
    state.todos.push({ text, completed: false });
  })
  .replace(TodosActions.toggleTodo, (state, { idx }) => {
    return {
      ...state,
      todos: state.todos.map((todo, i) => {
        if (i === idx) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      }),
    };
  });

export const TodosModule = () => {
  useTodosModule();
  return <TodosView />;
};
