import React from "react";
import Box from "./Box";
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'

const testBox = <Box
    id="1"
    width="10"
    height="5"
    backgroundColor="green"
    remove={function (id: string) { return id }}
/>

describe("Box", function () {

    test("renders without crashing", function () {
        render(testBox)
    })

    test("has the proper style", function () {
        const { container } = render(testBox);
        const box = container.querySelector(".Box-box")
        console.log(box);
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
})