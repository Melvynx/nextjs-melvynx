"use client";

import { Button } from "@/components/ui/button";
import { PropsWithChildren, useState } from "react";

export const Counter = (props: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  console.log({ count });

  return (
    <div className="border-2 rounded-md">
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
      {props.children}
    </div>
  );
};
