// eslint-disable-next-line react/prop-types
export const Label = ({ id, className, children }) => {
	return (
		<label
			id={id}
			className={className}>
			{children}
		</label>
	);
};

export default Label;
