import '../../../styles/photos-container.scss';
import Button from '../../common/Button';
import Label from '../../common/Label';
import trashCan from '../../assets/images/trash.svg';
import rectangle from '../../assets/images/Rectangle.svg';
import Checkbox from '../../assets/images/Checkbox.svg';

export const PhotosBox = () => {
	return (
		<div className="photos-upload-container">
			<div className="photos-upload-block-text">
				<h1 className="photos-upload-text">Photos</h1>
			</div>
			<div className="header-for-photos">
				<span className="span-for-header-symbol">#</span>
				<span className="span-for-header-photo">Photo</span>
				<span className="span-for-header-delete">Delete</span>
				<span className="span-for-header-main-image">Main Image</span>
			</div>
			<div className="list-of-uploading-files">
				<Label className={'label-for-row'}>1.</Label>
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
						className="checkbox-for-uploaded"
						src={Checkbox}
						alt=""
					/>
				</div>
			</div>
			<div className="button-upload-photos-container">
				<Button className={'button-for-uploading'}>
					<Label className={'text-for-button-uploading'}>Add Image(s)</Label>
				</Button>
			</div>
		</div>
	);
};
