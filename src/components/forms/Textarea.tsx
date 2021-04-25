import { Field, ErrorMessage } from 'formik';
import { TextareaStyles } from '../styles';

export default function Textarea({
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
        placeholder={placeholder}
        {...rest}
      />
      <div className="error-msg">
        <ErrorMessage name={name} />
      </div>
    </TextareaStyles>
  );
}
