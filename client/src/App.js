import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfil from "./pages/UserProfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        < Route exact path="/" element={<Home/>} />
        < Route path="/userprofil" element={<UserProfil/>} />
        < Route path="*" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
