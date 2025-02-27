import clsx from "clsx";
import React from "react";
interface CheckerProps extends Omit<PickerProps, "icon" | "onChange"> {
    desc: string,
    onChange: (value: addOns, name: string) => void
}
const Checker = React.memo(({ name, desc, monthValue, yearValue, selected, duration, onChange }: CheckerProps): React.JSX.Element => {
    console.log("checker render");
    return <>
        <div role="checker" onClick={(e) => {
            e.stopPropagation()
            onChange({ name: name, value: duration == "monthly" ? monthValue : yearValue }, "addOns")
        }} className={clsx("border-[2px] border-solid p-6 mb:px-2 w-full rounded-lg cursor-pointer flex items-center justify-between hover:border-[var(--purplish-blue)] ", {
            "border-[var(--purplish-blue)] bg-[var(--alabaster)]": selected,
            "border-[var(--light-gray)]": !selected
        })}>
            <input role="checker_checkbox" type="checkbox" onChange={
                (e) => {
                    e.stopPropagation()
                    onChange({ name: name, value: duration == "monthly" ? monthValue : yearValue }, "addOns")
                }
            } checked={selected} className="custom_checkbox w-5 h-5 rounded-sm" />
            <div className="flex flex-col gap-1">
                <span className="font-medium text-base mb:text-[0.875rem] text-[var(--marine-blue)] capitalize ">{name}</span>
                <span className="text-[0.875rem] mb:text-[0.75rem] leading-5 text-[var(--cool-gray)]  ">{desc}</span>
            </div>
            {duration == "monthly" && <span className="text-[0.875rem] mb:text-[0.75rem] text-[var(--purplish-blue)] leading-5">${monthValue}/mo</span>}
            {duration == "yearly" && <span className="text-[0.875rem] mb:text-[0.75rem] text-[var(--purplish-blue)] leading-5">${yearValue}/yr</span>}
        </div>
    </>
})
Checker.displayName = "Checker"
export default Checker