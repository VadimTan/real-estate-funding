// eslint-disable-next-line react/prop-types
const Button = ({ className, clickHandler, children }) => {
	return (
		<button
			className={className}
			onClick={clickHandler}>
			{children}
		</button>
	);
};

export default Button;
