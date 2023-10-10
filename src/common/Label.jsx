// eslint-disable-next-line react/prop-types
export const Label = ({ id, className, clickHandler, children }) => {
	return (
		<label
			id={id}
			className={className}
			onClick={clickHandler}>
			{children}
		</label>
	);
};

export default Label;
