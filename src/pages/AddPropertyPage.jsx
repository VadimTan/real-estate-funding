import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/AddNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/addNEdit/Photos';
import { Footer } from '../components/Footer/Footer';
import { useState } from 'react';
import axios from '../axios.config';
import baseUrl from '../constants/config';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

export const AddPropertyPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const [formState, setFormState] = useState({
		total_price: '',
		price: '',
		annual_profit: '',
		sell_price: '',
		app_fee: '',
		additional_charges: '',
		period: '',
		handover: '',
		name: '',
		location: '',
		coordinate_x: '',
		coordinate_y: '',
		seller: '',
		developer: '',
		developer_specs_title: '',
		developer_specs_subtitle: '',
		type: '',
		bed: '',
		meter: '',
		about: '',
		photos: [],
		documents: [],
	});

	const saveProperty = async (formData) => {
		return await axios.post(`${baseUrl}/admin/property/add`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	};

	const onSubmit = async () => {
		const formData = new FormData();
		console.log(formState);
		for (const key in formState) {
			// if (formState[key]) {
			const value = formState[key];
			// console.log(`Appending ${key} with value:`, value);
			// Check if the value is an array (e.g., for images)
			if (Array.isArray(value)) {
				console.log(value);
				value.forEach((item, index) => {
					// console.log(`Appending ${key}[${index}] with item:`, item);
					formData.append(`${key}[${index}]`, item);
					console.log(key);
				});
			} else {
				formData.append(key, value);
				// }
			}
		}
		try {
			const response = await saveProperty(formData);
			if (response.data.responseCode.responseCode !== 1) {
				setErrorMessage('Failed!');
			} else {
				navigate('/');
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleImage = (e) => {
		setFormState({ ...formState, photos: e.target.files });
	};

	const handleChange = (event) => {
		const value = event.target.value;

		setFormState({
			...formState,
			[event.target.name]: value,
		});
	};

	return (
		<Layout>
			<AddNEdit />
			<div className="global-container-add-edit">
				{errorMessage && (
					<Snackbar
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						severity="error"
						open={true}
						autoHideDuration={3000}>
						<Alert severity="error">{errorMessage}</Alert>
					</Snackbar>
				)}{' '}
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
					handleImage={handleImage}
				/>
			</div>
			<Footer onSubmit={onSubmit} />
		</Layout>
	);
};
