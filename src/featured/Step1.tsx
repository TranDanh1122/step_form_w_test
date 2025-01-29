import React from "react";
import Input from "../components/Input";

function Step1({ onChange, data, error }: { data: Pick<Form, "step1">, error: Pick<Form, "step1">, onChange: (value: string, name: string) => void }): React.JSX.Element {
    return <>
        <div className="">
            <div className="mb-10 mb:mb-5">
                <h1 className="font-bold text-[2rem] mb:text-[1.5rem] text-[var(--marine-blue)]">Personal info</h1>
                <span className="font-medium mb:font-normal text-base leading-6 text-[var(--cool-gray)]">Please provide your name, email address, and phone number.</span>
            </div>
            <div className="flex flex-col gap-6">
                <Input type="text" key={"name"} name="name" onChange={onChange}
                    label="Name" placeHolder="e.g. Stephen King" error={error.step1?.name || ""} value={data.step1.name} />
                <Input type="email" key={"email"} name="email" onChange={onChange}
                    label="Email Address" placeHolder="e.g. stephenking@lorem.com" error={error.step1?.email || ""} value={data.step1.email} />
                <Input type="text" key={"phone"} name="phone" onChange={onChange}
                    label="Phone Number" placeHolder="e.g. +1 234 567 890" error={error.step1?.phone || ""} value={data.step1.phone} />

            </div>
        </div>
    </>
}
export default Step1