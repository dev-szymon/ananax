import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import React from 'react';

interface TextareaInputProps extends TextareaProps {
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
}

export default function TextareaInput({
  className,
  name,
  label,
  placeholder,
  ...rest
}: TextareaInputProps) {
  return (
    <Field id={name} name={name} placeholder={placeholder}>
      {({ field, form }: FieldProps) => (
        <FormControl
          paddingBottom="1rem"
          isInvalid={!!form.errors[name] && !!form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Textarea
            {...field}
            id={name}
            name={name}
            autoComplete="off"
            minH="200px"
            placeholder={placeholder}
            focusBorderColor="green.900"
            {...rest}
          />
          <FormErrorMessage m={0}>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}
