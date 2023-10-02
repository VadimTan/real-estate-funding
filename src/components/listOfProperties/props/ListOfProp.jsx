import { useNavigate } from 'react-router-dom';
import Button from '../../../common/Button';
import Label from '../../../common/Label';
import Layout from '../../../common/Layout';
import '../../../../styles/listofprops.scss';
import PropertyCard from './Property/PropertyCard';

export const ListOfProp = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/add', { replace: true });
	};

	return (
		<>
			<Layout>
				<div className="frame-18">
					<h1 className="h1-list-of-props">List Of Properties</h1>
					<div className="button-container-list-of-props">
						<Button
							className={'btn-list-of-props'}
							clickHandler={handleClick}>
							<Label className={'label-for-btn-list-of-props'}>Add New</Label>
						</Button>
					</div>
				</div>
				<PropertyCard />
			</Layout>
		</>
	);
};
