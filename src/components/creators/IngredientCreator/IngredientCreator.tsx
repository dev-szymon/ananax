import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { Persist } from 'formik-persist';
import NutrientInput from './NutrientInput';

import { IIngredientCreatorValues } from '../../../types/ingredients';
import { createIngredientYupSchema } from './validation';
import {
  DropzoneStyles,
  PrimaryButton,
  CreatorFieldset,
  TertiaryButton,
} from '../../styles';
import TitleInput from '../../forms/TitleInput';

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
        setLoading(false);
        console.log(data);
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
          <CreatorFieldset aria-busy={loading} disabled={loading}>
            <TitleInput
              type="text"
              placeholder="Ingredient name..."
              name="name"
            />
            <DropzoneStyles {...getRootProps()}>
              {files[0] ? (
                <img
                  style={{ width: '60%' }}
                  src={URL.createObjectURL(files[0])}
                  alt="ingredient upload preview"
                ></img>
              ) : (
                <a>Upload image ...</a>
              )}
              <input type="file" {...getInputProps()} multiple={false} />
            </DropzoneStyles>
            <h5
              style={{
                font: 'var(--typographySmallBold',
                marginBottom: '1rem',
              }}
            >
              Nutrients in 100g
            </h5>
            <div style={{ width: '50%', maxWidth: '200px' }}>
              {ingredientNutrients.map((nutrient) => (
                <NutrientInput
                  key={`${nutrient.name}/${nutrient.unitName}`}
                  {...nutrient}
                />
              ))}
            </div>
            <PrimaryButton
              type="submit"
              disabled={!isFile && !formProps.isValid}
            >
              create ingredient
            </PrimaryButton>
            <TertiaryButton
              style={{ marginLeft: '1rem' }}
              onClick={() => {
                formProps.handleReset();
                setFiles([]);
              }}
              type="reset"
            >
              clear
            </TertiaryButton>
          </CreatorFieldset>
          <Persist name="ingredient-creator" />
        </Form>
      )}
    </Formik>
  );
}
