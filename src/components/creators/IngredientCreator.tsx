import React, { useState } from 'react';
import NumericInput from '../credentials/NumericInput';
import TitleInput from '../credentials/TitleInput';
import { Formik, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
import { DropzoneStyles, PrimaryButton, CreatorFieldset } from '../styles';
import { createIngredient } from '../../lib/firestore';
import { useMutation } from 'react-query';
import { useAuth } from '../../lib/auth';

interface FormikValues {
  name: string;
  images: string[] | [];
  kcal: number | '';
  carbs: number | '';
  protein: number | '';
  fats: number | '';
  glycemicIndex: number | '';
}

const initialValues: FormikValues = {
  name: '',
  images: [],
  kcal: '',
  carbs: '',
  protein: '',
  fats: '',
  glycemicIndex: '',
};

export default function IngredientCreator() {
  const { user } = useAuth();

  const onDrop = (acceptedFiles: File[]) => {
    return setFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onCreateIngredient = useMutation(
    (formData: any) => {
      return fetch('/api/createIngredient', {
        method: 'POST',
        body: formData,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        const res = await data.json();
        setLoading(false);
        console.log(res);
      },
    }
  );

  const isFile: boolean = files.length > 0;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        if (user) {
          setLoading(true);
          const data = new FormData();
          data.append('files', files[0]);
          data.append('author_id', user.uid);
          data.append('values', JSON.stringify({ ...values }));
          onCreateIngredient.mutate(data);
          //   try {
          //     const data = new FormData();
          //     data.append('file', files[0]);
          //     data.append('upload_preset', 'fwwd2pmr');
          //     const res = await fetch(
          //       `https://api.cloudinary.com/v1_1/dq104qc4m/image/upload`,
          //       {
          //         method: 'POST',
          //         body: data,
          //       }
          //     );
          //     const resCloudinary = await res.json();
          //     try {
          //       const {
          //         kcal,
          //         protein,
          //         fats,
          //         glycemicIndex,
          //         carbs,
          //         name,
          //       } = values;
          //       const ingredient = {
          //         name,
          //         author: user.uid,
          //         images: [resCloudinary.secure_url],
          //         nutrients: { kcal, protein, fats, glycemicIndex, carbs },
          //       };
          //       const ing = await createIngredient(ingredient);
          //       console.log(ing);
          //     } catch (error) {
          //       // remove uploaded cloudinary asset if there is error creating ingredient
          //       // set error state and display msg
          //       console.log(error);
          //     }
          //   } catch (error) {
          //     // set error state and display msg
          //     console.log(error);
          //   }
        }
      }}
    >
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
              <a style={{ font: 'var(--typographySmall)' }}>Upload image ...</a>
            )}
            <input type="file" {...getInputProps()} multiple={false} />
          </DropzoneStyles>
          <h5
            style={{ font: 'var(--typographySmallBold', marginBottom: '1rem' }}
          >
            Nutrients in 100g
          </h5>
          <div style={{ maxWidth: '200px' }}>
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
        </CreatorFieldset>
      </Form>
    </Formik>
  );
}
