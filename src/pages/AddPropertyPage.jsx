import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/AddNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/addNEdit/Photos';
import { Footer } from '../components/Footer/Footer';
import { useState } from 'react';

export const AddPropertyPage = () => {
	const test = useSelector((state) => state.auth);

	console.log('store : ', test);

	const [formState, setFormState] = useState({
		total_price: 0,
		price: 0,
		annual_profit: 0,
		sell_price: 0,
		app_fee: 0,
		additional_charges: 0,
		period: '' | 0,
		handover: '' | 0,
		name: '',
		location: '',
		coordinate_x: '',
		coordinate_y: '',
		seller: '',
		developer: '',
		developer_specs_title: '',
		developer_specs_subtitle: '',
		type: '',
		bed: 0,
		meter: 0,
		about: '',
		photos: [],
		documents: [],
	});

	const onSubmit = async () => {
		console.log(formState);
		try {
			// await saveRealEstate(formState)
		} catch (error) {
			console.log(error);
			alert('failed to submit the form');
		}
	};

	const handleChange = (event) => {
		const value = event.target.value;
		console.log(`value: `, value);

		setFormState({
			...formState,
			[event.target.name]: value,
		});
	};

	return (
		<Layout>
			<AddNEdit />
			<div className="global-container-add-edit">
				<MainMetrics
					formState={formState}
					handleChange={handleChange}
					onSubmit={onSubmit}
				/>
				<AboutProperty
					formState={formState}
					handleChange={handleChange}
					onSubmit={onSubmit}
				/>
				<PhotosBox
					formState={formState}
					handleChange={handleChange}
					onSubmit={onSubmit}
				/>
			</div>
			<Footer onSubmit={onSubmit} />
		</Layout>
	);
};
