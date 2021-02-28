import { Field, ErrorMessage } from 'formik';
import { TitleInputStyles } from '../styles/Inputs';

export default function TextInput({
  type,
  className,
  name,
  placeholder,
  ...rest
}: {
  type: string;
  className?: string;
  name: string;
  placeholder: string;
}) {
  return (
    <TitleInputStyles>
      <Field
        id={name}
        type={type}
        name={name}
        {...rest}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </TitleInputStyles>
  );
}
