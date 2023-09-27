import '../list-of-properties/listofprops.css';
import { NavMenu } from '../list-of-properties/NavMenu';
import Button from '../reusable/button';
import Label from '../reusable/label';

export const ListOfProp = () => {
	return (
		<>
			<NavMenu />
			<div className="container-list-of-props">
				<div className="frame-18">
					<h1 className="h1-list-of-props">List Of Properties</h1>
					<div className="button-container-list-of-props">
						<Button className={'btn-list-of-props'}>
							<Label className={'label-for-btn-list-of-props'}>Add New</Label>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
