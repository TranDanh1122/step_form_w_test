import React from "react";
import Step1 from "../featured/Step1";
import Step from "../components/Step";
import Step2 from "../featured/Step2";
import Step3 from "../featured/Step3";
import Step4 from "../featured/Step4";
import { useForm } from "./useForm";
import End from "../featured/End";
const stepTitles = [
    { title: "YOUR INFO" },
    { title: "SELECT PLAN" },
    { title: "ADD-ONS" },
    { title: "SUMMARY" },

]

export default function Form(): React.JSX.Element {

    const initData: Form = React.useMemo(() => ({
        step1: {
            name: "",
            email: "",
            phone: ""
        },
        step2: {
            plan: "",
            value: "",
            duration: "yearly",
        },
        step3: {
            addOns: [],
        }
    }), [])
    const { index, data, errors, handleChange, handleNext, handleBack, setIndex, end } = useForm(initData, 4)



    return <div className="flex justify-start items-stretch p-6 w-3/4 bg-white rounded-2xl min-h-[600px] shadow-lg">
        <div className={`w-1/3 rounded-[10px] bg-[url(/src/assets/images/bg-sidebar-desktop.svg)] mb:bg-[url(/src/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-center p-8 flex flex-col gap-8`} >
            {
                stepTitles.map((step, idx) => <Step index={idx + 1} title={step.title} selected={index == idx} />)
            }
        </div>
        <div className="w-2/3 px-24 pt-14 pb-8">
            {!end && <>

                <div className={`${index == 0 ? "block" : "hidden"}`}>
                    <Step1 data={data} error={errors} onChange={handleChange} />
                </div>
                <div className={`${index == 1 ? "block" : "hidden"}`}>
                    <Step2 data={data} error={errors.step2} onChange={handleChange} />
                </div>
                <div className={`${index == 2 ? "block" : "hidden"}`}>
                    <Step3 data={data} error={errors.step3} onChange={handleChange} />
                </div>
                <div className={`${index == 3 ? "block" : "hidden"}`}>
                    <Step4 data={data} setIndex={setIndex} />
                </div>
            </>
            }
            {end && <End />}
            {!end &&
                <div className="mt-20 flex justify-between font-medium text-base">
                    {index != 0 && <button onClick={handleBack} className="text-[var(--cool-gray)]">Back</button>}
                    <button onClick={handleNext} className={`text-white ml-auto px-6 py-4 bg-[var(--marine-blue)] rounded-lg hover:bg-[var(--marine-blue)]/50`}>Next Step</button>
                </div>
            }
        </div>
    </div>
}
