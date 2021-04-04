import React, { useState, ChangeEvent } from 'react';
import { Field, Form, Formik } from 'formik';
import { BaseInputStyles, PrimaryButton } from '../styles';
import { IIngredientsSelectorContext } from '../../context/ingredientsSelectorContext';

const IngredientSelector = ({
  ingredients,
  setIngredients,
}: IIngredientsSelectorContext) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<[] | null>(null);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && value.length > 2) {
      e.preventDefault();
      console.log(value);
    }

    return false;
  };

  return (
    <div>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <BaseInputStyles>
            <Field
              type="search"
              name="search"
              placeholder="search ingredients..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
              autoComplete={'off'}
              value={value}
              onKeyPress={(e: KeyboardEvent) => handleKeyPress(e)}
            />
          </BaseInputStyles>
          <PrimaryButton>search</PrimaryButton>
        </Form>
      </Formik>

      <div
        style={{
          position: 'relative',
          maxHeight: '200px',
          overflowY: 'scroll',
        }}
      >
        {/* {error && <div>There was an error, please try again...</div>} */}
        {results?.length === 0 && <div>search ingredients...</div>}
        {/* {isLoading && <p>searching...</p>} */}
      </div>
    </div>
  );
};

export default IngredientSelector;
