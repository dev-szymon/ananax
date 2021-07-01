import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import React from 'react';

interface TextInputProps extends InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}

export default function TextInput({
  type,
  name,
  label,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <FormControl
            paddingBottom="1rem"
            isInvalid={!!form.errors[name] && !!form.touched[name]}
          >
            <FormLabel m={0} htmlFor={name}>
              {label}
            </FormLabel>
            <Input
              {...field}
              type={type}
              id={name}
              name={name}
              autoComplete="off"
              placeholder={placeholder}
              focusBorderColor="green.900"
              {...rest}
            />

            <FormErrorMessage m={0}>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
