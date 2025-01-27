import React from "react";
import Step1 from "../featured/Step1";
import clsx from "clsx";
const stepTitles = [
    { title: "YOUR INFO" },
    { title: "SELECT PLAN" },
    { title: "ADD-ONS" },
    { title: "SUMMARY" },

]
export default function Form(): React.JSX.Element {
    return <div className="flex justify-start items-stretch p-6 w-5/6 bg-white">
        <div className="w-2/5">
            {
                stepTitles.map((step, index) => <Step index={index} title={step.title} selected={true} />)
            }
        </div>
        <div className="w-3/5">
            <Step1 />
        </div>
    </div>
}
const Step = React.memo(({ index, title, selected }: { index: number, title: string, selected: boolean }): React.JSX.Element => {
    return <div className="flex items-center gap-4 justify-start">
        <span className={clsx("border-[1px] border-solid rounded-full px-1 py-2 ", {
            "text-white border-white": !selected,
            "text-[var(--marine-blue)] border-[var(--marine-blue)]": selected
        })}>{index}</span>
        <div>
            <span>Step {index}</span>
            <h2>{title}</h2>
        </div>
    </div>
})