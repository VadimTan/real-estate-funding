import '../../../styles/photos-container.scss';
import Button from '../../common/Button';
import Label from '../../common/Label';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import buttonZoom from '../../assets/images/button_zoom.svg';
import Modal from '../../common/Modal';

export const PhotosBox = ({
	onSubmit,
	handleImage,
	handleDelete,
	// selectedPhotos,
	handleCheckboxChange,
	inputRef,
	photosPreview,
	imagesPreview,
	documentsPreview,
	isAddMode,
	onUpdate,
	checkedFiles,
}) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	// console.log(checkedFiles);
	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	const openModal = (imageSrc) => {
		setSelectedImage(imageSrc);
		setIsModalOpen(true);
	};

	return (
		<div className="photos-upload-container">
			{selectedImage && (
				<Modal
					active={isModalOpen}
					setActive={() => openModal(false)}>
					<img
						src={selectedImage}
						alt=""
					/>
				</Modal>
			)}
			<div
				className="photos-upload-block-text"
				onClick={changeStateHandler}>
				<h1 className="photos-upload-text">Photos</h1>
				{stateOfIcon ? (
					<div className="expand-less-icon">
						<ExpandLessIcon />
					</div>
				) : (
					<div className="expand-more-icon">
						<ExpandMoreIcon />
					</div>
				)}
			</div>
			<div
				id={show}
				className="photos-global-container">
				<div className="header-for-photos">
					<span className="span-for-header-symbol">#</span>
					<span className="span-for-header-photo">Photo</span>
					<span className="span-for-header-delete">Delete</span>
					<span className="span-for-header-main-image">Main Image</span>
				</div>
				<div className="list-of-uploading-files">
					{[imagesPreview, photosPreview, documentsPreview]
						.flat()
						.map((img, index) => {
							const isChecked = checkedFiles[index];
							return (
								<div
									className={`photo-box${
										checkedFiles[index] ? ' checked' : ' disabled'
									}`}
									key={img}>
									<div>
										<Label className="label-for-row">{index + 1}.</Label>
									</div>
									<div>
										<img
											className="picture-uploaded-file"
											src={img}
											alt="uploaded doc"
										/>
										<img
											className="button-zoom"
											src={buttonZoom}
											alt="zoom-img"
											onClick={() => openModal(img)}
										/>
									</div>
									<div>
										<Button
											className="delete-icon-div"
											clickHandler={() => handleDelete(index)}>
											<DeleteIcon color="error" />
										</Button>
									</div>
									<div
										className="checkbox-container-upload"
										style={{ marginLeft: 'auto' }}>
										<Checkbox
											checked={isChecked}
											onChange={() => handleCheckboxChange(index, img)}
											sx={{ display: 'flex', justifyContent: 'flex-end' }}
										/>
									</div>
								</div>
							);
						})}
				</div>
				<div className="button-upload-photos-container">
					<Label
						for="files"
						className="text-for-button-uploading">
						Add Image(s)
						<input
							ref={inputRef}
							type="file"
							name="file"
							className="button-for-uploading"
							onChange={handleImage}
						/>
					</Label>
				</div>
				<div
					id={show}
					className="button-submit-save">
					<Button
						type="submit"
						className="footer-button-show"
						clickHandler={isAddMode ? onSubmit : onUpdate}>
						<span className="text-for-button">
							{isAddMode ? 'Save Changes' : 'Update Changes'}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
