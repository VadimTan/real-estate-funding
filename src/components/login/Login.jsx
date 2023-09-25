import { Button } from '../reusable/button.jsx';
import { Label } from '../reusable/label.jsx';
import '../login/login.css';

export const Login = () => {
	return (
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
	);
};
