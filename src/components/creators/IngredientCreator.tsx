import NumericInput from '../credentials/NumericInput';
import TitleInput from '../credentials/TitleInput';
import { Formik, Form } from 'formik';
import { BtnFilledStyles } from '../styles/Buttons';
import { gql, useMutation } from '@apollo/client';

interface InitialValues {
  name: string;
  images: [string?];
  kcal: number;
  carbs: number;
  protein: number;
  fats: number;
  glycemicIndex: number;
}
export default function IngredientCreator() {
  const initialValues: InitialValues = {
    name: '',
    images: [],
    kcal: 0,
    carbs: 0,
    protein: 0,
    fats: 0,
    glycemicIndex: 0,
  };
  const NEW_INGREDIENT = gql`
    mutation newIngredient($ingredient: ingredientInput!) {
      newIngredient(ingredient: $ingredient) {
        id
      }
    }
  `;

  const [newIngredient] = useMutation(NEW_INGREDIENT);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        newIngredient({ variables: { ingredient: { ...values } } });
      }}
    >
      <Form>
        {/* TODO: aria busy and disabled states */}
        <fieldset>
          <TitleInput
            type="text"
            placeholder="Ingredient name..."
            name="name"
          />
          <NumericInput name="kcal" label="kcal" />
          <NumericInput name="carbs" label="carbs" />
          <NumericInput name="protein" label="protein" />
          <NumericInput name="fats" label="fats" />
          <NumericInput name="glycemicIndex" label="glycemic index" />
          <BtnFilledStyles
            style={{ float: 'right', marginRight: '5rem' }}
            type="submit"
          >
            create ingredient
          </BtnFilledStyles>
        </fieldset>
      </Form>
    </Formik>
  );
}
