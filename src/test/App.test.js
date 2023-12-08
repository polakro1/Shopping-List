import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders heading", () => {
  render(<App />);
  const linkElement = screen.getByText(/Nákupní seznam/i);
  expect(linkElement).toBeInTheDocument();
});
