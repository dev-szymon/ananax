import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from 'formik';
import TitleInput from '../../forms/TitleInput';
import NumericInput from '../../forms/NumericInput';
import {
  PrimaryButton,
  TertiaryButton,
  DropzoneStyles,
  CreatorFieldset,
  IngredientSearchResultStyles,
  PlainButton,
  AmountInputStyles,
  IngredientSearchResultDataContainer,
} from '../../styles';
import Textarea from '../../forms/Textarea';
import { useMenu } from '../../../context/menuContext';
import { useIngredientsSelector } from '../../../context/ingredientsSelectorContext';
import { Persist } from 'formik-persist';
import { IRecipeCreatorValues } from '../../../types/recipes';
import { NutrientKeys } from '../../../types/ingredients';
import Flex from '../../Flex';
import { createRecipeYupSchema } from './validation';
import { useMutation } from 'react-query';
import { Close } from '../../../images/close';

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
  const { menuHandler } = useMenu();
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
          <CreatorFieldset aria-busy={loading} disabled={loading}>
            <TitleInput type="text" placeholder="Recipe name..." name="name" />
            <DropzoneStyles {...getRootProps()}>
              {files[0] ? (
                <img
                  style={{ width: '60%' }}
                  src={URL.createObjectURL(files[0])}
                  alt="upload preview"
                ></img>
              ) : (
                <a style={{ font: 'var(--typographySmall)' }}>
                  upload image ...
                </a>
              )}
              <input type="file" {...getInputProps()} multiple={false} />
            </DropzoneStyles>
            <div style={{ maxWidth: '180px' }}>
              <NumericInput
                label="preparation time"
                name="prepTime"
                placeholder={0}
              />
            </div>
            <div
              style={{
                padding: '1rem 0',
              }}
            >
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
                  <IngredientSearchResultStyles
                    key={id}
                    style={{
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      marginBottom: '2px',
                      border: '0.5px solid var(--colorPrimary25)',
                      backgroundColor: 'var(--colorWhite)',
                      borderRadius: '0.25rem',
                      boxShadow: 'var(--lightShadow)',
                    }}
                  >
                    <Flex justify="space-between">
                      <h5>{name}</h5>
                      <PlainButton
                        type="button"
                        onClick={() => setContextIngredients({ ...rest })}
                      >
                        <Close fill="black" />
                      </PlainButton>
                    </Flex>

                    <IngredientSearchResultDataContainer>
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
                        <AmountInputStyles>
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
                        </AmountInputStyles>
                      </Flex>
                    </IngredientSearchResultDataContainer>
                  </IngredientSearchResultStyles>
                );
              })}
            </div>

            <TertiaryButton
              style={{
                marginBottom: '1rem',
              }}
              type="button"
              onClick={() => menuHandler('SEARCH_INGREDIENTS')}
            >
              + add ingredients
            </TertiaryButton>

            <Textarea
              name="description"
              label="preparation"
              placeholder="Recipe preparation..."
            />

            <PrimaryButton
              type="submit"
              disabled={
                !formProps.isValid &&
                !isFile &&
                Object.keys(contextIngredients).length > 1
              }
            >
              create recipe
            </PrimaryButton>
            <TertiaryButton
              style={{ marginLeft: '1rem' }}
              onClick={() => {
                formProps.handleReset();
                setFiles([]);
                setContextIngredients({});
              }}
              type="reset"
            >
              clear
            </TertiaryButton>
          </CreatorFieldset>
          <Persist name="recipe-creator" />
        </Form>
      )}
    </Formik>
  );
}
