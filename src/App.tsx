import React from 'react';
import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      <div className="relative md:bg-zinc-800/50 md:p-8 md:rounded-3xl md:shadow-2xl md:backdrop-blur-sm">
        <Calculator />
      </div>
    </div>
  );
}

export default App;