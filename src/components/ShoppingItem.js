import { useState } from "react";

import {
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Show,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

function ShoppingItem({
  item,
  isEditing,
  onEdit,
  onDelete,
  onIsEditing,
  onCancelEdit,
}) {
  const [content, setContent] = useState(item.content);
  const [count, setCount] = useState(item.count);
  const [state, setState] = useState(item.state);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleSaveEdit = () => {
    onEdit({ id: item._id, content: content, count: count, state: state });
    onCancelEdit();
  };

  const handleDelete = () => {
    onDelete(item._id);
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleCancelEdit = () => {
    setContent(item.content);
    setCount(item.count);
    setState(item.state);
    onCancelEdit();
  };
  return (
    <Grid
      display={{ base: "flex", sm: "grid" }}
      flexDirection={"column"}
      templateColumns={"auto 10fr 2fr"}
      as={"li"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GridItem padding={"0 1vw"}>
        <Checkbox
          type={"checkbox"}
          isChecked={state === "CHECKED"}
          onChange={(e) => setState(e.target.checked ? "CHECKED" : "UNCHECKED")}
          readOnly={!isEditing}
          size={"lg"}
          height={"100%"}
        />
      </GridItem>
      <GridItem>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          readOnly={!isEditing}
          variant={isEditing ? "filled" : "outline"}
        />
      </GridItem>
      <GridItem minWidth={"10rem"}>
        <Flex>
          <NumberInput
            flex={1}
            value={count}
            onChange={(value) => setCount(value)}
            readOnly={!isEditing}
            min={1}
            variant={isEditing ? "filled" : "outline"}
          >
            <NumberInputField />
            {isEditing && (
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            )}
          </NumberInput>
          <Flex display={isMouseOver || isEditing ? "flex" : "none"}>
            {isEditing && (
              <IconButton
                variant={"outline"}
                icon={<CheckIcon />}
                flex={"auto"}
                colorScheme={"green"}
                onClick={handleSaveEdit}
                isDisabled={content.length < 1}
              >
                Save
              </IconButton>
            )}
            {!isEditing && (
              <IconButton
                icon={<EditIcon />}
                flex={"auto"}
                onClick={onIsEditing}
              >
                Edit
              </IconButton>
            )}
            {isEditing && (
              <IconButton
                variant={"outline"}
                flex={"auto"}
                icon={<CloseIcon />}
                colorScheme={"red"}
                onClick={handleCancelEdit}
              >
                Cancel
              </IconButton>
            )}
            {!isEditing && (
              <IconButton
                flex={"auto"}
                icon={<DeleteIcon />}
                colorScheme={"red"}
                onClick={handleDelete}
              />
            )}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export function AddShoppingCartItem({ onAddItem }) {
  const [content, setContent] = useState("");
  const [count, setCount] = useState(1);
  const [state, setState] = useState("UNCHECKED");

  function handleAdd() {
    onAddItem({ content: content, count: count, state: state });
  }

  return (
    <Grid
      display={{ base: "flex", sm: "grid" }}
      flexDirection={"column"}
      templateColumns={"auto 10fr 2fr"}
      as={"li"}
    >
      <GridItem padding={"0 1vw"}>
        <Checkbox
          onChange={(e) => setState(e.target.checked ? "CHECKED" : "UNCHECKED")}
          size={"lg"}
          height={"100%"}
          minLength={1}
        />
      </GridItem>
      <GridItem>
        <Input
          placeholder={"Zadejte název položky"}
          onChange={(e) => setContent(e.target.value)}
        />
      </GridItem>
      <GridItem minWidth={"10rem"}>
        <Flex>
          <NumberInput
            flex={1}
            onChange={(value) => setCount(value)}
            defaultValue={1}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme={"green"}
            leftIcon={<AddIcon />}
            onClick={handleAdd}
            isDisabled={content.length < 1}
          >
            <Show above={"sm"}>Přidat</Show>
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
export default ShoppingItem;
