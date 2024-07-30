import { useForm } from "@tanstack/react-form";
import { Students } from "./types";
import FieldInfo from "./FieldInfo";
import { Button } from "../components/ui/button";

type FormProps = {
  saveStudent: (student: Students) => void;
};
function Form({ saveStudent }: FormProps) {
  const form = useForm<Students>({
    defaultValues: {
      id: "",
      firstName: "",
      mobileNumber: "",
      emailId: "",
    },
    onSubmit:handleSubmit
  })
    function handleSubmit(vals) {
        saveStudent(vals.value)
        console.log(vals?.value)
    }
return (
  <div>
    <h1>Simple Form Example</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <form.Field
          name="id"
          children={(field) => (
            <>
              <label htmlFor={field.name}>ID:</label>
              <input
                className="border-2 border-indigo-600"
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
      </div>
      <div>
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A first name is required"
                : value.length < 3
                ? "First name must be at least 3 characters"
                : undefined,
          }}
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>First Name:</label>
                <input
                  className="border-2 border-indigo-600"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="mobileNumber"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Mobile Number:</label>
              <input
                className="border-2 border-indigo-600"
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
      </div>
      <div>
        <form.Field
          name="emailId"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Email :</label>
              <input
                className="border-2 border-indigo-600"
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
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      />
    </form>
  </div>
);



}

export default Form;
