import { useNavigate } from 'react-router-dom';
import Button from '../../../common/Button';
import Label from '../../../common/Label';
import Layout from '../../../common/Layout';
import '../../../../styles/listofprops.scss';
import Properties from './Property/Properties';
import { useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../../constants/config';

export const FilterOfProperties = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/add', { replace: true });
	};

	useEffect(() => {
		const getAllProperties = async () => {
			try {
				const response = await axios.get(`${baseUrl}/admin/property/getAll`);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		getAllProperties();
	}, []);

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
				<div className="global-fee-exchange">
					<div className="fee-exchange-container">
						<div className="dld-container">
							<Label className="dld-fee-label">DLD Fee</Label>
							<div>
								<input
									className="dld-fee-input"
									type="text"
								/>
								<span className="dld-icon">%</span>
							</div>
						</div>
						<div className="exchange-container">
							<Label className="exchange-label">Exchange Rate</Label>
							<input
								className="exchange-input"
								type="text"
							/>
							<span className="exchange-icon">= 1 USD</span>
						</div>
						<Button className="fee-exchange-button">
							<span className="text-fee-button">Save Changes</span>
						</Button>
					</div>
				</div>
				<Properties />
			</Layout>
		</>
	);
};
