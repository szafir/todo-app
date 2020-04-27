import App from "./App";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { TODOS } from "./queries";
import { MockedProvider } from "@apollo/react-testing";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const mocks = [
    {
        request: {
            query: TODOS,
            variables: {
                page: 0,
            },
        },
        result: {
            data: {
                todos: {
                    data: [],
                    count: 0,
                },
            },
        },
    },
];

it("renders without error", () => {
    const wrapper = mount(
        <MemoryRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
                <App />
            </MockedProvider>
        </MemoryRouter>
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find("table").text()).toEqual("No items");
});
