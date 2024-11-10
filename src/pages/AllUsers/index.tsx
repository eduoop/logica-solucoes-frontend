import { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { UserService } from "@/shared/services/entites/user-service/UserService";
import { User } from "@/models/user.model";
import { toast } from "sonner";
import UserCard from "@/components/UserCard";
import UsersSkeletonList from "@/components/UsersSkeletonList";
import SaveCancelButtons from "@/components/SaveCancelButtons";

function AllUsers() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const fetchAllUsers = async () => {
    setIsLoadingAllUsers(true);
    try {
      const response = await UserService.getAllUsers();
      setUsersData(response.data);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
    } finally {
      setIsLoadingAllUsers(false);
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    );
  };

  const handleSaveUsers = async () => {
    setIsCreatingUser(true);
    try {
      const usersToSave = usersData
        .filter((user) => selectedUsers.includes(user.id))
        .map((user) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          date_of_birth: user.date_of_birth,
          phone_number: user.phone_number,
        }));

      await UserService.saveUsers(usersToSave);

      setUsersData((prevUsersData) =>
        prevUsersData.filter((user) => !selectedUsers.includes(user.id)),
      );

      setSelectedUsers([]);

      toast.success("Usuários gravados com sucesso");
    } catch {
      toast.error("Erro ao gravadar usuários");
      setSelectedUsers([]);
      fetchAllUsers();
    } finally {
      setIsCreatingUser(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <Button
        disabled={isLoadingAllUsers}
        className="mb-6 rounded-full"
        onClick={fetchAllUsers}
      >
        Atualizar
        <TbReload className={isLoadingAllUsers ? styles.spinVariable : ""} />
      </Button>

      {!isLoadingAllUsers ? (
        <div className="flex flex-wrap gap-4 pb-32">
          {usersData.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => toggleUserSelection(user.id)}
              variant={selectedUsers.includes(user.id) ? "select" : "default"}
            />
          ))}
        </div>
      ) : (
        <UsersSkeletonList />
      )}

      {selectedUsers.length > 0 && (
        <SaveCancelButtons
          isSaving={isCreatingUser}
          onCancel={() => setSelectedUsers([])}
          onConfirm={() => handleSaveUsers()}
        />
      )}
    </div>
  );
}

export default AllUsers;
