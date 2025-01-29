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
    const ref = React.useRef({
        footer: React.createRef<HTMLDivElement>(),
        form: React.createRef<HTMLDivElement>(),
        footerDesk: React.createRef<HTMLDivElement>(),
    })
    React.useEffect(() => {
        if (ref.current && ref.current.footer.current && ref.current.form.current) {
            const footerHeight = (ref.current.footer.current as HTMLDivElement).getBoundingClientRect().height
            ref.current.form.current.style.marginBottom = `${footerHeight}px`
        }
    }, [index])
    React.useEffect(() => {
        const handleReSize = () => {
            if (ref.current && ref.current.footer.current && ref.current.footerDesk.current) {
                if (window.innerWidth > 1023) {
                    ref.current.footer.current.style.display = "none"
                    ref.current.footerDesk.current.style.display = "block"
                } else {
                    ref.current.footer.current.style.display = "block"
                    ref.current.footerDesk.current.style.display = "none"
                }
            }
        }
        window.addEventListener("resize" , handleReSize)
        return () => window.removeEventListener("resize" , handleReSize)
    } , [])
    return <div ref={ref.current.form} className="flex mb:bg-[var(--light-blue)] mb:flex-col justify-start items-stretch p-6 mb:p-0 w-3/4 mb:w-full bg-white rounded-2xl mb:rounded-none min-h-[600px] shadow-lg mb:shadow-none">
        <div className={`w-1/3 mb:w-full mb:h-[30vh]  rounded-[10px] bg-[url(/src/assets/images/bg-sidebar-desktop.svg)] mb:bg-[url(/src/assets/images/bg-sidebar-mobile.svg)] bg-cover bg-center p-8 mb:p-2 flex flex-col mb:flex-row mb:gap-2 mb:justify-evenly gap-8`} >
            {
                stepTitles.map((step, idx) => <Step index={idx + 1} title={step.title} selected={index == idx} />)
            }
        </div>
        <div className="w-2/3 mb:w-[90%] mb:mx-auto mb:bg-white px-24 pt-14 pb-8 mb:relative mb:translate-y-[-15%] mb:rounded-lg mb:px-6 mb:py-8">
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
                <div ref={ref.current.footerDesk} className="mt-20  flex justify-between font-medium text-base mb:hidden">
                    {index != 0 && <button onClick={handleBack} className="text-[var(--cool-gray)]">Go Back</button>}
                    <button onClick={handleNext} className={`${index != 3 ? "bg-[var(--marine-blue)] " : "bg-[var(--purplish-blue)] "} text-white ml-auto block px-6 py-4 rounded-lg hover:bg-[var(--marine-blue)]/50 `}>{index != 3 ? "Next Step" : "Confirm"} </button>
                </div>
            }
        </div>
        {!end && 
            <div ref={ref.current.footer} className="hidden mb:flex items-center  px-2 py-4 justify-between font-medium w-full text-base fixed bottom-0 left-0 bg-white">
                {index != 0 && <button onClick={handleBack} className="text-[var(--cool-gray)]">Go Back</button>}
                <button onClick={handleNext} className={`${index != 3 ? "bg-[var(--marine-blue)] " : "bg-[var(--purplish-blue)] "} block ml-auto text-[0.875rem] text-white px-4 py-2 rounded-lg hover:bg-[var(--marine-blue)]/50 `}>{index != 3 ? "Next Step" : "Confirm"} </button>
            </div>
        }
    </div>
}
