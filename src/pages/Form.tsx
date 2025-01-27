import React from "react";
import Step1 from "../featured/Step1";
import Step from "../components/Step";

const stepTitles = [
    { title: "YOUR INFO" },
    { title: "SELECT PLAN" },
    { title: "ADD-ONS" },
    { title: "SUMMARY" },

]
export const useForm = () => {
    const initData: Form = {
        step1: {
            name: "",
            email: "",
            phone: ""
        }
    }
    const [index, setIndex] = React.useState<number>(0)
    const [data, setData] = React.useState<Form>(initData)
    const [errors, setErrors] = React.useState<Form>({} as Form)
    const handleChange = React.useCallback((value: string, name: string) => {
        const currentStep = `step${index + 1}` as keyof Form
        setData((data: Form) => {
            data[currentStep][name] = value            
            return {...data}
        })        
    }, [])
    return { index, data, errors, handleChange }
}
export default function Form(): React.JSX.Element {
    const { index, data, errors, handleChange } = useForm()
    console.log(errors);
    
    return <div className="flex justify-start items-stretch p-6 w-3/4 bg-white rounded-2xl shadow-lg">
        <div className={`w-1/3 rounded-[10px] bg-[url(/src/assets/images/bg-sidebar-desktop.svg)] mb:bg-[url(/src/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-center p-8 flex flex-col gap-8`} >
            {
                stepTitles.map((step, idx) => <Step index={idx} title={step.title} selected={index == idx} />)
            }
        </div>
        <div className="w-2/3 px-24 pt-14 pb-8">
            <Step1 data={data} error={errors} onChange={handleChange} />
            <div className="mt-24 flex justify-between  font-medium text-base">
                <button className="text-[var(--cool-gray)]">Back</button>
                <button className="text-white px-6 py-4 bg-[var(--marine-blue)] rounded-lg hover:bg-[var(--marine-blue)]/50">Next Step</button>
            </div>
        </div>
    </div>
}
