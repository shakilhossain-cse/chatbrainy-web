import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPassword from "@/module/Auth/ResetPassword";
import { resetTokenValidationService } from "@/module/Auth/service/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default async function Page() {
  const { token } = useParams();

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[450px]">
          <CardContent>
            <p>Token not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPassword token={token} />
        </CardContent>
      </Card>
    </div>
  );
}
