import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchRecordedUsersProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchRecordedUsers({ setValue }: SearchRecordedUsersProps) {
  const debounce = <T extends (...args: string[]) => void>(
    cb: T,
    delay: number = 1000,
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        cb(...args);
      }, delay);
    };
  };

  const onInput = (searchValue: string): void => {
    setValue(searchValue);
  };

  const onInputWithDebouncing = useCallback(debounce(onInput, 1000), []);

  return (
    <div className="relative w-full sm:w-[60%]">
      <Input
        type="text"
        onChange={(e) => onInputWithDebouncing(e.target.value)}
        placeholder="Buscar por nome ou usuário"
        className="w-full px-4 py-5 pl-10 text-[16px] font-medium"
      />
      <BiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
        size={20}
      />
    </div>
  );
}

export default SearchRecordedUsers;
