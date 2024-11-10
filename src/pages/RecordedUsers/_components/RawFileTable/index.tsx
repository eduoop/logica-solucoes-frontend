import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { User } from "@/models/user.model";

interface RawFileTableProps {
  items: User[];
}

function RawFileTable({ items }: RawFileTableProps) {
  return (
    <Table className="h-full w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Sobrenome</TableHead>
          <TableHead>username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Data de nascimento</TableHead>
          <TableHead>Avatar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-nowrap">{user.phone_number}</TableCell>
            <TableCell>{user.date_of_birth}</TableCell>
            <TableCell>{user.avatar}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RawFileTable;
