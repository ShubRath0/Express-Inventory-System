import { Button, Form, Input, Select, SelectItem } from "@heroui/react";

export type GenericFormProps<T> = {
  fields: FormField<T>[];
  onSubmit: (values: T) => void;
  submitText?: string;
  submitColor?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
};

export type FormField<T> = {
  key: keyof T;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "select" | "email";
  required?: boolean;
  options?: { value: string; label: string }[];
};

export const GenericForm = <T extends Record<string, any>>({
  fields,
  onSubmit,
  submitText,
  submitColor,
}: GenericFormProps<T>) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const values = {} as T;
    fields.forEach((field) => {
      let value: any = formData.get(field.key as string);
      if (field.type == "number") value = Number(value);
      values[field.key] = value;
    });

    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={String(field.key)} className="w-full">
          {field.type === "select" ? (
            <Select
              label={field.label}
              name={String(field.key)}
              isRequired={field.required}
              placeholder={field.placeholder}
            >
              {field.options
                ? field.options.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                  ))
                : null}
            </Select>
          ) : (
            <Input
              label={field.label}
              type={field.type}
              name={String(field.key)}
              placeholder={field.placeholder}
              isRequired={field.required}
            />
          )}
        </div>
      ))}

      <Button
        type="submit"
        color={submitColor}
        size="lg"
        variant="shadow"
        className="w-full"
      >
        {submitText}
      </Button>
    </Form>
  );
};
