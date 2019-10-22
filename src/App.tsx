import { TodosModule } from 'features/todos/module';
import React from 'react';
import { Registry, TypelessContext } from 'typeless';

const registry = new Registry();

export const App: React.FC = () => {
  return (
    <TypelessContext.Provider value={{ registry }}>
      <TodosModule />
    </TypelessContext.Provider>
  );
};
