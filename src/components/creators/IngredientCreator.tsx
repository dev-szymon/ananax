import React, { useState } from 'react';
import NumericInput from '../credentials/NumericInput';
import TitleInput from '../credentials/TitleInput';
import { Formik, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
import {
  DropzoneStyles,
  PrimaryButton,
  CreatorFieldset,
  TertiaryButton,
} from '../styles';
import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';
import { Persist } from 'formik-persist';

export interface ICreateIngredient {
  name: string;
  kcal: number | '';
  carbs: number | '';
  protein: number | '';
  fats: number | '';
  glycemicIndex: number | '';
}

export const initialIngredientValues: ICreateIngredient = {
  name: '',
  kcal: '',
  carbs: '',
  protein: '',
  fats: '',
  glycemicIndex: '',
};

export default function IngredientCreator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onCreateIngredient = useMutation(
    async (formData: FormData) => {
      const response = await fetch('/api/create-ingredient', {
        method: 'POST',
        body: formData,
        headers: {
          token: user ? user.token : '',
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

  const isFile: boolean = files.length > 0;
  return (
    <Formik
      initialValues={initialIngredientValues}
      onSubmit={async (values) => {
        if (user) {
          setLoading(true);
          const data = new FormData();
          data.append('files', files[0]);
          data.append('values', JSON.stringify({ ...values }));
          onCreateIngredient.mutate(data);
        }
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
                  alt="upload preview"
                ></img>
              ) : (
                <a style={{ font: 'var(--typographySmall)' }}>
                  Upload image ...
                </a>
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
              <NumericInput name="kcal" label="kcal" placeholder={0} />
              <NumericInput name="carbs" label="carbs" placeholder={0} />
              <NumericInput name="protein" label="protein" placeholder={0} />
              <NumericInput name="fats" label="fats" placeholder={0} />
              <NumericInput
                name="glycemicIndex"
                label="glycemic index"
                placeholder={0}
              />
            </div>
            <PrimaryButton type="submit" disabled={!isFile}>
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
