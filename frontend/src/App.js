import './App.css';

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Auth from './Auth';
import Details from './Details';

const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Auth />} />
      <Route path="/details" element={<Details />} />
    </Route>
  ))
function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
