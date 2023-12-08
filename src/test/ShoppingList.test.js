import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList";

const mockItems = [
  {
    _id: "1",
    content: "Apple",
    count: 3,
    state: "UNCHECKED",
  },
  {
    _id: "2",
    content: "Banana",
    count: 5,
    state: "UNCHECKED",
  },
];

const mockEditItem = jest.fn();
const mockDeleteItem = jest.fn();
const mockAddItem = jest.fn();

describe("ShoppingList", () => {
  test("renders shopping list items", () => {
    render(
      <ShoppingList
        shoppingItems={mockItems}
        onEditItem={mockEditItem}
        onDeleteItem={mockDeleteItem}
        onAddedItem={mockAddItem}
      />,
    );

    const appleItem = screen.getByDisplayValue("Apple");
    const bananaItem = screen.getByDisplayValue("Banana");

    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
  });
});
