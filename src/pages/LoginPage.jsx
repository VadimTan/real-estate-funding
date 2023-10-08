import Label from '../common/Label';
import Button from '../common/Button';
import { Logo } from '../components/Logo/Logo';
import { useEffect } from 'react';
import '../../styles/login.scss';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = () => {
	const { loading, error, isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [cred, setCred] = useState({
	// 	email: '',
	// 	password: '',
	// });

	const navigate = useNavigate();

	// redirect authenticated user to profile screen
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	}, [navigate, isLoggedIn]);

	const handleSubmit = () => {
		dispatch(userLogin({ email: 'cred.email', password: 'cred.password' }));
	};

	// const handleChange = (event) => {
	// 	console.log(event.target);
	// };
	return (
		<>
			<Logo />
			<div className="login-window">
				<div className="h1-login-text">
					<h1 className="h1-sign-in">Sign In</h1>
				</div>
				<div className="registration-window">
					{error && <>{error}</>}{' '}
					{/* <>{error}</> - this should a component <Error /> separate file for that */}
					<div
						className="login-form"
						onSubmit={handleSubmit}>
						<div>
							<Label className="email-text">Email</Label>
							<input
								className="email-input"
								type="text"
								required
								placeholder="email@example.com"
							/>
						</div>
						<div>
							<Label className="password-text">Password</Label>
							<input
								className="password-input"
								type="password"
								required
								placeholder="Password"
							/>
						</div>
						<div className="button-sign-in-register">
							<Button
								className="login-btn-sign-in"
								type="submit"
								disabled={loading}
								clickHandler={handleSubmit}>
								{loading ? (
									<CircularProgress />
								) : (
									<span className="btn-label-sign-in">Sign In</span>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
