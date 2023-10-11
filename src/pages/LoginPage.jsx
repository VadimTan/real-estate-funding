import Label from '../common/Label';
import Button from '../common/Button';
import { Logo } from '../components/Logo/Logo';
import { useEffect, useState } from 'react';
import '../../styles/login.scss';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';

const LoginPage = () => {
	const { loading, error, isLoggedIn, userInfo } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [cred, setCred] = useState({
		email: '',
		password: '',
	});

	// const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	// redirect authenticated user to profile screen
	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
		console.log(userInfo);
	}, [navigate, isLoggedIn]);

	const handleSubmit = () => {
		dispatch(
			userLogin({
				// email: 'admin@example.com',
				// password: 'dubairealestate2023!',
				email: cred.email,
				password: cred.password,
			})
		);
	};

	// const handleClose = (event, reason) => {
	// 	if (reason === 'clickaway') {
	// 		return;
	// 	}

	// 	setOpen(false);
	// };
	const handleChange = (event) => {
		setCred({ ...cred, [event.target.name]: event.target.value });
		console.log({ ...cred });
	};
	return (
		<>
			<Logo />
			<div className="login-container">
				<div className="login-window">
					<div className="h1-login-text">
						<h1 className="h1-sign-in">Sign In</h1>
					</div>
					<div className="registration-window">
						{error && (
							<Snackbar
								anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
								severity="error"
								open={true}
								autoHideDuration={3000}>
								<Alert severity="error">{Object.values(error)}</Alert>
							</Snackbar>
						)}{' '}
						{/* <>{error}</> - this should a component <Error /> separate file for that */}
						<div
							className="login-form"
							onSubmit={handleSubmit}>
							<div>
								<Label className="email-text">Email</Label>
								<input
									className="email-input"
									type="text"
									name="email"
									required
									placeholder="email@example.com"
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label className="password-text">Password</Label>
								<input
									className="password-input"
									type="password"
									name="password"
									required
									placeholder="Password"
									onChange={handleChange}
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
			</div>
		</>
	);
};

export default LoginPage;
