import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudents, deleteStudents, getStudents } from "./Api";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../components/ui/button";
import { useState } from "react";
import Form from "./Form";

function TableView() {

  const [isClicked, setIsClicked] = useState(false)
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryFn: getStudents,
    queryKey: ["getStudents"],
  });

  const deleteMutation = useMutation({
    mutationFn: (emailId: string) => deleteStudents(emailId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] });
    },
  });
  function handleDelete(emailId: string) {
    deleteMutation.mutate(emailId)
  }

  const createMutation = useMutation({
    mutationFn: createStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] })
      setIsClicked(false)
    },
  });
  function handleAddClick() {
    setIsClicked(true);
  }

  function handleFormSubmit(data) {
    createMutation.mutate(data);
    console.log("data",data)
  }
 
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (info) => info.getValue(),
    },
    {
      header: "FirstName",
      accessorKey: "firstName",
      cell: (any) => any.getValue(),
    },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
      cell: (any) => any.getValue(),
    },
    {
      header: "Email Id",
      accessorKey: "emailId",
      cell: (any) => any.getValue(),
    },
    {
      header: "Actions",
      accessorKey: "actions",
        cell: (any: any) => {
            const emailId = any.row.original.emailId;
            return(
            <div className="flex space-x-1">
                <Button>View</Button>
                <Button>Edit</Button>
                <Button onClick={() => handleDelete(emailId)}>Delete</Button>
                </div>
            )
        },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching...</div>;
  }
   
  return (
    <>
      <div>
        {isClicked && <Form saveStudent={handleFormSubmit}/>}
        <Button onClick={()=>handleAddClick()}>ADD</Button>
      </div>
      <div className="border-2 border-indigo-600 w-3/4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TableView;
