import { Field, ErrorMessage } from 'formik';
import { BaseInputStyles } from '../styles';

export default function TextInput({
  type,
  className,
  name,
  label,
  placeholder,
  ...rest
}: {
  type: string;
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <BaseInputStyles className={className}>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage name={name} />
    </BaseInputStyles>
  );
}
