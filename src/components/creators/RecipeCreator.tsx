import React, { useState } from 'react';
import Router from 'next/router';
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/client';
import TitleInput from '../credentials/TitleInput';
import { BtnFilledStyles, DropzoneStyles, Notice } from '../styles';
import NumericInput from '../credentials/NumericInput';
import Checkbox from '../credentials/Checkbox';
import Textarea from '../credentials/Textarea';
import IngredientSelector from './IngredientsSelector';
import { NEW_RECIPE, SearchQueryResultsType } from '../../lib/queries';

interface FormikValues {
  name: string;
  images: string[] | [];
  private: boolean;
  ingredients: string[];
  description: string[];
  prepTime: number | '';
}

const initialValues: FormikValues = {
  name: '',
  images: [],
  private: false,
  ingredients: [],
  description: [],
  prepTime: '',
};

export default function RecipeCreator() {
  const [ingredients, setIngredients] = useState<SearchQueryResultsType[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [newRecipe] = useMutation(NEW_RECIPE, {
    onCompleted: (data) => {
      Router.push(`/recipes/${data.newRecipe.id}`);
      setLoading(false);
    },
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const isFile: boolean = files.length > 0;
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
            newRecipe({
              variables: {
                recipe: {
                  ...values,
                  images: [resCloudinary.secure_url],
                  ingredients: ingredients.map((i) => i.id),
                },
              },
            });
          } catch (error) {
            // remove uploaded cloudinary asset if there is error creating recipe
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
          <TitleInput type="text" placeholder="Recipe name..." name="name" />
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
          <NumericInput
            label="preparation time"
            name="prepTime"
            step="1"
            placeholder={0}
          />
          <Checkbox label="private recipe" name="private" />
          <IngredientSelector
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Textarea
            name="description"
            label="preparation"
            placeholder="Recipe preparation..."
          />

          <BtnFilledStyles type="submit" disabled={!isFile}>
            create recipe
          </BtnFilledStyles>
        </fieldset>
      </Form>
    </Formik>
  );
}
