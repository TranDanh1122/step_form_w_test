import clsx from "clsx";
import React from "react";
const Toggle = React.memo(({ duration, onChange }: { duration: string, onChange: (value: string, name: string) => void }): React.JSX.Element => {
    return <>
        <div className="w-full py-4 text-[0.875rem] font-medium flex items-center justify-center gap-6 bg-[var(--magnolia)] mt-8">
            <span className={clsx("", {
                "text-[var(--cool-gray)]": duration != "monthly",
                "text-[var(--marine-blue)]": duration == "monthly",
            })}>Monthly</span>
            <input type="range" min={0} max={1} onChange={(e) => onChange((e.target as HTMLInputElement).value == "0" ? "monthly" : "yearly", "duration")} className="custom_range" />
            <span className={clsx("", {
                "text-[var(--cool-gray)]": duration != "yearly",
                "text-[var(--marine-blue)]": duration == "yearly",
            })}>Yearly</span>
        </div>
    </>
})
Toggle.displayName = "Toggle"
export default Toggle