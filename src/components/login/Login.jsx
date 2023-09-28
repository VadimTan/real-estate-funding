import Label from '../../common/Label';
import Button from '../../common/Button';
import { Logo } from '../login/Logo.jsx';
import '../../styles/login.scss';

export const Login = () => {
	return (
		<>
			<Logo />
			<div className="login-window">
				<div className="h1-login-text">
					<h1 className="h1-sign-in">Sign In</h1>
				</div>
				<div className="registration-window">
					<form className="login-form">
						<div>
							<Label className="email-text">Email</Label>
							<input
								className="email-input"
								type="email"
								placeholder="email@example.com"></input>
						</div>
						<div>
							<Label className="password-text">Password</Label>
							<input
								className="password-input"
								type="password"
								placeholder="Password"></input>
						</div>
					</form>
				</div>
				<Button className={'login-btn-sign-in'}>
					<Label className={'btn-label-sign-in'}>Sign In</Label>
				</Button>
			</div>
		</>
	);
};
