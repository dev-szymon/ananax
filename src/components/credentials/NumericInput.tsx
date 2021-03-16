import { Field, ErrorMessage } from 'formik';
import { NumericInputStyles } from '../styles';

export default function NumericInput({
  className,
  name,
  label,
  placeholder,
  step = '0.1',
  ...rest
}: {
  placeholder?: number;
  className?: string;
  step?: string;
  name: string;
  label: string;
}) {
  return (
    <NumericInputStyles className={className}>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        type="number"
        name={name}
        min={0}
        step={step}
        {...rest}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </NumericInputStyles>
  );
}
