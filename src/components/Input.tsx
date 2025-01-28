import clsx from "clsx";
import React from "react";
interface InputProps {
    name: string,
    label?: string,
    placeHolder: string,
    onChange: (value: string, name: string) => void,
    error?: string,
    value: string
}
const Input = React.memo(({ name, label, placeHolder, onChange, error, value }: InputProps): React.JSX.Element => {
    console.log("input render");
    
    return <fieldset className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
            <label className="text-[0.875rem] text-[--marine-blue] font-bold " htmlFor={name}>{label}</label>
            {error && <span className="font-bold text-[0.875rem] text-[var(--strawberry-red)]">{error}</span>}
        </div>
        <input value={value} role={`textBox_${name}`} className={clsx("border-[2px] outline-none rounded-lg w-full border-solid p-4 text-base font-medium text-[--marine-blue] placeholder-[var(--cool-gray)]", {
            "focus:border-[var(--purplish-blue)]": !error,
            "border-[var(--strawberry-red)]": error
        })} type="text" id={name} name={name} placeholder={placeHolder} onChange={(e) => onChange(e.target.value, name)} />
    </fieldset>
})
Input.displayName = "Input"
export default Input