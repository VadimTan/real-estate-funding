import '../../../styles/photos-container.scss';
import Button from '../../common/Button';
import Label from '../../common/Label';
import { Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
import Modal from '../../common/Modal';
import { hostUrl } from '../../constants/constants';
import trash from '../../assets/images/trash.svg';
import { CheckCircleRounded } from '@mui/icons-material';

export const Documents = ({
	onSubmit,
	handleImage,
	handleDelete,
	handleCheckboxChange,
	inputRef,
	isAddMode,
	onUpdate,
	filesPreview,
	selectedRadioDoc,
	setSelectedRadioDoc,
}) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	const openModal = (imageSrc) => {
		setSelectedImage(imageSrc);
		setIsModalOpen(true);
	};

	let counterInFrontOfFile = 0;
	const { docs, documents } = filesPreview;

	return (
		<div className="docs-upload-container">
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
				className="docs-upload-block-text"
				onClick={changeStateHandler}>
				<h1 className="photos-upload-text">Documents</h1>
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
					<span className="span-for-header-photo">Name</span>
					<span className="span-for-header-delete">Delete</span>
					<span className="span-for-header-main-image">Main Document</span>
				</div>
				<div className="list-of-uploading-files">
					{Object.keys({ docs, documents }).map((key) => {
						return filesPreview[key].map((file, fileIndex) => {
							counterInFrontOfFile++;
							const generatedFileUrl =
								key === 'images'
									? `${hostUrl}${file.path}`
									: key === 'photos'
									? file
									: file.name;
							const checkDocOrImg =
								key === 'images'
									? !!file.main_image
									: key === 'docs'
									? !!file.main_document
									: file.checked;
							return (
								<div
									className={`photo-box${
										checkDocOrImg ? ' checked' : ' disabled'
									}`}
									key={fileIndex}>
									<div>
										<Label className="label-for-row">
											{counterInFrontOfFile}.
										</Label>
									</div>
									<div>
										<span className="document-uploaded-file">
											{generatedFileUrl}
										</span>
									</div>
									<div>
										<Button
											className="delete-icon-div"
											clickHandler={() => handleDelete(fileIndex, key)}>
											<img
												src={trash}
												alt=""
											/>
										</Button>
									</div>
									<div
										className="checkbox-container-upload"
										style={{ marginLeft: 'auto' }}>
										<Radio
											checked={selectedRadioDoc === fileIndex}
											checkedIcon={<CheckCircleRounded />}
											onChange={() => {
												setSelectedRadioDoc(fileIndex);
												handleCheckboxChange(fileIndex, key);
											}}
											name="radio-buttons"
											inputProps={{ 'aria-label': 'A' }}
										/>
									</div>
								</div>
							);
						});
					})}
				</div>
				<div className="button-upload-photos-container">
					<Label
						for="files"
						className="text-for-button-uploading">
						Add Document(s)
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
