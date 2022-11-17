import { useState } from "react";
import Events from "./Events";
import ProjectContent from "./ProjectContent";
import SelectNumber from "./SelectNumber";
import Simple from "./Simple";

export default function IterationExample() {
	const [selectOption, selectOptionUpdate] = useState(1);

	function showDifferentUI() {
		if (selectOption === 1) {
			return (
				<>
					<Simple />
				</>
			);
		} else if (selectOption == 2) {
			return <>
				<Events />
			</>;
		} else {
			return (
				<>
					<h3>thanks..</h3>
				</>
			);
		}
	}

	//let arr = [1,2,3,4,5];
	let arr = Array(100).fill(0); //[0,0,0...0]
	return (
		<>
			<div>
				<select
					onChange={(e) => {
						console.log(e.currentTarget.value);
					}}
				>
					{arr.map((number, index) => (
						<option key={index + 1} value={index + 1}>
							{index + 1}
						</option>
					))}
				</select>
			</div>
			<hr />

			<div>
				<SelectNumber onSelected={selectOptionUpdate} />
			</div>

			<hr />

			<div>{showDifferentUI()}</div>

            <div>
                <ProjectContent other = {<span> ended </span>}>
                    <button onClick={()=>{alert('ok');}}>I am prjected from IterationExample to ProjectContent </button>
                    <Simple />
                </ProjectContent>
            </div>
		</>
	);
}
