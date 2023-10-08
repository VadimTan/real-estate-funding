import Button from '../../common/Button';
import '../../../styles/footer.scss';

export const Footer = ({ onSubmit }) => {
	return (
		<div className="footer-container">
			<Button
				type="submit"
				className="footer-button"
				clickHandler={onSubmit}>
				<span className="text-for-button">Save Changes</span>
			</Button>
		</div>
	);
};
