import "./App.css";
import ShoppingList from "./components/ShoppingList";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  ChakraProvider,
  Divider,
  FormErrorIcon,
  Heading,
  Spinner,
} from "@chakra-ui/react";

function App() {
  const [items, setItems] = useState([]);
  const {
    loading,
    error,
    data: fetchedItems = [],
    put,
    del,
    post,
  } = useFetch(`http://localhost:9000/shoppingItem`, {});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/shoppingItem/list");
      const result = await response.json();
      setItems(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleUpdateItem = async (editedItem) => {
    try {
      const updateItem = await put("/update", editedItem);

      setItems(
        items.map((item) => (item._id === updateItem._id ? updateItem : item)),
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const deletedItemId = await del(`/delete?id=${itemId}`);

      setItems(items.filter((item) => itemId !== item._id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddItem = async (addedItem) => {
    try {
      const createdItem = await post("/create", addedItem);

      setItems([...items, createdItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <Alert>
        <FormErrorIcon></FormErrorIcon>
        <AlertTitle>Nastala chyba.</AlertTitle>
        <AlertDescription>
          Nastala chyba při komunikaci se serverem.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ChakraProvider>
      <Heading as={"h1"} size={"3xl"} mb={5} textAlign={"center"}>
        Nákupní seznam
      </Heading>
      <ShoppingList
        shoppingItems={items}
        onEditItem={(editItem) => handleUpdateItem(editItem)}
        onDeleteItem={(itemId) => handleDeleteItem(itemId)}
        onAddedItem={(addedItem) => handleAddItem(addedItem)}
      ></ShoppingList>
    </ChakraProvider>
  );
}

export default App;
