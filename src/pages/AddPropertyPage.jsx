import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/AddNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/AddNEdit/Photos';
import { Footer } from '../components/Footer/Footer';
import { useEffect, useRef, useState } from 'react';
import axios from '../axios.config';
import baseUrl from '../constants/config';
import { Snackbar, Alert } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../common/Loader';
import { hostUrl } from '../constants/constants';

export const AddPropertyPage = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [photos, setPhotos] = useState([]);
	const [photosPreview, setPhotosPreview] = useState([]);
	const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState([]);
	const inputRef = useRef(null);
	const [documents, setDocuments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const isAddMode = location.pathname === '/add';
	const params = useParams();

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

	const updateProperty = async (formData) => {
		return await axios.post(
			`${baseUrl}/admin/property/update/?id=${params.id}`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			}
		);
	};

	useEffect(() => {
		if (!isAddMode) {
			setIsLoading(true);
			const getOneProperty = async () => {
				try {
					const response = await axios.get(
						`${baseUrl}/admin/property/getOne?id=${params.id}`
					);
					const convertedImg = response.data.data.images.map((img) => {
						return `${hostUrl}${img.path}`;
					});
					setPhotosPreview(convertedImg);
					setPhotos(convertedImg);
					setFormState(response.data.data && { ...response.data.data });
					setIsLoading(false);
				} catch (error) {
					setIsLoading(false);
					console.log(error);
				}
			};
			getOneProperty();
		}
	}, [isAddMode, params.id]);

	const onUpdate = async () => {
		setIsLoading(true);
		try {
			const response = await updateProperty({ ...formState, images: photos });
			setIsLoading(false);
			console.log(response);
			if (
				response.data.responseCode.responseCode === '1' ||
				response.data.responseCode.responseCode === '11'
			) {
				navigate('/');
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
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
		const filteredPhotos = [...photosPreview];
		filteredPhotos.splice(id, 1);
		setPhotos(filteredPhotos);
		setPhotosPreview(filteredPhotos);
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
			<Footer
				isAddMode={isAddMode}
				onSubmit={onSubmit}
				onUpdate={onUpdate}
			/>
		</Layout>
	);
};
