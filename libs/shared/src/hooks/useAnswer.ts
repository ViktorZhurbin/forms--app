import { useCallback } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalFormResponseId } from "~/hooks/useLocalFormResponseId";
import type { TAnswer } from "~/models/response/schema";
import {
	createResponse,
	updateAnswer,
	updateResponse,
} from "~/models/response/write";
import { getNowISOString } from "~/utils/date";
import { useIsPreview } from "./useIsPreview";

export const useAnswer = ({
	isLastStep,
	goToNextStep,
}: { isLastStep?: boolean; goToNextStep?: () => void }) => {
	const formNanoId = useFormNanoId();
	const isPreview = useIsPreview();
	const [responseId, setLocalResponseId] = useLocalFormResponseId();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			if (isPreview) return;

			if (!responseId) {
				const responseId = await createResponse({
					answer,
					formNanoId,
				});
				setLocalResponseId(responseId);

				return;
			}

			await updateAnswer({ responseId, answer });
		},
		[responseId, formNanoId, setLocalResponseId, isPreview],
	);

	const handleSubmit = useCallback(async () => {
		if (isLastStep && !isPreview) {
			await updateResponse({
				responseId,
				payload: { submittedAt: getNowISOString() },
			});
		} else {
			goToNextStep?.();
		}
	}, [isLastStep, responseId, goToNextStep, isPreview]);

	return { handleAnswer, handleSubmit };
};
