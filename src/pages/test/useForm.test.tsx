import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useForm } from "../useForm";
import { act } from "react";
describe("Use form hook", () => {
    let initData: Form;

    beforeEach(() => {
        initData = {
            step1: {
                name: "",
                email: "",
                phone: ""
            },
            step2: {
                plan: "advantaged",
                value: "120",
                duration: "yearly",
            },
            step3: {
                addOns: [

                ],
            }
        }
    })

    it("init", () => {
        const { result } = renderHook(() => useForm(initData, 4))
        expect(result.current.data).toEqual(initData)
    })
    describe("validate", () => {
        it("invalid name", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.handleChange("", "name")
                result.current.handleNext()
            })

            expect(result.current.errors.step1.name).toEqual("Name is required")
        })

        it("invalid email", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.handleChange("trandanh", "email")
            })
            act(() => {
                result.current.handleNext()
            })

            expect(result.current.errors.step1.email).toEqual("Email is not valid")

        })
        it("invalid phone", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.handleChange("trandanh", "phone")
            })
            act(() => {
                result.current.handleNext()
            })
            expect(result.current.errors.step1.phone).toEqual("Phone is not valid")

        })
    })
    describe("handle Change", () => {
        it("name change", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.handleChange("trandanh", "name")
            })
            expect(result.current.data.step1.name).toEqual("trandanh")
        })
        it("plan change", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(1)
            })
            act(() => {
                result.current.handleChange("arcade", "plan")
                result.current.handleChange("9", "value")
            })
            expect(result.current.data.step2.plan).toEqual("arcade")
            expect(result.current.data.step2.value).toEqual("9")
        })
        it("duration change", async () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(1)
            })
            act(() => {
                result.current.handleChange({ name: "Larger storage", value: "20" }, "addOns")
            })
            act(() => {
                result.current.handleChange("monthly", "duration")
            })
            expect(result.current.data.step2.duration).toEqual("monthly")
            await waitFor(() => {
                expect(result.current.data.step3.addOns).toStrictEqual([{ name: "Larger storage", value: "2" }])
                expect(result.current.data.step2.value).toEqual("12")
            })

        })
        it("add addOns", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(2)
            })
            act(() => {
                result.current.handleChange({ name: "Larger storage", value: "20" }, "addOns")
            })
            expect(result.current.data.step3.addOns).toStrictEqual([{ name: "Larger storage", value: "20" }])
        })
        it("re-select addOns", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(1)
            })
            act(() => {
                result.current.handleChange({ name: "Customizable profile", value: "20" }, "addOns")
            })
            act(() => {
                result.current.handleChange({ name: "Customizable profile", value: "20" }, "addOns")
            })
            expect(result.current.data.step3.addOns).toStrictEqual([])
        })
        it("back", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(1)
            })
            act(() => {
                result.current.handleBack()
            })
            expect(result.current.index).toEqual(0)
        })
        it("first back", () => {
            const { result } = renderHook(() => useForm(initData, 4))
            act(() => {
                result.current.setIndex(0)
            })
            act(() => {
                result.current.handleBack()
            })
            expect(result.current.index).toEqual(0)
        })
    })
})