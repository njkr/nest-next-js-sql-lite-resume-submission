import { TextField } from "@mui/material";
import { FieldProps } from "formik";


export const CustomTextField: React.FC<FieldProps & { label: string; multiline?: boolean; rows?: number }> = ({
    field,
    form,
    label,
    multiline = false,
    rows,
    ...props
}) => (
    <TextField
        {...field}
        {...props}
        label={label}
        fullWidth
        multiline={multiline}
        rows={rows}
        error={form.touched[field.name] && Boolean(form.errors[field.name])}
        helperText={form.touched[field.name] && form.errors[field.name] ? String(form.errors[field.name]) : ''}
    />
);