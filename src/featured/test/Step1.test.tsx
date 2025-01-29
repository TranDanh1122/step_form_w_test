import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Step1 from "../Step1";

describe("Step 1 component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        onChange: mockChange,
        data: {
            step1: {
                name: "testname",
                email: "trandanh14042000@gmail.com",
                phone: "0815552945"
            }
        },
        error: {
            step1: {
                name: "",
                email: "",
                phone: ""
            }
        },
        ...props
    })
    describe("render", () => {
        it("basic render", () => {
            const props = mockProps()
            render(<Step1 {...props} />)
            const name = screen.getByLabelText("Name")
            const email = screen.getByLabelText("Email Address")
            const phone = screen.getByLabelText("Phone Number")
            expect(name).toBeInTheDocument()
            expect(email).toBeInTheDocument()
            expect(phone).toBeInTheDocument()
        })
        it("basic value", () => {
            const props = mockProps()
            render(<Step1 {...props} />)
            expect(screen.getByLabelText("Name")).toHaveValue("testname")
            expect(screen.getByLabelText("Email Address")).toHaveValue("trandanh14042000@gmail.com")
            expect(screen.getByLabelText("Phone Number")).toHaveValue("0815552945")
        })
        it("error", () => {
            const props = mockProps({
                error: {
                    step1: {
                        name: "Name is required",
                        email: "Email is not valid",
                        phone: "Phone is not valid"
                    }
                }
            })
            render(<Step1 {...props} />)
            expect(screen.getByText("Name is required")).toBeInTheDocument()
            expect(screen.getByText("Email is not valid")).toBeInTheDocument()
            expect(screen.getByText("Phone is not valid")).toBeInTheDocument()
        })
    })
    describe("action", () => {
        it("change input", () => {
            const props = mockProps()
            render(<Step1 {...props} />)
            const name = screen.getByLabelText("Name")
            fireEvent.change(name, { target: { value: "Danh" } })
            expect(mockChange).toHaveBeenCalledOnce()
            expect(mockChange).toBeCalledWith("Danh", "name")
        })
    })
})