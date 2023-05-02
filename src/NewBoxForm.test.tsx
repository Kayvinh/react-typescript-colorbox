import React from "react";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import NewBoxForm from "./NewBoxForm";

const createBox = jest.fn();

describe("NewBoxForm", function () {
    let container, widthInput, heightInput, backgroundColorInput, addBtn;

    beforeEach(() => {
        let c = render(<NewBoxForm createBox={createBox} />)
        container = c.container;
        heightInput = container.querySelector('[name=height]');
        widthInput = container.querySelector('[name=width]');
        backgroundColorInput = container.querySelector('[name=backgroundColor]');
        addBtn = container.querySelector(".NewBoxForm-addBtn");
    })

    test("renders without crashing", function () {
        render(<NewBoxForm createBox={createBox} />)
    })

    test("updates state as inputs change", function () {

        expect(heightInput.value).toEqual("");
        fireEvent.change(heightInput!, { target: { value: "10" } });
        expect(heightInput.value).toEqual("10");
    })

    test("clears form on submit", function () {
        expect(heightInput.value).toEqual("");
        expect(widthInput.value).toEqual("");
        expect(backgroundColorInput.value).toEqual("")

        fireEvent.change(heightInput!, { target: { value: "10" } });
        fireEvent.change(widthInput!, { target: { value: "10" } });
        fireEvent.change(backgroundColorInput!, { target: { value: "green" } });

        expect(heightInput.value).toEqual("10");
        expect(widthInput.value).toEqual("10");
        expect(backgroundColorInput.value).toEqual("green")

        fireEvent.click(addBtn);

        expect(heightInput.value).toEqual("");
        expect(widthInput.value).toEqual("");
        expect(backgroundColorInput.value).toEqual("")

    })

    test("calls function", function () {
        fireEvent.click(addBtn);
        expect(createBox).toHaveBeenCalled();
    })

    test("matches snapshot", function () {
        expect(container).toMatchSnapshot();
    })
})