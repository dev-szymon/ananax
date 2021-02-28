import { Field, ErrorMessage } from 'formik';
import { NumericInputStyles } from '../styles/Inputs';

export default function NumericInput({
  className,
  name,
  label,
  ...rest
}: {
  className?: string;
  name: string;
  label: string;
}) {
  return (
    <NumericInputStyles>
      <label htmlFor={name}>{label}</label>
      <Field id={name} type="number" name={name} {...rest} />
      <ErrorMessage name={name} />
    </NumericInputStyles>
  );
}
