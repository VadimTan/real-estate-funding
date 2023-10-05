import '../../../styles/photos-container.scss';
import Button from '../../common/Button';
import Label from '../../common/Label';
import trashCan from '../../assets/images/trash.svg';
import rectangle from '../../assets/images/Rectangle.svg';
import Checkbox from '../../assets/images/Checkbox.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

export const PhotosBox = () => {
	const [stateOfIcon, setStateOfIcon] = useState(false);

	const changeStateHandler = () => {
		setStateOfIcon((icon) => !icon);
	};

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
			<div className="photos-global-container">
				<div className="header-for-photos">
					<span className="span-for-header-symbol">#</span>
					<span className="span-for-header-photo">Photo</span>
					<span className="span-for-header-delete">Delete</span>
					<span className="span-for-header-main-image">Main Image</span>
				</div>
				<div className="list-of-uploading-files">
					<Label className="label-for-row">1.</Label>
					<img
						className="picture-uploaded-file"
						src={rectangle}
						alt=""
					/>
					<img
						className="trash-can"
						src={trashCan}
						alt=""
					/>
					<div className="checkbox-container-upload">
						<img
							className="checkbox-for-upload"
							src={Checkbox}
							alt=""
						/>
					</div>
				</div>
				<div className="button-upload-photos-container">
					<Button className="button-for-uploading">
						<Label className="text-for-button-uploading">Add Image(s)</Label>
					</Button>
				</div>
			</div>
		</div>
	);
};
