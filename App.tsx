import { Router, Routes, Route } from '@solidjs/router';

export const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* Agrega una ruta para manejar 404 */}
        <Route path="*" component={() => <div>404: Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};