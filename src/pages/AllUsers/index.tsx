import { UserService } from "@/shared/services/entites/user-service/UserService";
import { useQuery } from "@tanstack/react-query";

function AllUsers() {
  const { data: allUsersDate, isLoading: isLoadingAllUsers } = useQuery({
    queryKey: ["establishments"],
    queryFn: () => UserService.getAllUsers(),
    enabled: true,
  });

  console.log(allUsersDate);

  return (
    <div className="text-white">
      {allUsersDate?.data.map((item) => <div>{item.last_name}</div>)}
    </div>
  );
}

export default AllUsers;
