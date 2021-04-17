import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from 'formik';
import TitleInput from '../credentials/TitleInput';
import {
  PrimaryButton,
  TertiaryButton,
  DropzoneStyles,
  CreatorFieldset,
} from '../styles';
import NumericInput from '../credentials/NumericInput';
import Textarea from '../credentials/Textarea';
import { useMenu } from '../../context/menuContext';
import { useIngredientsSelector } from '../../context/ingredientsSelectorContext';
import { Persist } from 'formik-persist';

export interface ICreateRecipe {
  name: string;
  images: string[] | [];
  ingredients: string[];
  description: string[];
  prepTime: number | '';
}

export const initialRecipeValues: ICreateRecipe = {
  name: '',
  images: [],
  ingredients: [],
  description: [],
  prepTime: '',
};

export default function RecipeCreator() {
  const { menuHandler } = useMenu();
  const { ingredients } = useIngredientsSelector();

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const isFile: boolean = files.length > 0;
  return (
    <Formik
      initialValues={initialRecipeValues}
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
            const recipe = {
              ...values,
              images: [resCloudinary.secure_url],
              ingredients: ingredients.map((i) => i),
            };
            // create recipe with api serverless functions
            console.log(recipe);
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
              <a style={{ font: 'var(--typographySmall)' }}>upload image ...</a>
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

          <TertiaryButton
            style={{ marginBottom: '1rem' }}
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

          <PrimaryButton type="submit" disabled={!isFile}>
            create recipe
          </PrimaryButton>
        </CreatorFieldset>
        <Persist name="recipe-creator" />
      </Form>
    </Formik>
  );
}
