import React from "react";
import BoxList from "./BoxList";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("add box", function () {
    let container;
    let heightInput;
    let widthInput;
    let backgroundColorInput;
    
    beforeEach(() => {
        let c = render(<BoxList />);
        container = c.container;
        
        heightInput = container.querySelector('[name=height]');
        widthInput = container.querySelector('[name=width]');
        backgroundColorInput = container.querySelector('[name=backgroundColor]');

        fireEvent.change(heightInput!, {target:{value: "10"}});
        fireEvent.change(widthInput!, {target:{value: "10"}});
        fireEvent.change(backgroundColorInput!, {target:{value: "black"}});
    }) 
    
    test("should add new box", function () {
        expect(container.querySelector(".Box")).not.toBeInTheDocument();

        const addBtn = container.querySelector(".NewBoxForm-addBtn");
        fireEvent.click(addBtn!);

        expect(container.querySelector(".Box")).toBeInTheDocument();
    });

    test("should delete box", function () {
        expect(container.querySelector(".Box")).not.toBeInTheDocument();
        
        const addBtn = container.querySelector(".NewBoxForm-addBtn");
        fireEvent.click(addBtn!);
        
        expect(container.querySelector(".Box")).toBeInTheDocument();
        
        const removeBtn = container.querySelector(".Box-removeBtn");
        fireEvent.click(removeBtn!);
        expect(container.querySelector(".Box")).not.toBeInTheDocument();
    });

    test("matches snapshot after deleting box", function() {
        expect(container).toMatchSnapshot();
    });
})