import { useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import { TbReload } from "react-icons/tb";
import { User } from "@/models/user.model";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import RecordedUserCard from "@/components/RecordedUserCard";
import UsersSkeletonList from "@/components/UsersSkeletonList";
import SaveCancelButtons from "@/components/SaveCancelButtons";
import { RecordedUserService } from "@/shared/services/entites/recorded-user-service/RecordedUserService";
import notFound from "@/assets/not_found.svg";
import styles from "./styles.module.css";
import SearchRecordedUsers from "./_components/SearchRecordedUsers";
import { toast } from "sonner";

function RecordedUsers() {
  const [recordedUsersData, setRecordedUsersData] = useState<User[]>([]);
  const [isLoadingRecordedUsers, setIsLoadingRecordedUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isRemovingRecordedUser, setIsRemovingRecordedUser] = useState(false);

  const { ref, inView } = useInView();

  const fetchAllRecordedUsers = async (
    page: number = 1,
    search: string = "",
  ) => {
    setIsLoadingRecordedUsers(true);
    try {
      const response = await RecordedUserService.getAllRecordedUsers(
        page,
        search,
      );
      setRecordedUsersData((prevData) => [...prevData, ...response.items]);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
    } finally {
      setIsLoadingRecordedUsers(false);
    }
  };

  const loadMoreRecordedUsers = () => {
    if (!isLoadingRecordedUsers && recordedUsersData.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const scrollPositionBeforeLoad = () => {
    if (scrollRef.current) {
      const currentScrollPos = scrollRef.current.scrollTop || 0;
      sessionStorage.setItem("scrollPosition", currentScrollPos.toString());
    }
  };

  const restoreScrollPosition = () => {
    const savedScrollPos = sessionStorage.getItem("scrollPosition");
    if (savedScrollPos && scrollRef.current) {
      scrollRef.current.scrollTo(0, parseFloat(savedScrollPos));
    }
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    );
  };

  const updateRecordedUser = (
    id: number,
    updatedData: Omit<User, "id" | "avatar">,
  ) => {
    setRecordedUsersData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user,
      ),
    );
  };

  const removeRecordedUsers = async () => {
    setIsRemovingRecordedUser(true);

    try {
      await RecordedUserService.removeRecordedUsers(selectedUsers);

      setRecordedUsersData((prevUsersData) =>
        prevUsersData.filter((user) => !selectedUsers.includes(user.id)),
      );

      setSelectedUsers([]);

      toast.success("Usuários removidos com sucesso");
    } catch (error) {
      console.log(error);
      setRecordedUsersData([]);
      setSelectedUsers([]);
      setPage(1);
      fetchAllRecordedUsers(1, search);
      toast.error("Erro ao remover usuários");
    } finally {
      setIsRemovingRecordedUser(false);
    }
  };

  useEffect(() => {
    if (page !== 1) {
      fetchAllRecordedUsers(page, search);
      restoreScrollPosition();
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      scrollPositionBeforeLoad();
      loadMoreRecordedUsers();
    }
  }, [inView]);

  useEffect(() => {
    setRecordedUsersData([]);
    setPage(1);
    fetchAllRecordedUsers(1, search);
  }, [search]);

  return (
    <div className="pb-32">
      <Button
        disabled={isLoadingRecordedUsers}
        className="mb-6 rounded-full"
        onClick={() => {
          setRecordedUsersData([]);
          setSelectedUsers([]);
          setPage(1);
          fetchAllRecordedUsers(1, search);
        }}
      >
        Atualizar
        <TbReload
          className={isLoadingRecordedUsers ? styles.spinVariable : ""}
        />
      </Button>

      <div className="mb-6 flex w-full justify-center">
        <SearchRecordedUsers setValue={setSearch} />
      </div>

      <div className="space-y-4">
        {recordedUsersData.length > 0 ? (
          <div ref={scrollRef} className="flex flex-wrap gap-4">
            {recordedUsersData.map((user) => (
              <RecordedUserCard
                key={user.id}
                user={user}
                onClick={() => toggleUserSelection(user.id)}
                variant={selectedUsers.includes(user.id) ? "select" : "default"}
                disableActions={search.length > 0}
                updateRecordedUser={updateRecordedUser}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-10 mt-10">
            <h1 className="text-xl font-semibold text-yellow-600 text-center">
              Não encontramos nenhum usuário gravado
            </h1>
            <img className="w-96" src={notFound} alt="not found" />
          </div>
        )}

        {isLoadingRecordedUsers && recordedUsersData.length !== totalItems && (
          <UsersSkeletonList />
        )}
      </div>

      {selectedUsers.length > 0 && (
        <SaveCancelButtons
          isSaving={isRemovingRecordedUser}
          onCancel={() => setSelectedUsers([])}
          onConfirm={removeRecordedUsers}
        />
      )}

      <div ref={ref} className="flex w-full justify-center py-8">
        {isLoadingRecordedUsers && page > 1 ? (
          <CgSpinner
            size={40}
            className={`text-font-primary animate-spin text-2xl ${styles.spinVariable}`}
          />
        ) : null}
      </div>
    </div>
  );
}

export default RecordedUsers;
