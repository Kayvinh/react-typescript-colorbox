import React from "react";
import Box from "./Box";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';

const testFunc = jest.fn();
const testBox = <Box
    id="1"
    width="10"
    height="5"
    backgroundColor="green"
    remove={testFunc}
/>

describe("Box", function () {

    test("renders without crashing", function () {
        render(testBox)
    })

    test("has the proper style", function () {
        const { container } = render(testBox);
        const box = container.querySelector(".Box-box")
        expect(box).toBeInTheDocument();
        expect(box).toHaveStyle({
            'background-color': 'green',
            height: '5em',
            width: '10em',
        })
    })

    test("matches snapshot", function() {
        const {container} = render(testBox);

        expect(container).toMatchSnapshot();
    })

    test("calls function when button is clicked", function () {
        const {container} = render(testBox);
        const btn = container.querySelector(".Box-removeBtn");
        fireEvent.click(btn!);
        expect(testFunc).toHaveBeenCalled();
    })
})