import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgetPassword from "@/module/Auth/ForgetPassword";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Forget Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ForgetPassword />
        </CardContent>
      </Card>
    </div>
  );
}
