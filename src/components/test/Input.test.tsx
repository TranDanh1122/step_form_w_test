import { describe, it, expect, vi } from "vitest";
import Input from '../Input';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

describe("Input Component", () => {
    const mockChange = vi.fn()
    const mockProps = (props = {}) => ({
        name: "inputTest",
        placeHolder: "placeHolderTest",
        onChange: mockChange,
        value: "",
        type: "text",
        ...props
    })
    describe("render", () => {
        it("basic render", () => {
            const props = mockProps({ label: "Test Label" })
            render(<Input {...props} />)
            const input = screen.getByLabelText("Test Label")
            expect(input).toBeInTheDocument()
        })
        it("user focus", async () => {
            const props = mockProps({ label: "Test Label" })
            render(<Input {...props} />)
            const input = screen.getByLabelText("Test Label")
            expect(input).toBeInTheDocument()
            fireEvent.focus(input)
            expect(input).toHaveClass("focus:border-[var(--purplish-blue)]")
        })
        it("have error", () => {
            const props = mockProps({ label: "Test Label", error: "Invalid value" })
            render(<Input {...props} />)
            const input = screen.getByLabelText("Test Label")
            const errorText = screen.getByText("Invalid value")
            expect(input).toBeInTheDocument()
            expect(input).toHaveClass("border-[var(--strawberry-red)]")
            expect(errorText).toBeInTheDocument()
            expect(errorText).toHaveClass("text-[var(--strawberry-red)]")
        })
    })
    describe("user action", () => {
        it("handle change text", async () => {
            const props = mockProps({ label: "Test Label" })
            render(<Input {...props} />)
            const input = screen.getByLabelText("Test Label") as HTMLInputElement
            await fireEvent.change(input, { target: { value: "10" } })
            expect(mockChange).toHaveBeenCalledTimes(1)
            expect(mockChange).toHaveBeenCalledWith("10", "inputTest")
        })
        it("handle change wrong email", async () => {
            const props = mockProps({ label: "Test Label", type: "email" })
            render(<Input {...props} />)
            const input = screen.getByLabelText("Test Label") as HTMLInputElement
            await fireEvent.change(input, { target: { value: "10" } })
            expect(mockChange).toHaveBeenCalledTimes(1)
            expect(mockChange).toHaveBeenCalledWith("10", "inputTest")
        })
    })
})