import React from 'react';
import { useActions, useMappedState } from 'typeless';
import { getTodosState, TodosActions, VisibilityFilter } from '../interface';

const FilterLink: React.FC<{ filter: VisibilityFilter }> = ({ children, filter }) => {
  const { setVisibilityFilter } = useActions(TodosActions);
  const { visibilityFilter } = useMappedState([getTodosState], state => state);
  if (visibilityFilter === filter) {
    return <span>{children}</span>;
  }

  return (
    <button
      onClick={e => {
        e.preventDefault();
        setVisibilityFilter(filter);
      }}
    >
      {children}
    </button>
  );
};
const VisibilityFilters = () => {
  return (
    <p>
      Show:<FilterLink filter="SHOW_ALL">ALL</FilterLink>
      {', '}
      <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
      {', '}
      <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
  );
};
const AddTodo = () => {
  const input = React.useRef<HTMLInputElement>();
  const { addTodo } = useActions(TodosActions);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.current!.value.trim()) {
            return;
          }
          addTodo(input.current!.value);
          input.current!.value = '';
        }}
      >
        <input
          ref={node => {
            input.current = node!;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

const VisibleTodoList = () => {
  const todos = useMappedState([getTodosState], ({ todos, visibilityFilter }) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
  });
  const { toggleTodo } = useActions(TodosActions);

  return (
    <ul>
      {todos.map(({ text, completed }, i) => (
        <li
          key={i}
          onClick={() => toggleTodo(i)}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
          }}
        >
          {text}
        </li>
      ))}
    </ul>
  );
};

export const TodosView = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <VisibilityFilters />
    </div>
  );
};
