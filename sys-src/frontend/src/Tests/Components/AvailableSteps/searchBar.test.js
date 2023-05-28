import React from 'react'
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchBar from '../../../Components/AvailableSteps/searchBar';

describe("searchBar.js tests", () => {

  test("searchBar should be visible", () => {
    const searchBar = render(<SearchBar />);
    const textField = searchBar.container.getElementsByClassName("SearchBar-TextField")
    expect(textField).toBeInTheDocument
  });

});