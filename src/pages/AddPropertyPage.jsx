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
	const [photos, setPhotos] = useState([]);
	const documents = [];
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
		seller: 'anton',
		developer: '',
		developer_specs_title: '',
		developer_specs_subtitle: '',
		type: '5',
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
		console.log(formState);
		const formData = new FormData();
		for (const key in formState) {
			const value = formState[key];
			if (Array.isArray(value)) {
				if (key === 'photos') {
					if (photos.length) {
						photos.forEach((photo, index) => {
							formData.append(`${key}[${index}]`, photo);
						});
					} else {
						formData.append(`photos`, photos);
					}
				}
				if (key === 'documents') {
					if (documents.length) {
						documents.forEach((document, index) => {
							formData.append(`${key}[${index}]`, document);
						});
					} else {
						formData.append(`documents`, documents);
					}
				}
			} else {
				formData.append(key, value);
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
		setPhotos([...photos, URL.createObjectURL(e.target.files[0])]);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		const updatedValue =
			name === 'total_price' ||
			name === 'price' ||
			name === 'annual_profit' ||
			name === 'sell_price' ||
			name === 'app_fee' ||
			name === 'additional_charges' ||
			name === 'period' ||
			name === 'handover' ||
			name === 'bed' ||
			name === 'meter'
				? parseFloat(value)
				: value;
		setFormState({
			...formState,
			[name]: updatedValue,
		});
	};

	// 'total_price' => 'required|numeric',
	// 'price' => 'required|numeric',
	// 'annual_profit' => 'string|numeric',
	// 'sell_price' => 'required|numeric',
	// 'app_fee' => 'required|numeric',
	// 'additional_charges' => 'required|numeric',
	// 'period' => 'string|numeric',
	// 'handover' => 'string|numeric',
	// 'name' => 'required|string',
	// 'location' => 'required|string',
	// 'coordinate_x' => 'required|string',
	// 'coordinate_y' => 'required|string',
	// 'seller' => 'required|string',
	// 'developer' => 'required|string',
	// 'developer_specs_title' => 'required|string',
	// 'developer_specs_subtitle' => 'required|string',
	// 'type' => 'required|string',
	// 'bed' => 'required|numeric',
	// 'meter' => 'required|numeric',
	// 'about' => 'required|string',
	// ‘photos’ массив из картинок
	// ‘documents’  массив из документов

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
					images={photos}
				/>
			</div>
			<Footer onSubmit={onSubmit} />
		</Layout>
	);
};
