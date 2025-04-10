"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { addReviewSafeAction } from "./review.action";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReviewFormSchema } from "./review.schema";

export const ReviewForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });
  const { executeAsync } = useAction(addReviewSafeAction);

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    await executeAsync(values);
    router.refresh();
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Patrick" {...field} />
              </FormControl>
              <FormDescription>The public name for the review.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input placeholder="I love your courses." {...field} />
              </FormControl>
              <FormDescription>Be honest.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Form>
  );
};

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={props.disabled || pending} />;
};
