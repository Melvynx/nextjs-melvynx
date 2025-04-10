import { createSafeActionClient } from "next-safe-action";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

// 1. Middleware
// 2. Server Error
// 3. Appel côté client
// 4. Type safe des paramètres
export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) {
      return error.message;
    }

    return "Something went wrong";
  },
});
