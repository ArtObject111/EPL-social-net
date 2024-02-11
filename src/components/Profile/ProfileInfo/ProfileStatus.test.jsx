import React from "react";
import { create } from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {

    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"status is delivered from props"}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("status is delivered from props");
    });

    test("after creation span with status should be displayed", async () => {
        const component = create(<ProfileStatus status={"status is delivered from props"}/>);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation span with status shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"status is delivered from props"}/>);
        const root = component.root;
        expect(() => {
            let  input = root.findByType("input");
        }).toThrow();
    });
    test("after creation span with should contains correct status", async () => {
        const component = create(<ProfileStatus status={"status is delivered from props"}/>);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span.children[0]).toBe("status is delivered from props");
    });
    test("input should be displayed in editMode instead of span", async () => {
        const component = create(<ProfileStatus status={"status is delivered from props"}/>);
        const root = component.root;
        let span = await root.findByType("span");
        await span.props.onClick();
        let input = await root.findByType("input");
        expect(input.props.value).toBe("status is delivered from props");
    });
});
