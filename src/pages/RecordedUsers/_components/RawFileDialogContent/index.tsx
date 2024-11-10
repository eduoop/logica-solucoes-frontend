import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RawFileTable from "../RawFileTable";
import { useCallback, useEffect, useState } from "react";
import { CsvService } from "@/shared/services/entites/csv-service/CsvService";
import { CgSpinner } from "react-icons/cg";
import { User } from "@/models/user.model";
import { DialogDescription } from "@radix-ui/react-dialog";

function RawFileDialogContent() {
  const [loadingRawFile, setLaodingRawFile] = useState(false);
  const [rawFile, setRawFile] = useState("");

  const getRawFile = async () => {
    setLaodingRawFile(true);
    try {
      const rawFileData = await CsvService.getCsv();
      setRawFile(rawFileData);
    } finally {
      setLaodingRawFile(false);
    }
  };

  const parseCsvToArray = useCallback((): User[] => {
    const [headerLine, ...lines] = rawFile.trim().split("\n");

    const headers = headerLine.split(",");

    return lines.map((line) => {
      const values = line.split(",");

      return headers.reduce((obj, header, index) => {
        (obj[header as keyof User] as unknown) = values[index];
        return obj;
      }, {} as User);
    });
  }, [rawFile]);

  useEffect(() => {
    getRawFile();
  }, []);

  return (
    <DialogContent className="flex h-[500px] w-[90%] max-w-full justify-center overflow-hidden">
      <DialogTitle className="hidden" />
      <DialogDescription className="hidden" />
      <Tabs
        defaultValue="table"
        className="flex h-full w-full flex-col items-center"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="table">Tabela</TabsTrigger>
          <TabsTrigger value="rawFile">Arquivo bruto</TabsTrigger>
        </TabsList>

        {loadingRawFile ? (
          <CgSpinner className="animate-spin" />
        ) : (
          <>
            <TabsContent
              value="table"
              className="w-full flex-1 overflow-y-auto pr-2"
            >
              <RawFileTable items={parseCsvToArray()} />
            </TabsContent>
            <TabsContent
              value="rawFile"
              className="w-full flex-1 overflow-y-scroll"
            >
              <div className="h-full w-full rounded-xl bg-gray-200/35 p-4 shadow-sm">
                <span className="block break-words">{rawFile}</span>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </DialogContent>
  );
}

export default RawFileDialogContent;
