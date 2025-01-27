import React from "react";
export default function Step4({ data, setIndex }: { data: Form, setIndex: React.Dispatch<React.SetStateAction<number>> }): React.JSX.Element {
    return <>
        <div className="">
            <div className="mb-10">
                <h1 className="font-bold text-[2rem] text-[var(--marine-blue)]">Finishing up</h1>
                <span className="font-medium text-base leading-6 text-[var(--cool-gray)]">Double-check everything looks OK before confirming.</span>
            </div>
            <div className="rounded-lg">
                <div className="flex justify-center items-center">
                    <div>
                        <span className="capitalize font-medium text-[var(--marine-blue)] ">{data.step2.plan} ({data.step2.duration})</span>
                        <span className="underline leading-5 text-[0.875rem] text-[var(--cool-gray)]">Change</span>
                    </div>
                    <span className="font-bold text-base leading-5 text-[var(--marine-blue)]">${data.step2.value}/{data.step2.duration == "monthly" ? "mo" : "yr"}</span>
                </div>
                <div className="h-[1px] w-full bg-[var(--cool-gray)]"></div>
                {/* {
                    data.step3.addOns
                } */}
                <div className="flex justify-center items-center">
                    <span className=" leading-5 text-[0.875rem] text-[var(--cool-gray)]">Change</span>
                    <span className="text-[0.875rem] leading-5 text-[var(--marine-blue)]">${data.step2.value}/{data.step2.duration == "monthly" ? "mo" : "yr"}</span>
                </div>
               
            </div>
        </div>
    </>


}