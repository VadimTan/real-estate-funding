import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/addNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';
import { AboutProperty } from '../components/addNEdit/AboutProperty';
import { PhotosBox } from '../components/addNEdit/Photos';
import { Footer } from '../components/listOfProperties/Footer/Footer';

export const AddNEditPage = () => {
	return (
		<Layout>
			<AddNEdit />
			<div className="global-container-add-edit">
				<MainMetrics />
				<AboutProperty />
				<PhotosBox />
			</div>
			<Footer />
		</Layout>
	);
};
