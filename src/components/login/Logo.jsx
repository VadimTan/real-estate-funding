import DubX from '../../assets/logo-assets/DubX.svg';
import '../login/logo.css';

export const Logo = () => {
	return (
		<div className="container-logo">
			<img
				src={DubX}
				className="logo-dubX"
			/>
		</div>
	);
};
