import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/authPages/SignIn";
import SignUp from "../pages/authPages/SignUp";
import { useContext } from "react";
import { Context } from "../main";
import About from "../pages/about/About";
import { observer } from "mobx-react-lite";
import BasicLayout from "../components/mainLayout/BasicLayout";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import {
  ABOUT,
  EDIT_PROFILE,
  MUSICIANS,
  PROFILE,
  OFFERS,
  SIGN_IN,
  SIGN_UP,
} from "./paths";
import OffersDashboard from "../pages/offersPage/OffersDashboard";
import MusiciansDashboard from "../pages/musiciansList/MusiciansDashboard";

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
            <Profile />
          </BasicLayout>
        }
      />

      <Route
        path={OFFERS}
        element={
          <BasicLayout>
            <OffersDashboard />
          </BasicLayout>
        }
      />

      <Route
        path={MUSICIANS}
        element={
          <BasicLayout>
            <MusiciansDashboard />
          </BasicLayout>
        }
      />
      <Route path="*" element={<Navigate to={MUSICIANS} />} />
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
