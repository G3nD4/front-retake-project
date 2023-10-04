"use client";

import { WishModel } from "@/app/models/models";
import { Paper, Divider, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { deleteItem, getAllItems } from "../../../app/wishList/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

type WishInfoProps = {
  params: { id: number };
};

export default function WishInfo({ params }: WishInfoProps) {
  const [wish, setWish] = useState<WishModel>();

  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    getAllItems().then((wishes) => {
      if (wishes) {
        setWish(wishes.find((wish) => wish.id == params.id) as WishModel);
      }
    });
  });

  function handleRemoveClick(id: number): void {
    deleteItem(id.toString());
    close();
    router.back();
  }

  return (
    wish && (
      <>
        <Head>
          <title>{wish.name}</title>
          <meta
            charSet="utf-8"
            name="description"
            content="Full information about your wish"
          />
        </Head>
        <Modal opened={opened} onClose={close} title="Confirmation">
          <div className="flex flex-col gap-10">
            <h1 className="text-md font-semibold">
              Are you sure you want to remove {wish.name} from your wishlist?
            </h1>
            <div className="flex w-full gap-10">
              {/* <Button
                className="grow"
                variant="outline"
                color="grey"
                onClick={close}
              >
                Cancel
              </Button> */}
              <button
                className="flex-row bg-red-500 rounded-md text-white font-semi bold px-4 py-1.5 ml-10 hover:bg-red-600  "
                onClick={() => close}
              >
                <a href="/wishList">Cancel</a>
              </button>
              <button
                className="flex-row bg-red-500 rounded-md text-white font-semi bold px-4 py-1.5 ml-10 hover:bg-red-600  "
                onClick={() => handleRemoveClick(wish.id)}
              >
                <a href="/wishList">Remove</a>
              </button>
              {/* <Button
                className="grow"
                variant="filled"
                color="red"
                onClick={() => handleRemoveClick(wish.id)}
              >
                Remove
              </Button> */}
            </div>
          </div>
        </Modal>
        <main className="w-full md:h-full flex flex-col items-center py-10 gap-10 bg-[#edf2f4]">
          <Paper
            shadow="xs"
            withBorder
            p="xl"
            key={wish?.id}
            className="w-[90%] md:w-1/3 transition-shadow"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">
                {wish.name}
                {wish.important && <span> 🔥</span>}
              </h1>
              {wish.description && <p>{wish.description}</p>}
              {wish.price && <p>{wish.price}$</p>}
              {wish.shopUrl && (
                <a href={wish.shopUrl} className="text-blue-500">
                  Link
                </a>
              )}
            </div>
            <Divider className="my-2 w-1/6"></Divider>
            <Button
              variant="filled"
              size="s"
              color="yellow"
              className="mt-2"
              onClick={open}
            >
              Remove
            </Button>
            <button className="flex-row bg-red-500 rounded-md text-white font-semi bold px-4 py-1.5 ml-10 hover:bg-red-600  ">
              <a href="/wishList">Back</a>
            </button>
          </Paper>
        </main>
      </>
    )
  );
}
