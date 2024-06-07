import { useState } from "react";

import styles from "./App.module.css";
import { BlockItem } from "./components/BlockItem/BlockItem";
import { BlockWrapper } from "./components/BlockWrapper/BlockWrapper";
import { BlockVariant } from "./constants/blockTypes";
import type { Block } from "./constants/blockTypes";

const blocks: Block[] = [
	{
		id: crypto.randomUUID(),
		type: BlockVariant.YesNo,
		question: "Some Question",
		options: ["Yes", "No"],
	},
	{
		id: crypto.randomUUID(),
		type: BlockVariant.MultipleChoice,
		question: "Some Question",
		options: ["Yes", "No", "Whatever"],
	},
	{
		id: crypto.randomUUID(),
		type: BlockVariant.YesNo,
		question: "Some Question",
		options: ["Yes", "No"],
	},
];

function App() {
	const [step, setStep] = useState(0);

	const goToPreviousStep = () => {
		if (step === 0) {
			return;
		}

		setStep((step) => step - 1);
	};

	const goToNextStep = () => {
		if (step === blocks.length - 1) {
			return;
		}

		setStep((step) => step + 1);
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<main className={styles.main}>
			{blocks.map((block, index) => {
				return (
					<BlockWrapper key={block.id} step={step} index={index}>
						<BlockItem
							block={block}
							stepNumber={index + 1}
							isLast={index === blocks.length - 1}
							onSubmitForm={handleSubmit}
							goToNextStep={goToNextStep}
						/>
					</BlockWrapper>
				);
			})}

			<div className={styles.navigation}>
				<button disabled={step === 0} onClick={goToPreviousStep}>
					Previous
				</button>
				<button disabled={step === blocks.length - 1} onClick={goToNextStep}>
					Next
				</button>
			</div>
		</main>
	);
}

export default App;
