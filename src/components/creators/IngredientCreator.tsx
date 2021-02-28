import React, { useState } from 'react';
import NumericInput from '../credentials/NumericInput';
import TitleInput from '../credentials/TitleInput';
import { Formik, Form } from 'formik';
import { BtnFilledStyles } from '../styles/Buttons';
import { gql, useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';

interface FormikValues {
  name: string;
  images: string[] | [];
  kcal: number;
  carbs: number;
  protein: number;
  fats: number;
  glycemicIndex: number;
}

const initialValues: FormikValues = {
  name: '',
  images: [],
  kcal: 0,
  carbs: 0,
  protein: 0,
  fats: 0,
  glycemicIndex: 0,
};

export default function IngredientCreator() {
  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const NEW_INGREDIENT = gql`
    mutation newIngredient($ingredient: ingredientInput!) {
      newIngredient(ingredient: $ingredient) {
        id
        images
      }
    }
  `;

  const [newIngredient] = useMutation(NEW_INGREDIENT, {
    onCompleted: (data) => {
      setLoading(false);
      console.log(data);
    },
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        setLoading(true);
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'fwwd2pmr');
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dq104qc4m/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );
        const resCloudinary = await res.json();
        newIngredient({
          variables: {
            ingredient: { ...values, images: [resCloudinary.secure_url] },
          },
        });
      }}
    >
      <Form>
        <fieldset
          aria-busy={loading}
          disabled={loading}
          style={{ padding: '1rem' }}
        >
          <TitleInput
            type="text"
            placeholder="Ingredient name..."
            name="name"
          />
          <div className="img-input" {...getRootProps()}>
            {files[0] ? (
              <img
                style={{ width: '60%' }}
                src={URL.createObjectURL(files[0])}
                alt="upload preview"
              ></img>
            ) : (
              <span>+</span>
            )}
            <input type="file" {...getInputProps()} multiple={false} />
          </div>
          <NumericInput name="kcal" label="kcal" />
          <NumericInput name="carbs" label="carbs" />
          <NumericInput name="protein" label="protein" />
          <NumericInput name="fats" label="fats" />
          <NumericInput name="glycemicIndex" label="glycemic index" />
          <BtnFilledStyles
            style={{ float: 'right', marginRight: '7rem' }}
            type="submit"
          >
            create ingredient
          </BtnFilledStyles>
        </fieldset>
      </Form>
    </Formik>
  );
}
