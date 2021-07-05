import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { Persist } from 'formik-persist';
import { IIngredientCreatorValues } from '../../../types/ingredients';
import { createIngredientYupSchema } from './validation';
import { AspectRatio, Box, Button, Flex, Heading } from '@chakra-ui/react';
import TextInput from '../../forms/TextInput';
import NumericInput from '../../forms/NumericInput';
import { useRouter } from 'next/router';

// ************
// Component renders input for each nutrient available in the array, tests check number of inputs depending on the array length + name + img. (arr.len + 2)
// *** However validation is written independently. Might need to refactor that piece in the future.
// ************
export const ingredientNutrients = [
  { name: 'kcal', label: 'kcal', unitName: '' },
  { name: 'fats', label: 'fats', unitName: 'g' },
  { name: 'protein', label: 'protein', unitName: 'g' },
  { name: 'carbs', label: 'carbs', unitName: 'g' },
  { name: 'glycemicIndex', label: 'glycemic index', unitName: '' },
] as const;

interface IIngredientCreatorProps {
  userToken: string;
}
const initialIngredientValues: IIngredientCreatorValues = {
  name: '',
  kcal: '',
  carbs: '',
  protein: '',
  fats: '',
  glycemicIndex: '',
};
export default function IngredientCreator({
  userToken,
}: IIngredientCreatorProps) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const isFile: boolean = files.length > 0;
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const useCreateIngredient = useMutation(
    async (formData: FormData) => {
      const response = await fetch('/api/create-ingredient', {
        method: 'POST',
        body: formData,
        headers: {
          token: userToken,
        },
        credentials: 'same-origin',
      });

      return await response.json();
    },
    {
      onSuccess: async (data) => {
        router.push(`/ingredients/${data.ingredient}`);
        setLoading(false);
      },
    }
  );

  return (
    <Formik
      validationSchema={createIngredientYupSchema}
      initialValues={initialIngredientValues}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);
        const data = new FormData();
        data.append('files', files[0]);
        data.append('values', JSON.stringify({ ...values }));
        useCreateIngredient.mutate(data);
        resetForm();
        setFiles([]);
      }}
    >
      {(formProps) => (
        <Form>
          <fieldset aria-busy={loading} disabled={loading}>
            <TextInput
              p="0.5rem"
              fontSize="1.5rem"
              fontWeight="bold"
              type="text"
              placeholder="Ingredient name..."
              border="none"
              name="name"
            />
            <AspectRatio
              border={isFile ? 'none' : '2px dashed'}
              marginBottom="2rem"
              borderColor="pink.900"
              borderRadius="0.5rem"
              overflow="hidden"
              cursor="pointer"
              ratio={4 / 3}
              {...getRootProps()}
            >
              <Box>
                {files[0] ? (
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt="ingredient upload preview"
                  ></img>
                ) : (
                  <a>Upload image ...</a>
                )}
                <input type="file" {...getInputProps()} multiple={false} />
              </Box>
            </AspectRatio>
            <Heading as="h5" fontSize="1rem" marginBottom="1rem">
              Nutrients in 100g
            </Heading>
            <Box maxWidth="200px">
              {ingredientNutrients.map((nutrient) => {
                const { name, unitName, label } = nutrient;
                const constructedLabel = unitName
                  ? `${label} [ ${unitName} ]`
                  : label;
                return (
                  <NumericInput
                    key={`${name}/${unitName}`}
                    {...nutrient}
                    label={constructedLabel}
                  />
                );
              })}
            </Box>
            <Flex justify="space-between">
              <Button
                type="submit"
                colorScheme="pink"
                w="100%"
                disabled={!isFile && !formProps.isValid}
              >
                create ingredient
              </Button>
              <Button
                marginLeft="1rem"
                variant="ghost"
                onClick={() => {
                  formProps.handleReset();
                  setFiles([]);
                }}
                type="reset"
              >
                clear
              </Button>
            </Flex>
          </fieldset>
          <Persist name="ingredient-creator" />
        </Form>
      )}
    </Formik>
  );
}
