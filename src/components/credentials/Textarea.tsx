import { Field, ErrorMessage } from 'formik';
import { TextareaStyles } from '../styles';

export default function NumericInput({
  className,
  name,
  label,
  placeholder,
  ...rest
}: {
  className?: string;
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <TextareaStyles className={className}>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        as="textarea"
        name={name}
        {...rest}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </TextareaStyles>
  );
}
