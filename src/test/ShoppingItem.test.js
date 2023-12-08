import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingItem, { AddShoppingCartItem } from "../components/ShoppingItem";

const mockItem = {
  _id: "123",
  content: "Apple",
  count: 3,
  state: "UNCHECKED",
};

describe("ShoppingCartItem", () => {
  test("renders item content", () => {
    render(<ShoppingItem item={mockItem} />);
    const contentElement = screen.getByDisplayValue("Apple");
    expect(contentElement).toBeInTheDocument();
  });

  test("renders item count", () => {
    render(<ShoppingItem item={mockItem} />);
    const countElement = screen.getByDisplayValue("3");
    expect(countElement).toBeInTheDocument();
  });
});

const mockAddItem = jest.fn();

describe("AddShoppingCartItem", () => {
  test("renders input fields and button", () => {
    render(<AddShoppingCartItem onAddItem={mockAddItem} />);

    const checkbox = screen.getByRole("checkbox");
    const input = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");
    const addButton = screen.getByRole("button", { name: "Add" });

    expect(checkbox).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("calls onAddItem when 'Add' button is clicked", () => {
    render(<AddShoppingCartItem onAddItem={mockAddItem} />);

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(mockAddItem).toHaveBeenCalledWith({
      content: "",
      count: 1,
      state: "UNCHECKED",
    });
  });

  test("updates state when input fields are changed", () => {
    render(<AddShoppingCartItem onAddItem={mockAddItem} />);

    const checkbox = screen.getByRole("checkbox");
    const input = screen.getByRole("textbox");
    const numberInput = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "New Item" } });
    fireEvent.click(checkbox);
    fireEvent.change(numberInput, { target: { value: "5" } });

    expect(input).toHaveValue("New Item");
    expect(checkbox).toBeChecked();
    expect(numberInput).toHaveValue("5");
  });
});
