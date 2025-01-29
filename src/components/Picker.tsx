import clsx from "clsx";
import React from "react";
const Picker = React.memo(({ icon, name, monthValue, yearValue, selected, duration, onChange }: PickerProps): React.JSX.Element => {
    console.log("picker render");
    return <>
        <div role="picker" onClick={() => {
            onChange(name, "plan")
            onChange(duration == "monthly" ? monthValue : yearValue, "value")
        }} className={clsx("border-[2px] mb:flex mb:items-center mb:gap-4 border-solid p-4 w-full rounded-lg cursor-pointer hover:border-[var(--purplish-blue)] ", {
            "border-[var(--purplish-blue)] bg-[var(--alabaster)]": selected,
            "border-[var(--light-gray)]": !selected
        })}>
            <img role="picker_icon" className=" mb-10 mb:mb-0 w-10 h-10 rounded-full" src={icon} />
            <div className="flex flex-col gap-1">
                <span className="font-medium text-base text-[var(--marine-blue)] capitalize ">{name}</span>
                {duration == "monthly" &&
                    <>
                        <span className="text-[0.875rem] leading-5 text-[var(--cool-gray)]">${monthValue}/mo</span>
                        <span className="text-[var(--marine-blue)] text-[.75rem] mb:hidden" style={{ opacity: 0 }}>none</span>
                    </>}
                {duration == "yearly" && <>
                    <span className="text-[0.875rem] leading-5 text-[var(--cool-gray)]">${yearValue}/yr</span>
                    <span className="text-[var(--marine-blue)] text-[.75rem]">2 months free</span>

                </>
                }
            </div>

        </div>
    </>
})
Picker.displayName = "Picker"
export default Picker