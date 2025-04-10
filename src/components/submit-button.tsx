"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();

  return <Button {...props} disabled={props.disabled || pending} />;
};
