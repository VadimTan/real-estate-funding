// eslint-disable-next-line react/prop-types
export const Button = ({ className, clickHandler, children }) => {
	return (
		<button
			className={className}
			onClick={clickHandler}>
			{children}
		</button>
	);
};
