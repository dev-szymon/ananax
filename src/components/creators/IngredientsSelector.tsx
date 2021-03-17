import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Field } from 'formik';
import {
  SEARCH_INGREDIENTS_QUERY,
  SearchQueryResultsType,
} from '../../lib/queries';
import {
  SearchBarStyles,
  IngredientSearchResult,
  PlainButton,
  SelectedIngredientStyles,
} from '../styles';
import { Close } from '../../images';

interface IngredientSelectorProps {
  ingredients: SearchQueryResultsType[];
  setIngredients: Dispatch<SetStateAction<SearchQueryResultsType[]>>;
}

const IngredientSelector = ({
  ingredients,
  setIngredients,
}: IngredientSelectorProps) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<SearchQueryResultsType[] | null>(null);

  const [getIngredientByName, { data, error }] = useLazyQuery(
    SEARCH_INGREDIENTS_QUERY,
    {
      onCompleted: () => {
        setResults(data.getIngredientByName);
      },
    }
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && value.length > 2) {
      e.preventDefault();
      getIngredientByName({ variables: { name: value } });
    }

    return false;
  };

  const handleRemove = (item: SearchQueryResultsType) => {
    setIngredients([...ingredients.filter((i) => i.id !== item.id)]);
  };

  return (
    <div>
      {ingredients.map((item: SearchQueryResultsType) => {
        return (
          <SelectedIngredientStyles key={`${item.id}selected`}>
            <p>{item.name}</p>
            <PlainButton
              type="button"
              className="flex-center-center"
              onClick={() => handleRemove(item)}
            >
              <Close fill="#ffffff" />
            </PlainButton>
          </SelectedIngredientStyles>
        );
      })}
      {/* ------------------------------------
      use lodash debounce here
      -------------------------- */}
      <SearchBarStyles>
        <Field
          type="search"
          name="search"
          placeholder="search ingredients..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          value={value}
          onKeyPress={(e: KeyboardEvent) => handleKeyPress(e)}
        />
      </SearchBarStyles>

      <div
        style={{
          position: 'relative',
          maxHeight: '200px',
          overflowY: 'scroll',
        }}
      >
        {error && <div>There was an error, please try again...</div>}
        {results?.length === 0 && <div>no results...</div>}
        <div>
          {results?.map((i: SearchQueryResultsType) => {
            return (
              <IngredientSearchResult key={i.id}>
                <span>{i.name}</span>
                <PlainButton
                  type="button"
                  onClick={() => setIngredients([...ingredients, i])}
                >
                  add +
                </PlainButton>
              </IngredientSearchResult>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IngredientSelector;
