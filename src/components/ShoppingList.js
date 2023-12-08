import ShoppingItem, { AddShoppingCartItem } from "./ShoppingItem";
import { useState } from "react";

function ShoppingList({
  shoppingItems,
  onEditItem,
  onDeleteItem,
  onAddedItem,
}) {
  const [editingItemIndex, setEditingItemIndex] = useState();
  function handleEditItem(editedItem) {
    onEditItem(editedItem);
  }

  function handleDeleteItem(itemId) {
    onDeleteItem(itemId);
  }

  function handleAddItem(addedItem) {
    onAddedItem(addedItem);
  }

  const handleCancelEditItem = () => {
    setEditingItemIndex(null);
  };

  return (
    <ul style={{ margin: "5px" }}>
      {shoppingItems.map((item) => (
        <ShoppingItem
          key={item._id}
          item={item}
          isEditing={editingItemIndex === item._id}
          onEdit={(editedItem) => handleEditItem(editedItem)}
          onDelete={(itemId) => handleDeleteItem(itemId)}
          onIsEditing={() => setEditingItemIndex(item._id)}
          onCancelEdit={handleCancelEditItem}
        ></ShoppingItem>
      ))}
      <AddShoppingCartItem
        onAddItem={(addedItem) => handleAddItem(addedItem)}
      ></AddShoppingCartItem>
    </ul>
  );
}

export default ShoppingList;
