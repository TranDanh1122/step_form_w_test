import React from "react";
export default function Step3({ onChange, data, error }: { data: Pick<Form, "step2">, error: string, onChange: (value: string, name: string) => void }): React.JSX.Element {
    return <>
        <div className="">
            <div className="mb-10">
                <h1 className="font-bold text-[2rem] text-[var(--marine-blue)]">Pick add-ons</h1>
                <span className="font-medium text-base leading-6 text-[var(--cool-gray)]">Add-ons help enhance your gaming experience.</span>
            </div>
            <div className="flex gap-6">

            </div>

            {error && <span className="font-bold text-[0.875rem] w-fit mx-auto mt-8">{error}</span>}
        </div>
    </>
}