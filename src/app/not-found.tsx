import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Not found – 404</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          The page you are trying to visit does not exist. Please check the URL.
        </p>
        <Button asChild>
          <Link href="/">Go back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
