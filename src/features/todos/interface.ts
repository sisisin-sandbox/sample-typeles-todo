import { createModule } from 'typeless';
import { TodosSymbol } from './symbol';

export const [useTodosModule, TodosActions, getTodosState] = createModule(TodosSymbol)
  .withActions({
    $mounted: null,
    fetchTodo: null,
    fetchTodoFulfilled: (todos: Todo[]) => ({ payload: { todos } }),
    addTodo: (text: string) => ({ payload: { text } }),
    toggleTodo: (idx: number) => ({ payload: { idx } }),
    setVisibilityFilter: (filter: VisibilityFilter) => ({ payload: { filter } }),
  })
  .withState<TodosState>();

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

export interface Todo {
  text: string;
  completed: boolean;
}
export interface TodosState {
  visibilityFilter: VisibilityFilter;
  todos: Todo[];
}
