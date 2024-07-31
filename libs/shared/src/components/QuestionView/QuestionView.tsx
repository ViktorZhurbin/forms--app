import { Button, Title } from "@mantine/core";
import { useRef, useState } from "react";
import { FieldTypes } from "~/constants/field";
import type { FormQuestionsProps } from "~/layouts/Form/FormQuestions/FormQuestions";
import type { TField, TFieldChoice } from "~/models/field/schema";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortText } from "../questions/ShortText/ShortText";

interface QuestionViewProps {
	question: TField;
	order: number;
	isLast: boolean;
	goToNextStep: FormQuestionsProps["goToNextStep"];
	onSubmit: FormQuestionsProps["onSubmit"];
}

export const QuestionView = ({
	order,
	isLast,
	question,
	goToNextStep,
	onSubmit,
}: QuestionViewProps) => {
	const onSubmitRef = useRef<() => void>(null);

	return (
		<QuestionBase
			order={order}
			isLast={isLast}
			question={question}
			Title={(props: { title: string }) => (
				<Title order={1}>{props.title}</Title>
			)}
			Question={() => (
				<QuestionComponent
					question={question}
					goToNextStep={goToNextStep}
					onSubmit={onSubmit}
					onSubmitRef={onSubmitRef}
				/>
			)}
			ButtonSubmit={(props: { className: string; text: string }) => (
				<Button
					type="submit"
					onClick={onSubmitRef.current ?? undefined}
					className={props.className}
				>
					{props.text}
				</Button>
			)}
		/>
	);
};

function QuestionComponent({
	question,
	onSubmit,
	onSubmitRef,
	goToNextStep,
}: Pick<QuestionViewProps, "question" | "goToNextStep" | "onSubmit"> & {
	onSubmitRef: React.MutableRefObject<(() => void) | null>;
}) {
	const [textValue, setTextValue] = useState("");
	const [selectedChoices, setSelectedChoices] = useState<
		TFieldChoice["options"]
	>([]);

	const baseAnswer = {
		fieldId: question.id,
		type: question.type,
	};

	switch (question.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			onSubmitRef.current = () => {
				onSubmit({
					...baseAnswer,
					value: selectedChoices,
				});
			};

			return (
				<MultipleChoice
					questionId={question.id}
					options={question.options}
					questionType={question.type}
					setChoices={setSelectedChoices}
					selectedChoices={selectedChoices}
					onSelect={goToNextStep}
				/>
			);
		}

		case FieldTypes.ShortText: {
			onSubmitRef.current = () => {
				onSubmit({
					...baseAnswer,
					value: textValue,
				});
			};

			return (
				<ShortText
					questionId={question.id}
					setValue={setTextValue}
					placeholder={question.textPlaceholder}
				/>
			);
		}

		default:
			return false;
	}
}
