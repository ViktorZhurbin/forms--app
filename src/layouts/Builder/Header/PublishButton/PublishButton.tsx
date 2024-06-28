import { Button, Tooltip } from "@mantine/core";
import { QuestionGroups, QuestionTypes } from "~/constants/questions";
import { /* createForm, */ createQuestion } from "~/models/methods";

const fn = () =>
	createQuestion({
		formId: "b2485913-9276-4d87-bce6-0c0e0c997d41",
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
		title: "ShortText",
	});

// const fn2 = () => createForm({ name: "Form 2", responseCount: 10 });

export const PublishButton = () => {
	return (
		<Tooltip
			withArrow
			arrowSize={6}
			label="Make your changes visible to the world"
		>
			<Button onClick={fn} color="rgb(31, 41, 55)">
				Publish
			</Button>
		</Tooltip>
	);
};
