import { Field, ErrorMessage } from 'formik';
import { Textarea } from '@chakra-ui/react';

export default function TextareaInput({
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
    <>
      <Field
        id={name}
        as="textarea"
        name={name}
        placeholder={placeholder}
        component={<Textarea />}
        {...rest}
      />
      <div className="error-msg">
        <ErrorMessage name={name} />
      </div>
    </>
  );
}
