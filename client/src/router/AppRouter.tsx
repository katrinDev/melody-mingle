import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/authPages/SignIn';
import SignUp from '../pages/authPages/SignUp';
import { useContext } from 'react';
import { Context } from '../main';
import About from '../pages/about/About';
import { observer } from 'mobx-react-lite';
import BasicLayout from '../components/mainLayout/BasicLayout';
import EditProfilePage from '../pages/profile/EditProfilePage';
import MyMessages from '../pages/messages/MyMessages';
import {
	ABOUT,
	EDIT_PROFILE,
	MUSICIANS,
	MUSICIAN_PROFILE,
	MY_PROFILE,
	OFFERS,
	SIGN_IN,
	CHATS,
	SIGN_UP,
	MY_OFFERS,
	JOINT_PROJECTS,
	USERS_MANAGEMENT,
} from './paths';
import OffersDashboard from '../pages/offersPage/OffersDashboard';
import MusiciansDashboard from '../pages/musiciansList/MusiciansDashboard';
import Profile from '../pages/profile/Profile';
import JointProjectsPage from '../pages/jointProjects/JointProjectsPage';

const AppRouter: React.FC = observer(() => {
	const { userStore } = useContext(Context);

	return userStore.isAuth ? (
		userStore.isAdmin ? (
			<Routes>
				<Route path={ABOUT} element={<About />} />

				<Route
					path={MUSICIAN_PROFILE}
					element={
						<BasicLayout>
							<Profile key={MUSICIAN_PROFILE} />
						</BasicLayout>
					}
				/>

				<Route
					path={OFFERS}
					element={
						<BasicLayout>
							<OffersDashboard
								my={false}
								title={'Предложения о сотрудничестве'}
								key={OFFERS}
							/>
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

				<Route
					path={CHATS}
					element={
						<BasicLayout>
							<MyMessages />
						</BasicLayout>
					}
				/>

				<Route
					path={USERS_MANAGEMENT}
					element={
						<BasicLayout>
							<JointProjectsPage />
						</BasicLayout>
					}
				/>

				<Route path="*" element={<Navigate to={USERS_MANAGEMENT} />} />
			</Routes>
		) : (
			<Routes>
				<Route path={ABOUT} element={<About />} />

				<Route
					path={EDIT_PROFILE}
					element={
						<BasicLayout>
							<EditProfilePage />
						</BasicLayout>
					}
				/>
				<Route
					path={MY_PROFILE}
					element={
						<BasicLayout>
							<Profile key={MY_PROFILE} />
						</BasicLayout>
					}
				/>

				<Route
					path={MUSICIAN_PROFILE}
					element={
						<BasicLayout>
							<Profile key={MUSICIAN_PROFILE} />
						</BasicLayout>
					}
				/>
				<Route
					path={OFFERS}
					element={
						<BasicLayout>
							<OffersDashboard
								my={false}
								title={'Предложения о сотрудничестве'}
								key={OFFERS}
							/>
						</BasicLayout>
					}
				/>

				<Route
					path={MY_OFFERS}
					element={
						<BasicLayout>
							<OffersDashboard
								my={true}
								title={'Мои предложения'}
								key={MY_OFFERS}
							/>
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

				<Route
					path={CHATS}
					element={
						<BasicLayout>
							<MyMessages />
						</BasicLayout>
					}
				/>

				<Route
					path={JOINT_PROJECTS}
					element={
						<BasicLayout>
							<JointProjectsPage />
						</BasicLayout>
					}
				/>

				<Route path="*" element={<Navigate to={MY_PROFILE} />} />
			</Routes>
		)
	) : (
		<Routes>
			<Route path={SIGN_IN} element={<SignIn />} />
			<Route path={SIGN_UP} element={<SignUp />} />
			<Route path="*" element={<Navigate to={SIGN_IN} />} />
		</Routes>
	);
});

export default AppRouter;
