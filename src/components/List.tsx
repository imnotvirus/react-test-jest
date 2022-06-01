import { useState } from "react";

interface ListProps {
    items: string[];
}

const List: React.FC<ListProps> = ({items}) => {
  const [list, setList] = useState(items);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    setTimeout(() => {
      setList([...list, newItem]);
      setNewItem("");
    }, 500);
  };

  const removeFromList = (name: string) => {
    setTimeout(() => {
      setList(list.filter((item) => item !== name));
    }, 500);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button aria-label={`remover ${item}`} onClick={() => removeFromList(item)}>remove</button>
          </li>
        ))}
        <br />
        <input
          type="text"
          placeholder="new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </ul>
    </div>
  );
};

export default List;
