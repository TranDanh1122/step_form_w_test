import React from "react";
import clsx from "clsx";
const Step = React.memo(({ index, title, selected }: { index: number, title: string, selected: boolean }): React.JSX.Element => {
    return <div className="flex items-center gap-4 justify-start">
        <span className={clsx("border-[1px] border-solid rounded-full px-[10px] py-1 font-bold text-[0.875rem] ", {
            "text-white border-white": !selected,
            "text-[var(--marine-blue)] border-[var(--marine-blue)] bg-[var(--light-blue)]": selected
        })}>{index}</span>
        <div className="flex flex-col gap-1 ">
            <span className="text-[var(--pastel-blue)] text-[0.75rem]">Step {index + 1}</span>
            <h2 className="text-white text-[0.875rem] font-bold">{title}</h2>
        </div>
    </div>
})
Step.displayName = "Step"
export default Step