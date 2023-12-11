import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/authPages/SignIn";
import SignUp from "../pages/authPages/SignUp";
import { useContext } from "react";
import { Context } from "../main";
import About from "../pages/about/About";
import { observer } from "mobx-react-lite";
import BasicLayout from "../pages/layouts/BasicLayout";
import MyProfile from "../pages/profile/MyProfile";
import EditProfile from "../pages/profile/EditProfile";
import { ABOUT, EDIT_PROFILE, PROFILE, SIGN_IN, SIGN_UP } from "./paths";

const AppRouter: React.FC = observer(() => {
  const { userStore } = useContext(Context);

  return userStore.isAuth ? (
    <Routes>
      <Route path={ABOUT} element={<About />} />

      <Route
        path={EDIT_PROFILE}
        element={
          <BasicLayout>
            <EditProfile />
          </BasicLayout>
        }
      />
      <Route
        path={PROFILE}
        element={
          <BasicLayout>
            <MyProfile />
          </BasicLayout>
        }
      />
      <Route path="*" element={<Navigate to={PROFILE} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />
      <Route path="*" element={<Navigate to={SIGN_IN} />} />
    </Routes>
  );
});

export default AppRouter;
