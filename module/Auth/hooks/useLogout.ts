import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../service/auth.service";
import { logoutUser } from "../authSlice";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const useLogout = () => {
    const router = useRouter();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      dispatch(logoutUser());
      toast({
        title: "Logout Successfully ",
      });
      router.push('/login');
    },
  });

  const handleLogout =  () => {
    mutation.mutate();
  };

  return { handleLogout };
};

export default useLogout;
