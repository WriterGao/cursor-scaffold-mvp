import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home (Todo page)", () => {
  it("renders title and empty state", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /待办列表/ })).toBeInTheDocument();
    expect(
      screen.getByText(/还没有待办，先添加一条吧/),
    ).toBeInTheDocument();
  });

  it("adds a todo item from input", () => {
    render(<Home />);

    const input = screen.getByLabelText("待办输入框");
    const addButton = screen.getByRole("button", { name: "添加" });

    fireEvent.change(input, { target: { value: "写周报" } });
    fireEvent.click(addButton);

    expect(screen.queryByText(/还没有待办/)).not.toBeInTheDocument();
    expect(screen.getByText("写周报")).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("toggles todo completed state", () => {
    render(<Home />);

    const input = screen.getByLabelText("待办输入框");
    const addButton = screen.getByRole("button", { name: "添加" });

    fireEvent.change(input, { target: { value: "写周报" } });
    fireEvent.click(addButton);

    const todoText = screen.getByText("写周报");
    const toggleButton = screen.getByLabelText("标记为已完成");

    // 标记为已完成
    fireEvent.click(toggleButton);
    expect(todoText).toHaveClass("line-through");

    // 再次点击变为未完成
    const toggleBackButton = screen.getByLabelText("标记为未完成");
    fireEvent.click(toggleBackButton);
    expect(todoText).not.toHaveClass("line-through");
  });

  it("removes todo item", () => {
    render(<Home />);

    const input = screen.getByLabelText("待办输入框");
    const addButton = screen.getByRole("button", { name: "添加" });

    fireEvent.change(input, { target: { value: "写周报" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText("删除待办");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("写周报")).not.toBeInTheDocument();
    expect(
      screen.getByText(/还没有待办，先添加一条吧/),
    ).toBeInTheDocument();
  });
});
