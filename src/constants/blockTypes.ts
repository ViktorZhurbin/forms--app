enum BlockVariant {
	YesNo,
	MultipleChoice,
}

type Block = {
	id: string;
	type: BlockVariant;
	question: string;
	options: string[];
};

export { BlockVariant };

export type { Block };
