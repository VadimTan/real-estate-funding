export const Modal = ({ active, setActive, children }) => {
	if (!active) return;
	return (
		<div
			className="modal-window"
			onClick={() => setActive(false)}>
			<div className="modal">
				<div
					className="modal-content"
					onClick={(e) => e.stopPropagation()}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
