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
interface Dynamic {
    [key: string]: (value: any) => string | undefined
}

const validateRule: Dynamic = {
    name: (value: string) => { if (!value.trim()) return 'Name is required' },
    email: (value: string) => {
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email is not valid'
    },
    phone: (value: string) => {
        if (!value.trim()) return 'Phone is required'
        if (!/^[0-9]{10}$/.test(value)) return 'Phone is not valid'
    },
    plan: (value: string) => { if (!value.trim()) return 'Plan is required' },
    addOns: (value: addOns[]) => { if (value.length <= 0) return "Select atleast one add-on" },
}
export const useForm = (initData: Form, numberOfStep: number) => {

    const [index, setIndex] = React.useState<number>(0)
    const [data, setData] = React.useState<Form>(initData)

    const [errors, setErrors] = React.useState<Errors>({
        step1: {
            name: "",
            email: "",
            phone: ""
        },
        step2: "",
        step3: ""
    })
    const latestIndex = React.useRef(index);
    React.useEffect(() => {
        latestIndex.current = index;
    }, [index]);
    /* 
        why your need index dependency????
        index is state => reactive value
        usecallback will capture all reactive value when compoennt mount
        if you not re-render callback event when index change, index always = 0 (initdata)
        That how useCallback working!!!
        But why not add data, data is reactive value too????
        because when you using callback to set data, the param (data) get the data of the CURRENT re-render
        so (data) is always the newest data!!!
        And now, we need to remove index dependency, because all think in step will re-render if we change step
        index change => trigger dependency 
        => create new result of use callback => new handlechange => new prop => react.memo not working
    */
    const handleChange = React.useCallback((value: string | addOns, name: string) => {
        const currentStep = `step${latestIndex.current + 1}` as keyof Form
        setData((data: Form) => {
            const newData = { ...data };
            if (name == "addOns" && Array.isArray(newData[`step3`][name])) {
                const arr = [...newData[`step3`][name]] as addOns[];
                const addOn = value as addOns;
                const findIdx = arr.findIndex(el => el.name === addOn.name);
                if (findIdx !== -1) {
                    if (arr[findIdx].value === addOn.value) {
                        newData[`step3`][name] = arr.filter(el => el.name !== addOn.name);
                    } else {
                        newData[`step3`][name] = arr.map(el => {
                            return el.name === addOn.name ? { ...el, value: addOn.value } : el
                        });
                    }
                } else {
                    arr.push(addOn);
                    newData[`step3`][name] = arr;
                }
            } else {
                newData[currentStep][name] = value as string
            }
            return { ...newData }
        })
    }, [])
    const validate = () => {
        let result = true
        const currentStep = latestIndex.current + 1
        const currentData = data[`step${currentStep}` as keyof Form]
        Object.keys(currentData).forEach(key => {            
            if (validateRule[key]) {
                const error = validateRule[key](currentData[key])
                if (latestIndex.current != 0) {
                    if (!error) {
                        setErrors((errors) => ({ ...errors, [`step${currentStep}`]: "" }))
                        return;
                    }
                    console.log(1);
                    
                    result = false
                    setErrors((errors) => ({ ...errors, [`step${currentStep}`]: error }))
                } else {
                    if (!error) {
                        setErrors((errors) => ({
                            ...errors,
                            [`step${currentStep}`]: {
                                ...(errors[`step${currentStep}`] as {
                                    name: string;
                                    email: string;
                                    phone: string;
                                }),
                                [key]: ""
                            }
                        })); return;
                    }
                    result = false
                    setErrors((errors) => ({
                        ...errors,
                        [`step${currentStep}`]: {
                            ...(errors[`step${currentStep}`] as {
                                name: string;
                                email: string;
                                phone: string;
                            }),
                            [key]: error
                        }
                    }));
                }
            }
        })
        return result
    }
    const handleNext = () => {
        setIndex((index) => {
            if (validate()) {
                if ((index + 1) == numberOfStep) return index
                return index + 1
            }
            return index
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

            <div className="mt-20 flex justify-between font-medium text-base">
                {index != 0 && <button onClick={handleBack} className="text-[var(--cool-gray)]">Back</button>}
                <button onClick={handleNext} className={`text-white ml-auto px-6 py-4 bg-[var(--marine-blue)] rounded-lg hover:bg-[var(--marine-blue)]/50`}>Next Step</button>
            </div>
        </div>
    </div>
}
