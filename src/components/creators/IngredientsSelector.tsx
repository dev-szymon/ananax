import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Field } from 'formik';
import { SEARCH_INGREDIENTS_QUERY } from '../../lib/queries';

const SearchInput = ({
  onChange,
  onClickSearch,
  onClickClear,
  value,
  onKeyPress,
  placeholder,
  loading,
}: any) => {
  return (
    <div>
      <Field
        type="text"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={value}
        placeholder={placeholder}
      />

      <div>
        <button type="button" onClick={onClickSearch}>
          {loading ? 'O' : 'search'}
        </button>
        {value.length > 0 && <button onClick={onClickClear}>X</button>}
      </div>
    </div>
  );
};

const IngredientSearchResult = ({ ingredient, onClickAdd }: any) => {
  return (
    <div>
      <h2>{ingredient.name}</h2>
      <div>
        <input
          id={`${ingredient.id}quantity`}
          name={`${ingredient.id}-quantity`}
          type="number"
          defaultValue={ingredient.defaultValue || 1}
        />
        <div className="add-ingredient-button">
          <span onClick={onClickAdd}>+</span>
        </div>
      </div>
    </div>
  );
};

const IngredientSelector = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState(null);

  const [ingredients, setIngredients] = useState([]);

  const [getIngredientByName, { data, loading, error }] = useLazyQuery(
    SEARCH_INGREDIENTS_QUERY,
    {
      onCompleted: () => {
        setResults(data.getIngredientByName);
      },
    }
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && value.length > 2) {
      getIngredientByName({ variables: { name: value } });
    }

    return false;
  };

  return (
    <div>
      {ingredients.map((item) => {
        return (
          <div key={`${item.id}selected`}>
            <p>{item.name}</p>
          </div>
        );
      })}
      {/* ------------------------------------
      use lodash debounce here
      -------------------------- */}
      <SearchInput
        placeholder="szukaj składnika..."
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
        value={value}
        onKeyPress={(e: KeyboardEvent) => handleKeyPress(e)}
        onClickSearch={() => {
          getIngredientByName({ variables: { name: value } });
        }}
        onClickClear={() => setValue('')}
        loading={loading}
      />
      <div
        style={{
          position: 'relative',
          maxHeight: '200px',
          overflowY: 'scroll',
        }}
      >
        {error && <div>wystąpił błąd spróbuj ponownie</div>}
        {results?.length === 0 && <div>brak wyników</div>}
        <div style={{ padding: '0 0.4rem' }}>
          {results?.map((i: any) => {
            return (
              <IngredientSearchResult
                key={i.id}
                ingredient={i}
                onClickAdd={() => {
                  const quantityValue = (document.getElementById(
                    `${i.id}quantity`
                  ) as HTMLInputElement).value;
                  const valueObject = { ...i, quantity: quantityValue };
                  setIngredients([...ingredients, valueObject]);
                  //   const mainElement = document.querySelector('.main-element');
                  //   const currentPosition = mainElement.scrollTop;
                  //   mainElement.scrollTo(0, currentPosition + 3.25 * 16);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IngredientSelector;
