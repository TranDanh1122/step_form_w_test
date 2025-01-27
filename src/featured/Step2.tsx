import React from "react";
import Picker from "../components/Picker";
import arcadeIcon from "../assets/images/icon-arcade.svg"
import advantagedIcon from "../assets/images/icon-advanced.svg"
import proIcon from "../assets/images/icon-advanced.svg"
import Toggle from "../components/Toggle";
export default function Step2({ onChange, data, error }: { data: Pick<Form, "step2">, error: string, onChange: (value: string, name: string) => void }): React.JSX.Element {
    return <>
        <div className="">
            <div className="mb-10">
                <h1 className="font-bold text-[2rem] text-[var(--marine-blue)]">Personal info</h1>
                <span className="font-medium text-base leading-6 text-[var(--cool-gray)]">Please provide your name, email address, and phone number.</span>
            </div>
            <div className="flex gap-6">
                <Picker onChange={onChange} icon={arcadeIcon} name={"arcade"}
                    monthValue="9" yearValue="90" selected={data.step2?.plan == "arcade"} duration={data.step2?.duration} />
                <Picker onChange={onChange} icon={advantagedIcon} name={"advantaged"}
                    monthValue="12" yearValue="120" selected={data.step2?.plan == "advantaged"} duration={data.step2?.duration} />
                <Picker onChange={onChange} icon={proIcon} name={"pro"}
                    monthValue="15" yearValue="150" selected={data.step2?.plan == "pro"} duration={data.step2?.duration} />
            </div>
            <Toggle duration={data.step2.duration} onChange={onChange} />
            {error && <span className="font-bold text-[0.875rem] w-fit mx-auto mt-8">{error}</span>}
        </div>
    </>
}