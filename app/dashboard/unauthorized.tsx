import { Alert, AlertTitle } from "@/components/ui/alert";

export default function UnauthorizedPage() {
  return (
    <Alert>
      <AlertTitle>You need to be logged to see this page.</AlertTitle>
    </Alert>
  );
}
