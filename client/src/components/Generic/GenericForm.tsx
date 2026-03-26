import { Button, Form, Input, Select, SelectItem } from "@heroui/react"
import React from "react"

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
  children?: (values: T) => React.ReactNode;
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
    children,
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

    const renderField = (field: FormField<T>) => {
        return (
            <div key={String(field.key)} className="w-full">
                {field.type === "select" ? (
                    <Select label={field.label} name={String(field.key)} isRequired={field.required} placeholder={field.placeholder}>
                        {field.options ? field.options.map(option => (
                            <SelectItem key={option.value}>{option.label}</SelectItem>
                        )) : null}
                    </Select>
                ) : (
                    <Input
                        label={field.label}
                        type={field.type}
                        name={String(field.key)}
                        placeholder={field.placeholder}
                        isRequired={field.required}
                        step="any"
                    />
                )}
            </div>
        )
    }

    const [values, setValues] = React.useState<T>({} as T);

    const handleChange = (key: keyof T, val: any) => {
        setValues(prev => ({ ...prev, [key]: val }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div className="w-full" key={String(field.key)} onChange={(e: any) => handleChange(field.key, e.target.value)}>
                    {renderField(field)}
                </div>
            ))}

            {typeof children === 'function' ? children(values) : children}

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
