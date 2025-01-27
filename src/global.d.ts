declare global {
    interface DynamicKey {
        [key: string]: object
    }
    interface addOns {
        name: string, value: string
    }
    interface Form {
        step1: {
            name: string,
            email: string,
            phone: string
            [key: string]: string
        },
        step2: {
            plan: string,
            value: string,
            duration: string,
            [key: string]: string
        },
        step3: {
            addOns: addOns[],
            [key: string]: addOns[]
        }
    }
    interface PickerProps {
        onChange: (value: string, name: string) => void,
        name: string,
        icon: string,
        monthValue: string,
        yearValue: string,
        selected: boolean,
        duration: string
    }
}
export { }