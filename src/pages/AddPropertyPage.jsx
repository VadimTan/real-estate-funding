import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/AddNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/AddNEdit/Photos';
import { Footer } from '../components/Footer/Footer';
import { useRef, useState } from 'react';
import axios from '../axios.config';
import baseUrl from '../constants/config';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../common/Loader';

export const AddPropertyPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [photos, setPhotos] = useState([]);
	const [photosPreview, setPhotosPreview] = useState([]);
	const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState([]);
	const inputRef = useRef(null);
	const [documents, setDocuments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [formState, setFormState] = useState({
		total_price: '1000000',
		price: '500000',
		annual_profit: '10,20',
		sell_price: '600000',
		app_fee: '2',
		additional_charges: '1000',
		period: '2,5',
		handover: '3,7',
		name: 'Sample Property',
		location: 'Sample Location',
		coordinate_x: '123.456',
		coordinate_y: '78.910',
		seller: '',
		developer: 'Sample Developer',
		developer_specs_title: 'Sample Title',
		developer_specs_subtitle: 'Sample Subtitle',
		type: 'Apartment',
		bed: '2',
		meter: '120',
		about: 'This is sample property description',
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
		for (const key in formState) {
			const value = formState[key];
			if (Array.isArray(value)) {
				if (key === 'photos') {
					if (photos.length) {
						photos.forEach((photo, index) =>
							formData.append(`${key}[${index}]`, photo)
						);
					}
				}
				if (key === 'documents') {
					if (documents.length) {
						documents.forEach((doc, index) =>
							formData.append(`${key}[${index}]`, doc)
						);
					}
				}
			} else {
				formData.append(key, value);
			}
		}
		try {
			setIsLoading(true);
			const response = await saveProperty(formData);
			if (
				response.data.responseCode.responseCode === '1' ||
				response.data.responseCode.responseCode === '11'
			) {
				navigate('/');
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.message);
		}
	};

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		if (
			file.type.includes('application/') ||
			file.type.includes('text/plain')
		) {
			setDocuments((prevDocs) => [...prevDocs, file]);
		} else {
			setPhotos((prevPhotos) => [...prevPhotos, file]);
		}
		setPhotosPreview((prevPhotos) => [...prevPhotos, base64]);
	};

	const handleCheckboxChange = (index) => {
		if (selectedPhotoIndexes.includes(index)) {
			// Uncheck the image and remove it from selectedPhotos
			setSelectedPhotoIndexes((prevSelected) =>
				prevSelected.filter((item) => item !== index)
			);
		} else {
			// Check the image and move it to the start of the photos array
			setSelectedPhotoIndexes((prevSelected) => [index, ...prevSelected]);
		}
		const orderedPhotos = [...photos];
		const removed = orderedPhotos.splice(index, 1);
		orderedPhotos.unshift(removed[0]);
		setPhotos(orderedPhotos);
	};

	const handleDeleteImg = (id) => {
		const filteredPhotos = [...photos];
		filteredPhotos.splice(id, 1);
		setPhotos(filteredPhotos);
		inputRef.current.value = '';
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
			{isLoading ? <Loader /> : null}
			<AddNEdit formState={formState} />
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
					handleDelete={handleDeleteImg}
					selectedPhotos={selectedPhotoIndexes}
					handleCheckboxChange={handleCheckboxChange}
					inputRef={inputRef}
					photosPreview={photosPreview}
				/>
			</div>
			<Footer onSubmit={onSubmit} />
		</Layout>
	);
};
