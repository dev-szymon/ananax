import React from 'react';
import NumericInput from '../../forms/NumericInput';
import { ingredientNutrients } from './IngredientCreator';

export default function NutrientInput({
  name,
  label,
  unitName,
}: typeof ingredientNutrients[number]) {
  const constructedLabel = unitName ? `${label} [ ${unitName} ]` : label;
  return <NumericInput name={name} label={constructedLabel} placeholder={0} />;
}
