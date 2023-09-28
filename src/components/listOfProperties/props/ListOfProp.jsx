import Button from '../../../common/Button';
import Label from '../../../common/Label';
import '../../../styles/listofprops.scss';
import { NavMenu } from '../navigation/NavMenu';
import PropertyCard from './property/PropertyCard';

export const ListOfProp = () => {
	return (
		<>
			<NavMenu />

			<div className="frame-18">
				<h1 className="h1-list-of-props">List Of Properties</h1>
				<div className="button-container-list-of-props">
					<Button className={'btn-list-of-props'}>
						<Label className={'label-for-btn-list-of-props'}>Add New</Label>
					</Button>
				</div>
			</div>

			<PropertyCard />
		</>
	);
};
