import { Field, ErrorMessage } from 'formik';

export default function InputField({
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
    <div className={`${className}`}>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
}
