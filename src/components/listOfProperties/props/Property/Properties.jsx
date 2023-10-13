import Button from '../../../../common/Button';
import Label from '../../../../common/Label';
import tag_blue from '../../../../assets/images/tag_blue.svg';
import tag_green from '../../../../assets/images/tag_green.svg';
import '../../../../../styles/propertycard.scss';
import { useSelector } from 'react-redux';
import { Loader } from '../../../../common/Loader';
import { useNavigate } from 'react-router-dom';
import { hostUrl } from '../../../../constants/constants';

export const Properties = () => {
	const nav = useNavigate();
	const { filteredProperties, isLoading } = useSelector(
		(state) => state.search
	);

	const handleNavigate = (id) => {
		nav(`/edit/${id}`);
	};

	return (
		<div className="main-container-of-cards">
			<div className="property-card-container">
				{isLoading ? <Loader /> : null}
				{filteredProperties.length > 0 &&
					filteredProperties.map((property, index) => (
						<div
							key={index + 1}
							className="grid-element">
							<div className="main-image-for-property">
								{property.images.length ? (
									// <img
									// 	className="image-for-property"
									// 	src={
									// 		`https://afehe-hwf.buzz/storage/${property.images[0].path}` ||
									// 		null
									// 	}
									// 	alt=""
									// />
									<div
										className="image-for-property"
										style={{
											backgroundImage: `url(${hostUrl}${property.images[0].path})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'cover',
											height: '208px',
										}}
									/>
								) : (
									<div className="image-for-property">No image</div>
								)}
							</div>
							<div className="container-property-card-list">
								<ul className="list-for-property">
									<li className="list-property-1">
										<span className="metric-name">Name</span>
										<span className="value-of-property">{property.name}</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Total Price</span>
										<span className="value-of-property">
											{property.total_price || '-'}
										</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Price</span>
										<span className="value-of-property">
											{property.price || '-'}
										</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Sold</span>
										<span className="value-of-property">
											{property.sold || '-'}
										</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Type</span>
										<span className="value-of-property">
											{property.type || '-'}
										</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Growth</span>
										<span className="value-of-property">
											{property.annual_profit + '%' || '-'}
										</span>
									</li>
									<li className="list-property-1">
										<span className="metric-name">Period</span>
										<span className="value-of-property">
											{property.period || '-'}
										</span>
									</li>
								</ul>
							</div>
							<div className="btn-container-for-property">
								<Button
									className={'btn-for-property'}
									clickHandler={() => handleNavigate(property.id)}>
									<Label className={'label-for-property'}>
										View Details Of Property
									</Label>
								</Button>
							</div>
							<div className="tag-row">
								<div className="row-completed">
									<img
										className="tag"
										src={tag_blue}
										alt=""
									/>
									<span className="completed-text-row">Completed</span>
								</div>
								<div className="row-sold">
									<img
										className="tag"
										src={tag_green}
										alt=""
									/>
									<span className="sold-text-row">Sold</span>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Properties;
