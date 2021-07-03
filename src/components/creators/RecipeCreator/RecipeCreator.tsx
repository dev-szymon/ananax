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
import { AspectRatio, Box, Button, CloseButton, Flex } from '@chakra-ui/react';
import TextInput from '../../forms/TextInput';

export const initialRecipeValues: IRecipeCreatorValues = {
  name: '',
  description: '',
  prepTime: '',
};

const DISPLAY_NUTRIENTS: NutrientKeys[] = ['kcal', 'protein', 'fats', 'carbs'];

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
              marginLeft="-0.5rem"
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
            <div style={{ maxWidth: '180px' }}>
              <NumericInput label="preparation time" name="prepTime" />
            </div>
            <Box>
              {Object.keys(contextIngredients).length > 0 && (
                <div>
                  <h5
                    style={{
                      font: 'var(--typographySmallBold)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Ingredients
                  </h5>
                </div>
              )}

              {Object.keys(contextIngredients).map((ingr) => {
                const { [ingr]: des, ...rest } = contextIngredients;
                const { name, nutrients, id, amount } =
                  contextIngredients[ingr];
                return (
                  <Box>
                    <Flex justify="space-between">
                      <h5>{name}</h5>
                      <CloseButton
                        size="sm"
                        onClick={() => setContextIngredients({ ...rest })}
                      />
                    </Flex>

                    <Box>
                      {DISPLAY_NUTRIENTS.map((nutrientKey) => {
                        const { unitName, value } = nutrients[nutrientKey];
                        const constructedLabel = unitName
                          ? `${nutrientKey} [ ${unitName} ]`
                          : nutrientKey;
                        return (
                          <Flex
                            direction="column"
                            align="flex-start"
                            key={nutrientKey}
                          >
                            <span className="nutrient-label">
                              {constructedLabel}
                            </span>
                            <div className="nutrient-value">{`${
                              value || 'n/a'
                            }`}</div>
                          </Flex>
                        );
                      })}
                      <Flex direction="column" align="flex-end">
                        <span className="nutrient-label">{` [ ${amount.unitName} ]`}</span>
                        <Box>
                          <input
                            style={{
                              backgroundColor: 'var(--colorWhite)',
                              textAlign: 'right',
                              width: '100%',
                            }}
                            type="number"
                            value={amount.value}
                            onChange={(e) => {
                              setContextIngredients({
                                ...contextIngredients,
                                [ingr]: {
                                  ...contextIngredients[ingr],
                                  amount: {
                                    value: Number(e.target.value),
                                    unitName: amount.unitName,
                                  },
                                },
                              });
                            }}
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Button
              marginBottom="1rem"
              type="button"
              onClick={() => console.log('add ingredients')}
            >
              + add ingredients
            </Button>

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
