import Label from '../../common/Label';
import Button from '../../common/Button';
import { Logo } from './Logo.jsx';
import '../../../styles/login.scss';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = () => {
		// if (email && password) {
		// 	localStorage.setItem('EmailData', email);
		// 	localStorage.setItem('PasswordData', password);
		// }
		navigate('/list-of-props', { replace: true });
	};

	return (
		<>
			<Logo />
			<div className="login-window">
				<div className="h1-login-text">
					<h1 className="h1-sign-in">Sign In</h1>
				</div>
				<div className="registration-window">
					<div
						className="login-form"
						onSubmit={handleSubmit}>
						<div>
							<Label className="email-text">Email</Label>
							<input
								className="email-input"
								type="text"
								placeholder="email@example.com"
							/>
						</div>
						<div>
							<Label className="password-text">Password</Label>
							<input
								className="password-input"
								type="password"
								placeholder="Password"
							/>
						</div>
						<form
							className="button-sign-in-register"
							onSubmit={handleSubmit}>
							<Button
								className={'login-btn-sign-in'}
								type="submit">
								<a className={'btn-label-sign-in'}>Sign In</a>
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
