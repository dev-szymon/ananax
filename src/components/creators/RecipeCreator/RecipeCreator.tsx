import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from 'formik';
import NumericInput from '../../forms/NumericInput';
import Textarea from '../../forms/Textarea';
import { useIngredientsSelector } from '../../../context/ingredientsSelectorContext';
import { Persist } from 'formik-persist';
import { IRecipeCreatorValues } from '../../../types/recipes';
import { NutrientKeys } from '../../../types/ingredients';
import { createRecipeYupSchema } from './validation';
import { useMutation } from 'react-query';
import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
} from '@chakra-ui/react';
import TextInput from '../../forms/TextInput';
import IngredientSelector from './IngredientsSelector';

export const initialRecipeValues: IRecipeCreatorValues = {
  name: '',
  description: '',
  prepTime: '',
};

interface IRecipeCreatorProps {
  userToken: string;
}

export default function RecipeCreator({ userToken }: IRecipeCreatorProps) {
  const {
    ingredients: contextIngredients,
    setIngredients: setContextIngredients,
  } = useIngredientsSelector();

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };

  const useCreateRecipe = useMutation(
    async (formData: FormData) => {
      const response = await fetch('/api/create-recipe', {
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
        setLoading(false);
        console.log(data);
      },
    }
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const isFile: boolean = files.length > 0;

  return (
    <Formik
      initialValues={initialRecipeValues}
      validationSchema={createRecipeYupSchema}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);

        const ingredients = Object.keys(contextIngredients).reduce(
          (acc, ingre) => {
            return { ...acc, [ingre]: contextIngredients[ingre].amount };
          },
          {}
        );

        const data = new FormData();
        data.append('files', files[0]);
        data.append('values', JSON.stringify({ ...values, ingredients }));
        useCreateRecipe.mutate(data);
        setContextIngredients({});
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
              placeholder="Recipe name..."
              border="none"
              name="name"
            />
            <AspectRatio
              border={isFile ? 'none' : '2px dashed'}
              borderColor="pink.900"
              marginBottom="2rem"
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
                    alt="upload preview"
                  ></img>
                ) : (
                  <a style={{ font: 'var(--typographySmall)' }}>
                    Upload image ...
                  </a>
                )}
                <input type="file" {...getInputProps()} multiple={false} />
              </Box>
            </AspectRatio>
            <Box maxW="200px">
              <NumericInput label="preparation time" name="prepTime" />
            </Box>

            <IngredientSelector />

            <Textarea
              name="description"
              label="preparation"
              placeholder="Recipe preparation..."
            />
            <Flex justify="space-between">
              <Button
                type="submit"
                colorScheme="pink"
                w="100%"
                disabled={
                  !formProps.isValid &&
                  !isFile &&
                  Object.keys(contextIngredients).length < 1
                }
              >
                create recipe
              </Button>
              <Button
                marginLeft="1rem"
                variant="ghost"
                onClick={() => {
                  formProps.handleReset();
                  setFiles([]);
                  setContextIngredients({});
                }}
                type="reset"
              >
                clear
              </Button>
            </Flex>
          </fieldset>
          <Persist name="recipe-creator" />
        </Form>
      )}
    </Formik>
  );
}
