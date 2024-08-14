import { Progress } from "@mantine/core";

export const FormProgress = (props: { className?: string; value: number }) => {
	const { className, value } = props;

	return (
		<Progress
			size="sm"
			radius={0}
			aria-label="Form completion in percentage"
			className={className}
			value={value}
			// value={Math.round((100 / fields.length) * (currentStep + 1))}
			transitionDuration={300}
		/>
	);
};
