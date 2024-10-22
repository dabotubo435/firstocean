"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormFieldError, FormMessage, FormStatus } from "@/context/form";
import { LoaderCircleIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { createProduct } from "./actions";

export default function CreateProduct() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const [imageError, setImageError] = useState(false);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError(false);
    const imageString = URL.createObjectURL(file);
    setImage(imageString);
  };

  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Create Product</h2>
        </div>

        <div className="border-t mt-10">
          <div className="pt-6 grid sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6 gap-4 max-w-3xl">
            <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 flex justify-center">
              <div className="flex gap-1 items-start">
                {image ? (
                  <Image
                    src={image}
                    alt="Image"
                    width={160}
                    height={160}
                    className="rounded-md"
                  />
                ) : (
                  <div
                    onClick={() => imageRef.current?.click()}
                    data-error={imageError}
                    className="border-2 data-[error=true]:border-red-400 border-dashed cursor-pointer bg-gray-50 size-40 rounded-md flex items-center justify-center"
                  >
                    <p className="text-xs text-gray-400">Pick image</p>
                  </div>
                )}
                <button
                  onClick={() => imageRef.current?.click()}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <SquarePenIcon className="size-4" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-4 md:col-span-1 lg:col-span-4">
              <p className="mb-6 text-base">
                Enter product information to create.
              </p>

              <Form action={createProduct} className="grid gap-4">
                <input
                  required
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  ref={imageRef}
                  onChange={handleChangeImage}
                />

                <div className="grid gap-2">
                  <label htmlFor="name">Product name</label>
                  <Input
                    required
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                  />
                  <FormFieldError
                    field="name"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="price">Product price (NGN)</label>
                  <Input
                    required
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Enter product price"
                  />
                  <FormFieldError
                    field="price"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="h-px bg-gray-100"></div>

                <div className="grid gap-2">
                  <label htmlFor="categoryId">Category</label>
                  <Input
                    required
                    name="categoryId"
                    placeholder="Choose category"
                  />
                  <FormFieldError
                    field="categoryId"
                    className="text-xs text-red-500"
                  />
                </div>

                <FormMessage className="group-data-[success=false]/form:text-red-500 group-data-[success=true]/form:text-green-500" />

                <FormStatus className="flex justify-end">
                  <Button
                    onClick={() => setImageError(!image)}
                    className="shrink-0"
                  >
                    Create product{" "}
                    <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
                  </Button>
                </FormStatus>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
