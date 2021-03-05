import { Field, ErrorMessage } from 'formik';
import { CheckboxStyles } from '../styles/Inputs';

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
    <CheckboxStyles className={className}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} type="checkbox" name={name} {...rest} />
      <ErrorMessage name={name} />
    </CheckboxStyles>
  );
}
