"use client";

import { Suspense } from "react";
import { ResetPassword } from "./reset-password";

export default function SignUpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
