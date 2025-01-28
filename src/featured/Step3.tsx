import React from "react";
import Checker from "../components/Checker";
export default function Step3({ onChange, data, error }: { data: Pick<Form, "step2" | "step3">, error: string, onChange: (value: addOns, name: string) => void }): React.JSX.Element {

    return <>
        <div className="">
            <div className="mb-10">
                <h1 className="font-bold text-[2rem] text-[var(--marine-blue)]">Pick add-ons</h1>
                <span className="font-medium text-base leading-6 text-[var(--cool-gray)]">Add-ons help enhance your gaming experience.</span>
            </div>
            <div className="flex flex-col gap-6">
                <Checker name="Online service" desc="Access to multiplayer games"
                    monthValue="1" yearValue="10"
                    selected={data.step3.addOns.some(el => el.name == "Online service")}
                    duration={data.step2.duration}
                    onChange={onChange} />
                <Checker name="Larger storage" desc="Extra 1TB of cloud save"
                    monthValue="2" yearValue="20"
                    selected={data.step3.addOns.some(el => el.name == "Larger storage")}
                    duration={data.step2.duration}
                    onChange={onChange} />
                <Checker name="Customizable profile" desc="Custom theme on your profile"
                    monthValue="2" yearValue="20"
                    selected={data.step3.addOns.some(el => el.name == "Customizable profile")}
                    duration={data.step2.duration}
                    onChange={onChange} />
            </div>

            {error && <span className="font-bold text-[0.875rem] w-fit mx-auto mt-8">{error}</span>}
        </div>
    </>
}