"use client";

import {
  Button,
  Paper,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { Wish } from "../models/models";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { Footer, NavBar } from "../page";
import { addItem, getAllItems } from "./firebase";

export default function Wishlist() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [isRendered, setAsRendered] = useState(false);

  useEffect(() => {
    if (wishes.length === 0) {
      getAllItems().then((wishes) => {
        if (!isRendered) {
          setAsRendered(true);
          setWishes(wishes);
        }
      });
    }
  });

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: undefined,
      shopUrl: "",
      important: false,
    },
    validate: {
      price: (value) => {
        return (
          value && ((value as number) < 0 ? "Price cannot be negative" : null)
        );
      },
    },
  });

  const router = useRouter();

  const handleNewWishClick = () => {
    open();
  };

  const handleSubmitClick = (newWish: Wish) => {
    addItem(newWish);

    setWishes([...(wishes as Wish[]), newWish]);
    close();
    form.reset();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Wish">
        <form
          className="flex flex-col gap-5"
          onSubmit={form.onSubmit((values) =>
            handleSubmitClick({
              ...values,
              id: (wishes as Wish[]).length + 1,
            } as Wish)
          )}
        >
          <TextInput
            label="Name"
            placeholder="Name"
            required
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Input placeholder"
            {...form.getInputProps("description")}
          />
          <NumberInput
            label="Price"
            placeholder="Price"
            prefix="$"
            mb="md"
            {...form.getInputProps("price")}
          />
          <TextInput
            label="Link"
            placeholder="Link"
            {...form.getInputProps("shopUrl")}
          />
          <Checkbox
            label="Imprortant"
            description="Adds special icon to important wishes"
            {...form.getInputProps("important", { type: "checkbox" })}
          />
          {/* <Button type="submit" variant="filled" color="blue">
            Submit
          </Button> */}
          <button
            className="flex-row bg-blue-500 rounded-md text-white font-semi bold px-4 py-1.5 ml-10 hover:bg-red-600  "
            onClick={() => handleSubmitClick}
          >
            Submit
          </button>
        </form>
      </Modal>
      <main className="w-full h-full flex flex-col items-center py-10 gap-10 bg-[#ffffff]">
        <NavBar />
        <h1 className="text-3xl font-semibold">Current Wishes</h1>
        <button
          className="flex-row bg-blue-500 rounded-md text-white font-semi bold px-4 py-1.5 ml-10 hover:bg-red-600  "
          onClick={handleNewWishClick}
        >
          New Wish
        </button>
        {/* <Button
          className="shrink-0"
          variant="filled"
          size="md"
          onClick={handleNewWishClick}
        >
          New Wish
        </Button> */}
        {(wishes as Wish[]).map((wish) => (
          <Paper
            shadow="xs"
            withBorder
            p="xl"
            key={wish.id}
            className="w-[90%] md:w-1/3 hover:shadow-lg transition-shadow"
            onClick={() => {
              console.log(wish.id);
              router.push(`/wishList/${wish.id}`);
            }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">
                {wish.name}
                {wish.important && <span> 🔥</span>}
              </h1>
              {wish.price && <p>{wish.price}$</p>}
            </div>
          </Paper>
        ))}
        <Footer />
      </main>
    </>
  );
}
