import Layout from '../common/Layout';
import { MainMetrics } from '../components/addNEdit/MainMetrics';
import AddNEdit from '../components/addNEdit/AddNEdit';
import '../../styles/mainmetrics.scss';

export const AddNEditPage = () => {
	return (
		<Layout>
			<AddNEdit />
			<div className="global-container-add-edit">
				<MainMetrics />
			</div>
		</Layout>
	);
};
