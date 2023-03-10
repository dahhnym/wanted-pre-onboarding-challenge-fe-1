import { Route, Routes } from "react-router-dom";
import TodoContent from "./components/Todo/TodoContent";
import Home from "./pages";
import Auth from "./pages/auth";
import PageNotFound from "./pages/PageNotFound";
import Todo from "./pages/todo";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/todo' element={<Todo />}>
        <Route path='/todo/:id' element={<TodoContent />} />
      </Route>
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
