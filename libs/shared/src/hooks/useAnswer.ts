import { useCallback, useState } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalFormResponseId } from "~/hooks/useLocalFormResponseId";
import type { TAnswer, TResponse } from "~/models/response/schema";
import {
	createResponse,
	updateAnswer,
	updateResponse,
} from "~/models/response/write";
import { getNowISOString } from "~/utils/date";
import { useIsPreview } from "./searchParams/useIsPreview";

const initialPreviewResponse: TResponse = {
	id: "test",
	updatedAt: "",
	answers: {},
};

export const useAnswer = () => {
	const formNanoId = useFormNanoId();
	const isPreview = useIsPreview();
	const [previewResponse, setPreviewResponse] = useState<TResponse>(
		initialPreviewResponse,
	);
	const [localResponseId, setLocalResponseId] = useLocalFormResponseId();

	const createOrUpdateAnswer = useCallback(
		async (answer: TAnswer) => {
			if (isPreview) {
				setPreviewResponse((prevResponse) => {
					const newResponse = { ...prevResponse };
					newResponse.answers[answer.field.id] = answer;

					return newResponse;
				});

				return;
			}

			if (!localResponseId) {
				const responseId = await createResponse({
					answer,
					formNanoId,
				});
				setLocalResponseId(responseId);

				return;
			}

			await updateAnswer({ responseId: localResponseId, answer });
		},
		[localResponseId, formNanoId, setLocalResponseId, isPreview],
	);

	const submitAnswer = useCallback(async () => {
		const submittedAt = getNowISOString();

		if (isPreview) {
			setPreviewResponse((prevResponse) => ({
				...prevResponse,
				submittedAt,
			}));

			return;
		}

		let responseId = localResponseId;
		if (!responseId) {
			responseId = await createResponse({
				formNanoId,
			});

			setLocalResponseId(responseId);
		}

		await updateResponse({
			responseId,
			payload: { submittedAt },
		});
	}, [localResponseId, isPreview, formNanoId, setLocalResponseId]);

	return { createOrUpdateAnswer, submitAnswer, previewResponse };
};
