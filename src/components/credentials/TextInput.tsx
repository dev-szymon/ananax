import { Field, ErrorMessage } from 'formik';
import { TextInputStyles } from '../styles/Inputs';

export default function TextInput({
  type,
  className,
  name,
  label,
  ...rest
}: {
  type: string;
  className?: string;
  name: string;
  label: string;
}) {
  return (
    <TextInputStyles>
      <label htmlFor={name}>{label}</label>
      <Field id={name} type={type} name={name} {...rest} />
      <ErrorMessage name={name} />
    </TextInputStyles>
  );
}
