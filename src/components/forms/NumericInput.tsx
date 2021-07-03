import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  InputProps,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface NumericInputProps extends InputProps {
  className?: string;
  step?: number;
  name: string;
  label: string;
}

export default function NumericInput({
  className,
  name,
  label,
  step = 0.1,
  ...rest
}: NumericInputProps) {
  return (
    <>
      <Field name={name} id={name} {...rest}>
        {({ field, form }: FieldProps) => {
          return (
            <FormControl
              paddingBottom="1rem"
              isInvalid={!!form.errors[name] && !!form.touched[name]}
            >
              <FormLabel>{label}</FormLabel>
              <NumberInput
                step={step}
                min={0}
                autoComplete="off"
                focusBorderColor="green.900"
                {...field}
                onChange={(str) => {
                  return form.setFieldValue(field.name, Number(str));
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage m={0}>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </>
  );
}
