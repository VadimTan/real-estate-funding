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
import { convertBase64 } from '../constants/constants';

export const AddPropertyPage = () => {
	const [filesPreview, setFilesPreview] = useState({
		images: [],
		photos: [],
		docs: [],
		documents: [],
	});
	const [errorMessage, setErrorMessage] = useState('');
	const inputRef = useRef(null);
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
		images: [],
		photos: [],
		docs: [],
		documents: [],
		sold: 0,
		completed: 0,
	});

	const saveProperty = async (formState) => {
		console.log(formState.photos);

		return await axios.post(`${baseUrl}/admin/property/add`, formState, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	};

	const updateProperty = async (formState) => {
		const dataToSend = {
			...formState,
			images: JSON.stringify(formState.images),
			docs: JSON.stringify(formState.docs),
		};
		console.log(dataToSend);
		return await axios.post(
			`${baseUrl}/admin/property/update/?id=${params.id}`,
			dataToSend,
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
					const docs = response.data.data.docs.map((doc) => ({
						...doc,
						checked: !!doc.main_document,
					}));
					const images = response.data.data.images.map((image) => ({
						...image,
						checked: !!image.main_image,
					}));
					setFilesPreview({ images, photos: [], docs, documents: [] });
					setFormState(
						response.data.data && {
							...response.data.data,
							photos: [],
							documents: [],
						}
					);
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
			const response = await updateProperty({ ...formState });
			setIsLoading(false);
			if (
				response.data.responseCode.responseCode === '1' ||
				response.data.responseCode.responseCode === '11'
			) {
				navigate('/');
			} else {
				setErrorMessage(
					// 'It seems like you missed a few fields. Make sure to fill them all.'
					'Woops, something went wrong!'
				);
			}
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.message);
		}
	};

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const response = await saveProperty(formState);
			if (
				response.data.responseCode.responseCode === '1' ||
				response.data.responseCode.responseCode === '11'
			) {
				navigate('/');
			} else {
				setErrorMessage(
					'It seems like you missed a few fields. Make sure to fill them all.'
				);
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.message);
		}
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);

		if (file.type.includes('image')) {
			setFilesPreview({
				...filesPreview,
				photos: [...filesPreview.photos, base64],
			});
			setFormState({ ...formState, photos: [...formState.photos, file] });
		} else {
			setFilesPreview({
				...filesPreview,
				documents: [...filesPreview.documents, file],
			});
			setFormState({ ...formState, documents: [...formState.documents, file] });
		}
	};

	const handleCheckboxChange = (index, key) => {
		const clonedFiles = [...formState[key]];

		if (key === 'images') {
			// Handle the 'images' case
			clonedFiles[index].main_image =
				clonedFiles[index].main_image === 0 ? 1 : 0;
			setFormState({ ...formState, images: clonedFiles });
			setFilesPreview({ ...filesPreview, [key]: clonedFiles });
		} else if (key === 'photos') {
			// Handle the 'photos' case
			const moved = clonedFiles.splice(index, 1);
			clonedFiles.unshift(moved[0]);
			setFormState({ ...formState, photos: clonedFiles });
		} else if (key === 'docs') {
			// Handle the 'docs' case
			clonedFiles[index].main_document =
				clonedFiles[index].main_document === 0 ? 1 : 0;
			setFormState({ ...formState, docs: clonedFiles });
			setFilesPreview({ ...filesPreview, [key]: clonedFiles });
		} else if (key === 'documents') {
			// Handle the 'documents' case
			const moved = clonedFiles.splice(index, 1);
			clonedFiles.unshift(moved[0]);
			setFormState({ ...formState, documents: clonedFiles });
		}
	};

	const handleDeleteImg = (index, key) => {
		// key = photos | images | docs | documents

		if (key === 'images') {
			// Handle the 'images' case
			const filteredImages = formState[key].filter((_, i) => i !== index);
			const filteredImagesPreview = filesPreview[key].filter(
				(_, i) => i !== index
			);
			setFormState({ ...formState, [key]: filteredImages });
			setFilesPreview({ ...filesPreview, [key]: filteredImagesPreview });
		} else if (key === 'photos') {
			const filteredPhotos = formState[key].filter((_, i) => i !== index);
			const filteredPhotosPreview = filesPreview[key].filter(
				(_, i) => i !== index
			);
			setFormState({ ...formState, [key]: filteredPhotos });
			setFilesPreview({ ...filesPreview, [key]: filteredPhotosPreview });
		} else if (key === 'docs') {
			// Handle the 'docs' case
			const filteredDocs = formState[key].filter((_, i) => i !== index);
			const filteredDocsPreview = filesPreview[key].filter(
				(_, i) => i !== index
			);
			setFormState({ ...formState, [key]: filteredDocs });
			setFilesPreview({ ...filesPreview, [key]: filteredDocsPreview });
		} else if (key === 'documents') {
			const filteredDocuments = formState[key].filter((_, i) => i !== index);
			const filteredDocumentsPreview = filesPreview[key].filter(
				(_, i) => i !== index
			);
			setFormState({ ...formState, [key]: filteredDocuments });
			setFilesPreview({ ...filesPreview, [key]: filteredDocumentsPreview });
		}

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
			<AddNEdit
				formState={formState}
				setFormState={setFormState}
			/>
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
					onUpdate={onUpdate}
					isAddMode={isAddMode}
				/>
				<AboutProperty
					formState={formState}
					handleChange={handleChange}
					onSubmit={onSubmit}
					onUpdate={onUpdate}
					isAddMode={isAddMode}
				/>
				<PhotosBox
					onSubmit={onSubmit}
					handleImage={handleImage}
					handleDelete={handleDeleteImg}
					// selectedPhotos={selectedPhotoIndexes}
					handleCheckboxChange={handleCheckboxChange}
					inputRef={inputRef}
					// photosPreview={photosPreview}
					// imagesPreview={imagesPreview}
					// documentsPreview={documentsPreview}
					onUpdate={onUpdate}
					isAddMode={isAddMode}
					filesPreview={filesPreview}
					// checkedFiles={checkedFiles}
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
