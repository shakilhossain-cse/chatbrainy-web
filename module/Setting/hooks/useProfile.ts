import { useAppSelector } from "@/store/hooks";

const useProfile = () => {
  const data = useAppSelector((state) => state.auth);

  return { data };
};

export default useProfile;
