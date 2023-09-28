import DubX from '../../assets/images/DubX.svg';
import '../../styles/logo.scss';

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
