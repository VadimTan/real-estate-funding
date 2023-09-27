import MainImage from '../../../../assets/logo-assets/MainImage.svg';
import Button from '../../../reusable/button';
import Label from '../../../reusable/label';
import '../property/propertycard.css';

export const PropertyCard = () => {
	const arrayOfProperties = [
		{
			name: '1 Bed in Old Town DownTown Dubai',
			totalPrice: '$4,304 • AED 48,000',
			price: '$2,101 • AED 24,500',
			sold: '—',
			type: 'New',
			growth: '9,98%',
			period: '12 Months',
		},
		{
			name: '1 Bed in Old Town DownTown Dubai',
			totalPrice: '$4,304 • AED 48,000',
			price: '$2,101 • AED 24,500',
			sold: '—',
			type: 'New',
			growth: '9,98%',
			period: '12 Months',
		},
		{
			name: '1 Bed in Old Town DownTown Dubai',
			totalPrice: '$4,304 • AED 48,000',
			price: '$2,101 • AED 24,500',
			sold: '—',
			type: 'New',
			growth: '9,98%',
			period: '12 Months',
		},
	];

	return (
		<div className="property-card-container">
			{arrayOfProperties.map((property, id) => (
				<div key={id + 1}>
					<div className="main-image-for-property">
						<img
							className="image-for-property"
							src={MainImage}
							alt=""
						/>
					</div>
					<div className="container-property-card-list">
						<ul className="list-for-property">
							<li className="list-property-1">
								<span className="metric-name">Name</span>
								<span className="value-of-property">{property.name}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Total Price</span>
								<span className="value-of-property">{property.totalPrice}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Price</span>
								<span className="value-of-property">{property.price}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Sold</span>
								<span className="value-of-property">{property.sold}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Type</span>
								<span className="value-of-property">{property.type}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Growth</span>
								<span className="value-of-property">{property.growth}</span>
							</li>
							<li className="list-property-1">
								<span className="metric-name">Period</span>
								<span className="value-of-property">{property.period}</span>
							</li>
						</ul>
					</div>
					<div className="btn-container-for-property">
						<Button className={'btn-for-property'}>
							<Label className={'label-for-property'}>
								View Details Of Property
							</Label>
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default PropertyCard;
