import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import { getAll } from "./redux/actions"
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import Home from "../src/views/home"
import Landing from "../src/views/landing";
import Detail from "../src/views/detail";
import Favorites from "../src/views/favorites";
import Form from "../src/views/form";
import Nav from "./components/nav";

function App() {
  
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  
  

  return (
    <div className='App'>
      
        {location.pathname !== '/' && <Nav/>}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<Form />} />
        </Routes>
      
    </div>
  );
}

export default App;
