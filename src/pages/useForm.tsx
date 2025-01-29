import React from "react"
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
    const [end, setEnd] = React.useState<boolean>(false)
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
    React.useEffect(() => {
        data.step3.addOns.forEach(addOn => {
            let value = "0"
            switch (addOn.name) {
                case "Online service":
                    value = data.step2.duration == "monthly" ? "1" : "10"
                    break;
                case "Larger storage":
                    value = data.step2.duration == "monthly" ? "2" : "20"
                    break;
                case "Customizable profile":
                    value = data.step2.duration == "monthly" ? "2" : "20"
                    break;
            }
            handleChange({ name: addOn.name, value: value }, "addOns")
        });
    }, [data.step2.duration])
    React.useEffect(() => {
        switch (data.step2.plan) {
            case "arcade":
                handleChange(data.step2.duration == "monthly" ? "9" : "90", "value")
                break;
            case "advantaged":
                handleChange(data.step2.duration == "monthly" ? "12" : "120", "value")
                break;
            case "pro":
                handleChange(data.step2.duration == "monthly" ? "15" : " 150", "value")
                break;
        }
    }, [data.step2.duration])
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
            if ((index + 1) === numberOfStep) {
                setEnd(true)
                return index
            }
            if (validate()) {

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
    return { index, data, errors, handleChange, handleNext, handleBack, setIndex, end }
}