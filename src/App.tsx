import { Component, createSignal } from 'solid-js';

export const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Welcome to SolidJS + Tailwind
      </h1>
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setCount(count() + 1)}
      >
        Count: {count()}
      </button>
    </div>
  );
};