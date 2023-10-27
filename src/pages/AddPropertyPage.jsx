/* eslint-disable no-extra-boolean-cast */
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
import { Documents } from '../components/AddNEdit/Documents';

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
	const [selectedRadioImage, setSelectedRadioImage] = useState();
	const [selectedRadioDoc, setSelectedRadioDoc] = useState();
	const [originalPhotosOrder, setOriginalPhotosOrder] = useState([]);
	const [originalDocsOrder, setOriginalDocsOrder] = useState([]);

	const [formState, setFormState] = useState({
		total_price: '',
		price: '',
		annual_profit_from: '',
		annual_profit_to: '',
		sell_price: '',
		app_fee: '',
		additional_charges: '',
		period_from: '',
		period_to: '',
		handover_from: '',
		handover_to: '',
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

	const saveProperty = async (formState) =>
		await axios.post(
			`${baseUrl}/admin/property/add`,
			{
				...formState,
				annual_profit:
					formState.annual_profit_from && formState.annual_profit_to
						? `${formState.annual_profit_from.replace(
								',',
								'.'
						  )} - ${formState.annual_profit_to.replace(',', '.')}`
						: '',
				period:
					formState.period_from && formState.period_to
						? `${formState.period_from} - ${formState.period_to}`
						: '',
				handover:
					formState.handover_from && formState.handover_to
						? `${formState.handover_from} - ${formState.handover_to}`
						: '',
			},
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			}
		);

	const updateProperty = async (formState) => {
		const dataToSend = {
			...formState,
			images: JSON.stringify(formState.images),
			docs: JSON.stringify(formState.docs),
			annual_profit:
				formState.annual_profit_from && formState.annual_profit_to
					? `${formState.annual_profit_from} - ${formState.annual_profit_to}`
					: `${(formState.annual_profit_from = 0)} - ${(formState.annual_profit_to = 0)}`,
			period:
				formState.period_from && formState.period_to
					? `${formState.period_from} - ${formState.period_to}`
					: '',
			handover:
				formState.handover_from && formState.handover_to
					? `${formState.handover_from} - ${formState.handover_to}`
					: '',
		};
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
					const docs = response.data.data.docs.map((doc, index) => {
						if (doc.main_document > 0) {
							setSelectedRadioDoc(index);
						}
						return {
							...doc,
							checked: !!doc.main_document,
						};
					});
					const images = response.data.data.images.map((image, index) => {
						if (image.main_image > 0) {
							setSelectedRadioImage(index);
						}
						return {
							...image,
							checked: !!image.main_image,
						};
					});
					setFilesPreview({ images, photos: [], docs, documents: [] });

					const [annual_profit_from, annual_profit_to] =
						response.data.data.annual_profit
							.split('-')
							// eslint-disable-next-line use-isnan
							.map((cur) => (+cur !== NaN ? +cur : 0));

					setFormState(
						response.data.data && {
							...response.data.data,
							photos: [],
							documents: [],
							annual_profit_from,
							annual_profit_to,
							period_from: response.data.data.period.split('-')[0].trim(),
							period_to: response.data.data.period.split('-')[1].trim(),
							handover_from: response.data.data.handover.split('-')[0].trim(),
							handover_to: response.data.data.handover.split('-')[1].trim(),
						}
					);
					setIsLoading(false);
				} catch (error) {
					setIsLoading(false);
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
				response.data.responseCode.responseCode === '11' ||
				response.data.responseCode.responseCode === '13'
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
			setOriginalPhotosOrder([...originalPhotosOrder, file]);
		} else {
			setFilesPreview({
				...filesPreview,
				documents: [...filesPreview.documents, file],
			});
			setFormState({ ...formState, documents: [...formState.documents, file] });
			setOriginalDocsOrder([...originalDocsOrder, file]);
		}
	};

	const handleCheckboxChange = (index, key) => {
		const clonedFiles = [...formState[key]];
		if (key === 'images') {
			// Handle the 'images' case
			clonedFiles[index].main_image = 1;
			clonedFiles[selectedRadioImage].main_image = 0;
			// clonedFiles[index].main_image === 0 ? 1 : 0;
			setFormState({ ...formState, images: clonedFiles });
			setFilesPreview({ ...filesPreview, [key]: clonedFiles });
		} else if (key === 'photos') {
			const img = originalPhotosOrder[index];
			const indexOfCloned = clonedFiles.indexOf(img);
			// Handle the 'photos' case
			const moved = clonedFiles.splice(indexOfCloned, 1);
			clonedFiles.unshift(moved[0]);
			setFormState({ ...formState, photos: clonedFiles });
		} else if (key === 'docs') {
			// Handle the 'docs' case
			clonedFiles[index].main_document = 1;
			clonedFiles[selectedRadioDoc].main_document = 0;
			setFormState({ ...formState, docs: clonedFiles });
			setFilesPreview({ ...filesPreview, [key]: clonedFiles });
		} else if (key === 'documents') {
			const doc = originalDocsOrder[index];
			const indexOfClonedDoc = clonedFiles.indexOf(doc);
			// Handle the 'documents' case
			const moved = clonedFiles.splice(indexOfClonedDoc, 1);
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

		setFormState({
			...formState,
			[name]: value,
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
				<div className="photo-and-docs-div">
					<PhotosBox
						onSubmit={onSubmit}
						handleImage={handleImage}
						handleDelete={handleDeleteImg}
						handleCheckboxChange={handleCheckboxChange}
						inputRef={inputRef}
						onUpdate={onUpdate}
						isAddMode={isAddMode}
						filesPreview={filesPreview}
						selectedRadioImage={selectedRadioImage}
						setSelectedRadioImage={setSelectedRadioImage}
					/>
					<Documents
						onSubmit={onSubmit}
						handleImage={handleImage}
						handleDelete={handleDeleteImg}
						handleCheckboxChange={handleCheckboxChange}
						inputRef={inputRef}
						onUpdate={onUpdate}
						isAddMode={isAddMode}
						filesPreview={filesPreview}
						selectedRadioDoc={selectedRadioDoc}
						setSelectedRadioDoc={setSelectedRadioDoc}
					/>
				</div>
			</div>
			<Footer
				isAddMode={isAddMode}
				onSubmit={onSubmit}
				onUpdate={onUpdate}
			/>
		</Layout>
	);
};
