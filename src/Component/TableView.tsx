import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudents,
  deleteStudents,
  editStudent,
  getStudents,
} from "./Api";
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
import Form from "./Form";
import SearchBox from "./SearchBox";
import { useState } from "react";

function TableView() {
  const [searchValue, setSearchValue] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: getStudents,
    queryKey: ["getStudents"],
  });

  const deleteMutation = useMutation({
    mutationFn: (emailId) => deleteStudents(emailId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] });
    },
  });

  function handleDelete(emailId) {
    deleteMutation.mutate(emailId);
  }

  const createMutation = useMutation({
    mutationFn: createStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] });
      setIsFormVisible(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: (updatedStudent) => editStudent(updatedStudent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudents"] });
      setIsFormVisible(false);
    },
  });

  function handleAddClick() {
    setIsFormVisible(true);
    setSelectedStudent(null); // Reset selected student for adding a new one
  }

  function handleFormCancel() {
    setIsFormVisible(false);
    setSelectedStudent(null);
  }

  function handleFormSubmit(data) {
    if (selectedStudent) {
      editMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  }

  function handleEditClick(student) {
    setSelectedStudent(student);
    setIsFormVisible(true);
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
      cell: (info) => info.getValue(),
    },
    {
      header: "Mobile Number",
      accessorKey: "mobileNumber",
      cell: (info) => info.getValue(),
    },
    {
      header: "Email Id",
      accessorKey: "emailId",
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (info) => {
        const student = info.row.original;
        return (
          <div className="flex space-x-1">
            <Button onClick={() => handleEditClick(student)}>Edit</Button>
            <Button onClick={() => handleDelete(student.emailId)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data.filter((student) =>
      student.firstName.toLowerCase().includes(searchValue.toLowerCase())
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <SearchBox onSearch={setSearchValue} />
        <Button onClick={handleAddClick}>ADD</Button>
        {isFormVisible && (
          <Form
            saveStudent={handleFormSubmit}
            cancelStudent={handleFormCancel}
            initialData={selectedStudent}
          />
        )}
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
    </div>
  );
}

export default TableView;
