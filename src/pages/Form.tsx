import React from "react";
import Step1 from "../featured/Step1";
import Step from "../components/Step";
import Step2 from "../featured/Step2";
import Step3 from "../featured/Step3";
import Step4 from "../featured/Step4";

const stepTitles = [
    { title: "YOUR INFO" },
    { title: "SELECT PLAN" },
    { title: "ADD-ONS" },
    { title: "SUMMARY" },

]
export const useForm = (initData: Form, numberOfStep: number) => {

    const [index, setIndex] = React.useState<number>(0)
    const [data, setData] = React.useState<Form>(initData)
    const [errors, setErrors] = React.useState({
        step1: {
            name: "",
            email: "",
            phone: ""
        },
        step2: "",
        step3: ""
    })
    /* 
        why your need index dependency????
        index is state => reactive value
        usecallback will capture all reactive value when compoennt mount
        if you not re-render callback event when index change, index always = 0 (initdata)
        That how useCallback working!!!
        But why not add data, data is reactive value too????
        because when you using callback to set data, the param (data) get the data of the CURRENT re-render
        so (data) is always the newest data!!!
    */
    const handleChange = React.useCallback((value: string | addOns, name: string) => {
        const currentStep = `step${index + 1}` as keyof Form
        setData((data: Form) => {
            if (name == "addOns" && Array.isArray(data[currentStep][name])) {
                const arr = data[currentStep][name]
                const addOn = value as addOns
                const findIdx = arr.findIndex(el => el.name === addOn.name)
                if (findIdx != -1) { //check if exist
                    if (arr[findIdx].value == addOn.value) { //if not change value
                        data[currentStep][name] = arr.filter(el => el.name !== addOn.name)
                    } else {  //if change value
                        data[currentStep][name] = arr.map(el => {
                            if (el.name == addOn.name) return { ...el, value: addOn.value }
                            return el
                        })
                    }
                } else {
                    data[currentStep][name].push(addOn)
                }
            } else {
                data[currentStep][name] = value as string
            }
            console.log(data);

            return { ...data }
        })
    }, [index])

    const handleNext = () => {
        setIndex((index) => {
            if ((index + 1) == numberOfStep) return index
            return index + 1
        })
    }
    const handleBack = () => {
        setIndex((index) => {
            if (index == 0) return index
            return index - 1
        })
    }
    return { index, data, errors, handleChange, handleNext, handleBack, setIndex }
}
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
    const { index, data, errors, handleChange, handleNext, handleBack, setIndex } = useForm(initData, 4)
    return <div className="flex justify-start items-stretch p-6 w-3/4 bg-white rounded-2xl shadow-lg">
        <div className={`w-1/3 rounded-[10px] bg-[url(/src/assets/images/bg-sidebar-desktop.svg)] mb:bg-[url(/src/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-center p-8 flex flex-col gap-8`} >
            {
                stepTitles.map((step, idx) => <Step index={idx + 1} title={step.title} selected={index == idx} />)
            }
        </div>
        <div className="w-2/3 px-24 pt-14 pb-8">
            {index == 0 && <Step1 data={data} error={errors} onChange={handleChange} />}
            {index == 1 && <Step2 data={data} error={errors.step2} onChange={handleChange} />}
            {index == 2 && <Step3 data={data} error={errors.step3} onChange={handleChange} />}
            {index == 3 && <Step4 data={data} setIndex={setIndex} />}

            <div className="mt-20 flex justify-between font-medium text-base">
                {index != 0 && <button onClick={handleBack} className="text-[var(--cool-gray)]">Back</button>}
                <button onClick={handleNext} className={`text-white ml-auto px-6 py-4 bg-[var(--marine-blue)] rounded-lg hover:bg-[var(--marine-blue)]/50`}>Next Step</button>
            </div>
        </div>
    </div>
}
