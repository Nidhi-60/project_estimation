import { useGetUserQuery } from "../redux/services/auth";

const useUserGet = () => {
  const { data } = useGetUserQuery();

  const getCurrentUser = (id) => {
    return data?.find((ele) => ele.id === id);
  };

  return [getCurrentUser];
};

export default useUserGet;
