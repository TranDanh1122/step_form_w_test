import React from "react";
import endIcon from "../assets/images/icon-thank-you.svg"
export default function End(): React.JSX.Element {
    return <>
        <div className="flex flex-col gap-6 items-center justify-center h-full">
            <img src={endIcon} className="w-20 h-20 object-cover mx-auto" />
            <h1 className="font-bold text-[2rem] text-[var(--marine-blue)] text-center">Thank you!</h1>
            <p className="text-base leading-6 text-[var(--cool-gray)] text-center">
                Thanks for confirming your subscription! We hope you have fun using our platform.
                If you ever need support, please feel free to email us at trandanh14042000@gmail.com.
            </p>
        </div>
    </>
}