import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register"
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Chat/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/setavat" element={<SetAvatar/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
