import React from "react";
import renderer from "react-test-renderer";
import Searcher from "./searcher.js";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow} from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe("Searcher", ()=>{

    it('Default value is set when initialValue prop is created', () => {
        const searchComponent = renderer.create(<Searcher initialValue={"hello"} />);

        let tree = searchComponent.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('State value changes onChange', () => {
        const searchComponent = shallow(<Searcher initialValue={""} />);

        // Invoke on change.
        const event = {
            preventDefault() {},
            target: { value: 'hello', name: "searchQuery"}
        };
        searchComponent.find('input').simulate('change', event);

        expect(searchComponent.state().searchQuery).toEqual("hello");

    });

    it('Should call function on enter', ()=>{
        const onEnterMock = jest.fn();
        const searchComponent = shallow(<Searcher initialValue={""} onEnter={onEnterMock} />);
        const event = {
            preventDefault() {},
            target: { value: '', name: "searchQuery"},
            keyCode: 13
        };
        searchComponent.find('input').simulate('keyup', event);
        expect(onEnterMock).toBeCalledWith({"searchQuery": ""});
    })
});


