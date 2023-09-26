import './App.css';
import { ListOfProp } from './components/list-of-properties/ListOfProp';
import { NavMenu } from './components/list-of-properties/NavMenu';
// import { Login } from './components/login/Login';
// import { Logo } from './components/login/Logo';

function App() {
	return (
		<>
			<NavMenu />
			<ListOfProp />
			{/* <Logo />
			<Login /> */}
		</>
	);
}

export default App;
