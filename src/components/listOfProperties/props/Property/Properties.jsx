import Button from '../../../../common/Button';
import Label from '../../../../common/Label';
// import tag_blue from '../../../../assets/images/tag_blue.svg';
// import tag_green from '../../../../assets/images/tag_green.svg';
import '../../../../../styles/propertycard.scss';

export const Properties = ({ properties }) => {
	return (
		<div className="main-container-of-cards">
			<div className="property-card-container">
				{properties.length > 0 ? (
					properties.map((property, id = 0) => (
						<div
							key={id + 1}
							className="grid-element">
							<div className="main-image-for-property">
								<img
									className="image-for-property"
									src={property.images[0] || null}
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
								<Button className={'btn-for-property'}>
									<Label className={'label-for-property'}>
										View Details Of Property
									</Label>
								</Button>
							</div>
							{/* <div className="tag-row">
							<div className="row-completed">
								<img
									src={tag_blue}
									alt=""
								/>
								<span className="completed-text-row">Completed</span>
							</div>
							<div className="row-sold">
								<img
									src={tag_green}
									alt=""
								/>
								<span className="sold-text-row">Sold</span>
							</div>
						</div> */}
						</div>
					))
				) : (
					<div>Not Found</div>
				)}
			</div>
		</div>
	);
};

export default Properties;
