import React from "react"
import {screen, render} from "@testing-library/react"

import {MyfgsAsyncDirectory} from "./myfgs-async-directory";

describe("MyfgsAsyncDirectory", () => {
    it("should render the component", () => {
        render(<MyfgsAsyncDirectory contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
