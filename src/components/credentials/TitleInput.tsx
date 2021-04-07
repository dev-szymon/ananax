import { Field, ErrorMessage } from 'formik';
import { TitleInputStyles } from '../styles';

export default function TitleInput({
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
        autoComplete="off"
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage name={name} />
    </TitleInputStyles>
  );
}
