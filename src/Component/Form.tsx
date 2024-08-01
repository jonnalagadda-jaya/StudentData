import { useForm } from "@tanstack/react-form";
import { Students } from "./types";
import FieldInfo from "./FieldInfo";
import { Button } from "../components/ui/button";

type FormProps = {
  saveStudent: (student: Students) => void;
  cancelStudent: () => void;
  initialData?: Students; // Add initialData prop
};

function Form({ saveStudent, cancelStudent, initialData }: FormProps) {
  const form = useForm<Students>({
    defaultValues: initialData || {
      id: "",
      firstName: "",
      mobileNumber: "",
      emailId: "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(vals) {
    saveStudent(vals.value);
    console.log(vals?.value);
  }

  return (
    <div className="grid justify-items-center">
      <div className="border-2 border-gray-600 rounded w-5/12 grid grid-cols-2 grid-rows-4 gap-4 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="contents"
        >
          <form.Field
            name="id"
            children={(field) => (
              <>
                <label htmlFor={field.name}>ID:</label>
                <input
                  className="border-2 border-gray-600 rounded"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value ? "First Name is Required" : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>First Name:</label>
                <input
                  className="border-2 border-gray-600 rounded"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="mobileNumber"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Mobile Number:</label>
                <input
                  className="border-2 border-gray-600 rounded"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="emailId"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Email Id:</label>
                <input
                  className="border-2 border-gray-600 rounded"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!!initialData}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
          <div className="col-span-2 flex justify-center mt-4 gap-4">
            <Button type="submit">Save</Button>
            <Button type="button" onClick={cancelStudent}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
