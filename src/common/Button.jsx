// eslint-disable-next-line react/prop-types
export const Button = ({ type, className, clickHandler, children }) => {
	return (
		<button
			type={type}
			className={className}
			onClick={clickHandler}>
			{children}
		</button>
	);
};

export default Button;
