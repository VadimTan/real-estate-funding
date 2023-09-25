import DubX from '../../assets/logo-assets/DubXLogo.png';
import Dub from '../../assets/logo-assets/Dub.png';
import X from '../../assets/logo-assets/Xmark.png';
import Intersect from '../../assets/logo-assets/Intersect.png';
import Vector from '../../assets/logo-assets/Vector.png';
import Vector1 from '../../assets/logo-assets/Vector1.png';
import Vector2 from '../../assets/logo-assets/Vector2.png';
import Vector3 from '../../assets/logo-assets/Vector3.png';
import '../login/logo.css';

export const Logo = () => {
	return (
		<div className="container-logo">
			<img
				src={DubX}
				className="logo-dubX"
			/>
			<img
				src={Dub}
				className="logo-dub"
			/>
			<img
				src={X}
				className="logo-x-mark"
			/>
			<img
				src={Vector}
				className="logo-vector"
			/>
			<img
				src={Vector1}
				className="logo-vector-1"
			/>
			<img
				src={Intersect}
				className="logo-intersect"
			/>
			<img
				src={Vector2}
				className="logo-vector-2"
			/>
			<img
				src={Vector3}
				className="logo-vector-3"
			/>
		</div>
	);
};
