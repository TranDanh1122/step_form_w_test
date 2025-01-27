declare global {
    interface DynamicKey {
        [key: string]: object
    }
    interface Form {
        step1: {
            name: string,
            email: string,
            phone: string
            [key:string] : string
        },
        // step2 : {

        // }
    }
}
export { }