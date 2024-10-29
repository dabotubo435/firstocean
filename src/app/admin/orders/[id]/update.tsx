"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormFieldError, FormMessage, FormStatus } from "@/context/form";
import { Tables } from "@/supabase/types";
import { LoaderCircleIcon } from "lucide-react";
import { deleteOrder, updateOrder } from "./actions";

export function UpdateOrder({ order }: { order: Tables<"orders"> }) {
  const deleteAction = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await deleteOrder(order.id);
    if (res?.success === false) {
      alert(res.error);
    }
  };

  return (
    <div className="pt-6 grid sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6 gap-4 max-w-3xl">
      <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 flex justify-center">
        <div className="flex gap-1 items-start">
          <div className="size-40 flex items-center justify-center border bg-gray-100 rounded-md">
            <p className="text-3xl">#{order.id}</p>
          </div>
        </div>
      </div>

      <div className="sm:col-span-4 md:col-span-1 lg:col-span-4">
        <h2 className="mb-6 text-base font-semibold">Order #{order.id}</h2>

        <Form action={updateOrder} className="grid gap-4">
          <input type="hidden" name="id" defaultValue={order.id} />

          <div className="grid gap-2">
            <label htmlFor="price">Amount (NGN)</label>
            <Input
              defaultValue={order.amount}
              required
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter order amount"
            />
            <FormFieldError field="amount" className="text-xs text-red-500" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="paid">Paid</label>
            <Select defaultValue={order.paid.toString()} name="paid">
              <SelectTrigger>
                <SelectValue placeholder="Paid status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Pending payment</SelectItem>
                <SelectItem value="true">Paid</SelectItem>
              </SelectContent>
            </Select>
            <FormFieldError field="paid" className="text-xs text-red-500" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="delivered">Delivered</label>
            <Select defaultValue={order.delivered.toString()} name="delivered">
              <SelectTrigger>
                <SelectValue placeholder="Delivered status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Pending delivery</SelectItem>
                <SelectItem value="true">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <FormFieldError
              field="delivered"
              className="text-xs text-red-500"
            />
          </div>

          <FormMessage className="group-data-[success=false]/form:text-red-500 group-data-[success=true]/form:text-green-500" />

          <FormStatus className="flex justify-end gap-4">
            <Button onClick={deleteAction} type="button" variant="outline">
              Delete
            </Button>

            <Button className="shrink-0">
              Update order
              <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
            </Button>
          </FormStatus>
        </Form>
      </div>
    </div>
  );
}
