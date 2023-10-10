import '../../../styles/photos-container.scss';
import Button from '../../common/Button';
import Label from '../../common/Label';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

export const PhotosBox = ({
	onSubmit,
	handleImage,
	images,
	handleDelete,
	selectedPhotos,
	handleCheckboxChange,
	inputRef,
}) => {
	const [stateOfIcon, setStateOfIcon] = useState(false);
	const [show, setShow] = useState('closed');
	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
		setShow((state) => (state === 'closed' ? 'show' : 'closed'));
	};

	// const label = {
	// 	inputProps: { 'aria-label': 'Checkbox demo' },
	// };

	return (
		<div className="photos-upload-container">
			<div className="photos-upload-block-text">
				<h1 className="photos-upload-text">Photos</h1>
				{stateOfIcon ? (
					<div className="expand-less-icon">
						<ExpandLessIcon onClick={changeStateHandler} />
					</div>
				) : (
					<div className="expand-more-icon">
						<ExpandMoreIcon onClick={changeStateHandler} />
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
					{/* TODO: Make stylization and delete, checkbox for photos*/}
					{images.length == 0 && <h3>No images!</h3>}
					{images.map((image, index) => {
						return (
							<div
								className="photo-box"
								key={index}
								id={index}>
								<div>
									<Label className="label-for-row">{index + 1}.</Label>
								</div>
								<div>
									<img
										className="picture-uploaded-file"
										src={image}
										alt=""
									/>
								</div>
								<div>
									<Button
										className="delete-icon-div"
										clickHandler={() => handleDelete(index)}>
										<DeleteIcon />
									</Button>
								</div>
								<div
									className="checkbox-container-upload"
									style={{ marginLeft: 'auto' }}>
									<Checkbox
										// {...label}
										checked={selectedPhotos.includes(index) ? true : false}
										onChange={() => handleCheckboxChange()}
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
						clickHandler={onSubmit}>
						<span className="text-for-button">Save Changes</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
