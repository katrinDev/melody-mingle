import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/authPages/SignIn";
import SignUp from "../pages/authPages/SignUp";
import { useContext } from "react";
import { Context } from "../main";
import About from "../pages/About";
import { observer } from "mobx-react-lite";

const AppRouter: React.FC = observer(() => {
  const { userStore } = useContext(Context);

  return userStore.isAuth ? (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/about" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
});

export default AppRouter;
