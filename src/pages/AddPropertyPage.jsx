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
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [uploadedDocuments, setUploadedDocuments] = useState([]);
	const [photosPreview, setPhotosPreview] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [documentsPreview, setDocumentsPreview] = useState([]);
	// const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState([]);
	const [checkedFiles, setCheckedFiles] = useState([]);
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
		documents: [],
		sold: 0,
		completed: 0,
	});

	const saveProperty = async (formState) => {
		return await axios.post(`${baseUrl}/admin/property/add`, formState, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	};

	const updateProperty = async (formState) => {
		const dataToSend = {
			...formState,
			images: JSON.stringify(formState.images),
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
					const convertedImg = response.data.data.images.map((img) => {
						return `${hostUrl}${img.path}`;
					});
					setImagesPreview(convertedImg);
					// setImages(convertedImg);
					setCheckedFiles(
						response.data.data.images.map((file) => {
							return !!file.main_image;
						})
					);
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
		//TODO: need to support documents

		if (file.type.includes('image')) {
			setUploadedFiles([...uploadedFiles, file]);
			setFormState({ ...formState, photos: [...uploadedFiles, file] });
			setPhotosPreview(() => [...photosPreview, base64]);
		} else {
			setUploadedDocuments([...uploadedDocuments, file]);
			setFormState({ ...formState, documents: [...uploadedDocuments, file] });
			setDocumentsPreview(() => [...documentsPreview, file]);
		}
	};

	const handleCheckboxChange = (index, preview) => {
		const flattenedArray = [
			imagesPreview,
			photosPreview,
			documentsPreview,
		].flat();
		const selectedItem = flattenedArray[index];

		if (typeof selectedItem === 'object') {
			const cloneToUpdate = [...formState.documents];
			const docIndex = documentsPreview.findIndex(
				(doc) => doc.name === preview.name
			);
			const moved = cloneToUpdate.splice(docIndex, 1);
			cloneToUpdate.unshift(moved[0]);
			setFormState({ ...formState, documents: cloneToUpdate });
		} else if (selectedItem.includes('https://')) {
			const updatedChecks = checkedFiles.map((item, i) =>
				i === index ? !item : item
			);

			setCheckedFiles(updatedChecks);

			const updatedFormStateImages = formState.images.map((item, i) => ({
				...item,
				main_image: updatedChecks[i] ? 1 : 0,
			}));

			setFormState({ ...formState, images: updatedFormStateImages });
		} else {
			const cloneToUpdate = [...formState.photos];
			const previewIndexOf = photosPreview.indexOf(preview);
			const moved = cloneToUpdate.splice(previewIndexOf, 1);
			cloneToUpdate.unshift(moved[0]);

			setFormState({ ...formState, photos: cloneToUpdate });
		}
	};

	const handleDeleteImg = (index) => {
		const flattenedArray = [
			imagesPreview,
			photosPreview,
			documentsPreview,
		].flat();
		const fileToRemove = flattenedArray[index];

		//case of uploaded documents
		if (typeof fileToRemove === 'object') {
			setFormState({
				...formState,
				documents: formState.documents.filter(
					(doc) => doc.name !== fileToRemove.name
				),
			});
			setDocumentsPreview((prev) =>
				prev.filter((doc) => doc.name !== fileToRemove.name)
			);
		} else if (fileToRemove.startsWith('https://')) {
			//case of received images
			const idx = imagesPreview.indexOf(fileToRemove);
			setCheckedFiles((prev) =>
				prev.filter((check) => checkedFiles[index] !== check)
			);
			setFormState({
				...formState,
				images: formState.images.filter((_, i) => i !== idx),
			});
			setImagesPreview((prev) => prev.filter((_, i) => i !== idx));
		} else {
			// case of uploaded images
			const idx = photosPreview.indexOf(fileToRemove);
			setFormState((prev) => ({
				...prev,
				photos: prev.photos.filter((_, i) => i !== idx),
			}));
			setPhotosPreview((prev) => prev.filter((_, i) => i !== idx));
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
					photosPreview={photosPreview}
					imagesPreview={imagesPreview}
					documentsPreview={documentsPreview}
					onUpdate={onUpdate}
					isAddMode={isAddMode}
					checkedFiles={checkedFiles}
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
