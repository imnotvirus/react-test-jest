import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {

  const initalParams = ['luiz', 'maria', 'joao'];
  it("should render list items", () => {
    const { getByText } = render(<List items={initalParams} />);
    expect(getByText("luiz")).toBeInTheDocument();
    expect(getByText("maria")).toBeInTheDocument();
    expect(getByText("joao")).toBeInTheDocument();
  });

  it("should add new item", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(<List items={initalParams} />);

    const input = getByPlaceholderText("new item");

    const button = getByText("Add Item");

    await userEvent.type(input, "new item");

    await userEvent.click(button);

    expect(await findByText("new item")).toBeInTheDocument();
  });

  it("should remove item", async () => {
    const { getByText,queryByText, findByLabelText, getByPlaceholderText } = render(<List items={initalParams} />);

    const nameItem = `${Math.random()}`;

    const input = getByPlaceholderText("new item");

    const button = getByText("Add Item");

    await userEvent.type(input, nameItem);

    await userEvent.click(button);
    const deleteButton = await findByLabelText(`remover ${nameItem}`);

    await userEvent.click(deleteButton);

    // await waitForElementToBeRemoved(() => {
    //   return getByText(nameItem);
    // });
    await waitFor(()=>{
        expect(queryByText(nameItem)).not.toBeInTheDocument();
    })
  });
});
