import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

export default function NumericInput({
  className,
  name,
  label,
  placeholder,
  step = 0.1,
  ...rest
}: {
  placeholder?: number;
  className?: string;
  step?: number;
  name: string;
  label: string;
}) {
  return (
    <>
      <Field name={name} id={name} {...rest}>
        {({ field, form }: FieldProps) => {
          return (
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <NumberInput
                step={step}
                min={0}
                autoComplete="off"
                focusBorderColor="green.900"
                {...field}
                onChange={(val) => form.setFieldValue(field.name, val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </>
  );
}
