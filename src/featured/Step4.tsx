import React from "react";
export default function Step4({ data, setIndex }: { data: Form, setIndex: React.Dispatch<React.SetStateAction<number>> }): React.JSX.Element {
    const total = React.useMemo(() => {
        const addOnsTotal = data.step3.addOns.reduce((sum, current) => sum + parseInt(current.value), 0)
        const plan = parseInt(data.step2.value)
        return addOnsTotal + plan
    }, [data.step3.addOns, data.step2.value])
    return <>
        <div className="">
            <div className="mb-10">
                <h1 className="font-bold text-[2rem] text-[var(--marine-blue)]">Finishing up</h1>
                <span className="font-medium text-base leading-6 text-[var(--cool-gray)]">Double-check everything looks OK before confirming.</span>
            </div>
            <div className="rounded-lg w-full px-6 py-4 bg-[var(--magnolia)]">
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-2">
                        <span className="capitalize font-medium text-[var(--marine-blue)] ">{data.step2.plan} ({data.step2.duration})</span>
                        <span onClick={() => setIndex(1)} className="cursor-pointer underline leading-5 text-[0.875rem] text-[var(--cool-gray)]">Change</span>
                    </div>
                    <span className="font-bold text-base leading-5 text-[var(--marine-blue)]">${data.step2.value}/{data.step2.duration == "monthly" ? "mo" : "yr"}</span>
                </div>
                <div className="h-[1px] w-full bg-[var(--light-gray)] my-5"></div>
                <div className="flex flex-col gap-4 w-full">
                    {
                        data.step3.addOns.map(el =>
                            <div className="flex justify-between items-center">
                                <span className=" leading-5 text-[0.875rem] text-[var(--cool-gray)]">{el.name}</span>
                                <span className="text-[0.875rem] leading-5 text-[var(--marine-blue)]">${el.value}/{data.step2.duration == "monthly" ? "mo" : "yr"}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
                <span className=" leading-5 text-[0.875rem] text-[var(--cool-gray)]">Total (per {data.step2.duration == "monthly" ? "month" : "year"})</span>
                <span className="text-[1.25rem] font-bold leading-5 text-[var(--purplish-blue)]">${total}</span>
            </div>

        </div>
    </>


}