export const onRequest = async (context) => {
	return Response.json({
		data: [
			{ id: "1", name: "Form 1", responseCount: 0 },
			{ id: "2", name: "My Other Form", responseCount: 10000 },
		],
	});
};
