"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { ReviewFormSchema } from "./review.schema";

export const ReviewForm = (props: { userId: string; redirectUrl?: string }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });

  const { execute, isPending } = useAction(addReviewSafeAction, {
    onError: (error) => {
      console.log({ error });
      toast.error(error.error.serverError ?? "Impossible to add more review !");
    },
    onSuccess: () => {
      router.refresh();
      form.reset();
      if (props.redirectUrl) {
        router.push(props.redirectUrl);
      }
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    execute({ ...values, userId: props.userId });
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
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
