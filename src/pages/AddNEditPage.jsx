import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/addNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/addNEdit/Photos';
import { Footer } from '../components/listOfProperties/Footer/Footer';
import { useState } from 'react';
import Button from '../common/Button';

export const AddNEditPage = () => {
	const [formState, setFormState] = useState({
		total_price: 0,
		price: 0,
		developer_specs_title: '',
		coordinate_x: '',
		// additional_charges: 0,
		// period: '',
		handover: '' | 0,
		// name: '',
		// location => required|string,
		// coordinate_x => required|string,
		// coordinate_y => required|string,
		// seller => required|string,
		// developer => required|string,
		// developer_specs_title => required|string,
		// developer_specs_subtitle => required|string,
		// type => required|string,
		// bed => required|numeric,
		// meter => required|numeric,
		// about => required|string,
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
		console.log('value: value');

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
				/>
				<AboutProperty
					formState={formState}
					handleChange={handleChange}
				/>
				<PhotosBox
					formState={formState}
					handleChange={handleChange}
				/>
			</div>
			<Button
				type="submit"
				clickHandler={onSubmit}>
				Save form
			</Button>
			<Footer />
		</Layout>
	);
};
