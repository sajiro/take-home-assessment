import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  UnAuthenticateRoutes,
  AuthenticateRoutes,
} from "./components/layouts/private";
import Login from "./screens/login-screen";
import MainScreen from "./screens/main-screen";
import ContactScreen from "./screens/contact-screen";
import LoginLayout from "./components/layouts/login";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<UnAuthenticateRoutes />}>
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Route>
        <Route element={<AuthenticateRoutes />}>
          <Route path="/main" element={<MainScreen />}>
            <Route index element={<ContactScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
