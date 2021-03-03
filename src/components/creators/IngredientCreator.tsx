import React, { useState } from 'react';
import NumericInput from '../credentials/NumericInput';
import TitleInput from '../credentials/TitleInput';
import { Formik, Form } from 'formik';
import { BtnFilledStyles } from '../styles/Buttons';
import { gql, useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { DropzoneStyles, Notice } from '../styles/Forms';
import Router from 'next/router';

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
  kcal: null,
  carbs: null,
  protein: null,
  fats: null,
  glycemicIndex: null,
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
      }
    }
  `;

  const [newIngredient] = useMutation(NEW_INGREDIENT, {
    onCompleted: (data) => {
      Router.push(`/ingredients/${data.newIngredient.id}`);
      setLoading(false);
    },
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        setLoading(true);
        try {
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
          try {
            newIngredient({
              variables: {
                ingredient: { ...values, images: [resCloudinary.secure_url] },
              },
            });
          } catch (error) {
            // remove uploaded cloudinary asset if there is error creating ingredient
            // set error state and display msg
            console.log(error);
          }
        } catch (error) {
          // set error state and display msg
          console.log(error);
        }
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
          <DropzoneStyles {...getRootProps()}>
            {files[0] ? (
              <img
                style={{ width: '60%' }}
                src={URL.createObjectURL(files[0])}
                alt="upload preview"
              ></img>
            ) : (
              <Notice>Upload image...</Notice>
            )}
            <input type="file" {...getInputProps()} multiple={false} />
          </DropzoneStyles>
          <NumericInput name="kcal" label="kcal" placeholder={0} />
          <NumericInput name="carbs" label="carbs" placeholder={0} />
          <NumericInput name="protein" label="protein" placeholder={0} />
          <NumericInput name="fats" label="fats" placeholder={0} />
          <NumericInput
            name="glycemicIndex"
            label="glycemic index"
            placeholder={0}
          />
          <BtnFilledStyles type="submit">create ingredient</BtnFilledStyles>
        </fieldset>
      </Form>
    </Formik>
  );
}
