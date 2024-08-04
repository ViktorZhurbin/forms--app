import { useCallback } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import type { TAnswer } from "~/models/response/schema";
import {
	createResponse,
	updateAnswer,
	updateResponse,
} from "~/models/response/write";
import { getNowISOString } from "~/utils/date";

export const useAnswer = ({
	isLastStep,
	goToNextStep,
}: { isLastStep?: boolean; goToNextStep?: () => void }) => {
	const [{ responseId }, setLocalResponseWithFormId] =
		useLocalResponseWithFormId();

	const formNanoId = useFormNanoId();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			if (!responseId) {
				const responseId = await createResponse({
					answer,
					formNanoId,
				});
				setLocalResponseWithFormId({ formNanoId, responseId });

				return;
			}

			await updateAnswer({ responseId, answer });
		},
		[responseId, formNanoId, setLocalResponseWithFormId],
	);

	const handleSubmit = useCallback(async () => {
		if (isLastStep) {
			await updateResponse({
				responseId,
				payload: { submittedAt: getNowISOString() },
			});
		} else {
			goToNextStep?.();
		}
	}, [isLastStep, responseId, goToNextStep]);

	return { handleAnswer, handleSubmit };
};
