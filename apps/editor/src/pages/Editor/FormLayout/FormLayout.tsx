export const FormLayout = (params: {
	header: React.ReactElement;
	children: React.ReactNode;
}) => {
	const { header, children } = params;

	return (
		<div className={"root"}>
			<header className={"header"}>{header}</header>
			{children}
		</div>
	);
};
