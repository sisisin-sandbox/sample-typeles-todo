import { Todo } from 'features/todos/interface';

let todos: Todo[] = [{ text: 'initial todo', completed: true }, { text: 'initial todo2', completed: false }];

const sleep = () =>
  new Promise(done => {
    setTimeout(() => done(), 300);
  });

export const getAllTodos = () => sleep().then(() => todos);

export const addTodo = async (text: string) => {
  const todo: Todo = { text, completed: false };
  todos = [...todos, todo];
  await sleep();
};

export const toggleTodo = async (idx: number) => {
  todos = todos.map((todo, i) => {
    if (i === idx) {
      return { ...todo, completed: !todo.completed };
    } else {
      return todo;
    }
  });
  await sleep();
};
