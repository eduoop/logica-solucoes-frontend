import React, { useState } from "react";
import { User } from "@/models/user.model";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RecordedUserService } from "@/shared/services/entites/recorded-user-service/RecordedUserService";
import { CgSpinner } from "react-icons/cg";

interface EditRecordedUserDialogProps {
  user: User;
  updateRecordedUser: (
    id: number,
    updatedData: Omit<User, "id" | "avatar">,
  ) => void;
  closeEdit: () => void;
}

const noCommas = z
  .string()
  .min(1, { message: "Este campo é obrigatório." })
  .refine((value) => !value.includes(","), {
    message: "Não pode conter vírgulas.",
  });

const editRecordedUserSchema = z.object({
  first_name: noCommas,
  last_name: noCommas,
  username: noCommas,
  email: z
    .string()
    .email()
    .refine((value) => !value.includes(","), {
      message: "Não pode conter vírgulas.",
    }),
  date_of_birth: noCommas,
  phone_number: noCommas,
});

export type IEditRecordedUserSchema = z.infer<typeof editRecordedUserSchema>;

function EditRecordedUserDialog({
  user,
  updateRecordedUser,
  closeEdit,
}: EditRecordedUserDialogProps) {
  const [savingRecordedUser, setSavingRecordedUser] = useState(false);

  const defaultValues = user;

  const form = useForm<IEditRecordedUserSchema>({
    resolver: zodResolver(editRecordedUserSchema),
    defaultValues,
  });

  const onSubmit = async (data: IEditRecordedUserSchema) => {
    setSavingRecordedUser(true);
    try {
      await RecordedUserService.updateRecordedUser(user.id, data);

      updateRecordedUser(user.id, data);

      closeEdit();
    } catch (error) {
      console.error("Erro ao atualizar o usuário", error);
    } finally {
      setSavingRecordedUser(false);
    }
  };

  return (
    <AlertDialogContent className="h-[500px] w-[90%] overflow-scroll sm:h-auto sm:w-auto sm:overflow-hidden">
      <AlertDialogHeader>
        <AlertDialogTitle>Editar usuário gravado</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription>
        Edite o usuário salvo no CSV
      </AlertDialogDescription>

      <div className="mt-2 w-full">
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu sobrenome..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu nome de usuário..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Digite seu email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Digite sua data de nascimento..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Digite seu número de telefone..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
        <AlertDialogAction
          className="rounded-full"
          disabled={savingRecordedUser}
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
        >
          {savingRecordedUser ? (
            <>
              <CgSpinner className="animate-spin" />
              Salvando
            </>
          ) : (
            "Confirmar"
          )}{" "}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default EditRecordedUserDialog;
