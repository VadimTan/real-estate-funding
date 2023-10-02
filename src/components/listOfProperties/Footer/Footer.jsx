import Button from '../../../common/Button';
import '../../../../styles/footer.scss';

export const Footer = () => {
	return (
		<div className="footer-container">
			<Button className="footer-button">
				<span className="text-for-button">Save Changes</span>
			</Button>
		</div>
	);
};
