import Label from '../../common/Label';
import Button from '../../common/Button';
import { Logo } from '../login/Logo.jsx';
import '../../styles/login.scss';
//  useState
import { useRef } from 'react';
import { ListOfProp } from '../listOfProperties/props/ListOfProp';

export const Login = () => {
	// const [loggedIn, setLoggedIn] = useState(false);
	const email = useRef();
	const password = useRef();
	const getEmail = localStorage.getItem('EmailData');
	const getPassword = localStorage.getItem('PasswordData');

	const handleSubmit = () => {
		if (
			email.current.value.includes('@gmail.com') &&
			password.current.value.length >= 8
		) {
			localStorage.setItem('EmailData', email.current.value);
			localStorage.setItem('PasswordData', password.current.value);
		}
	};

	// const loginLogIn = () => {
	// 	setLoggedIn(true);
	// };

	return (
		<>
			{getEmail && getPassword ? (
				<ListOfProp />
			) : (
				<>
					<Logo />
					<div className="login-window">
						<div className="h1-login-text">
							<h1 className="h1-sign-in">Sign In</h1>
						</div>
						<div className="registration-window">
							<form
								className="login-form"
								onSubmit={handleSubmit}>
								<div>
									<Label className="email-text">Email</Label>
									<input
										className="email-input"
										type="email"
										placeholder="email@example.com"
										ref={email}></input>
								</div>
								<div>
									<Label className="password-text">Password</Label>
									<input
										className="password-input"
										type="password"
										placeholder="Password"
										ref={password}></input>
								</div>
								<div className="button-sign-in-register">
									<Button className={'login-btn-sign-in'}>
										<Label className={'btn-label-sign-in'}>Sign In</Label>
									</Button>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};
