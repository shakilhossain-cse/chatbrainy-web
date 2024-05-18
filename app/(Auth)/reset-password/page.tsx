import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPassword from "@/module/Auth/ResetPassword";

export default async function ResetPasswordPage() {

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPassword/>
    </div>
  );
}
