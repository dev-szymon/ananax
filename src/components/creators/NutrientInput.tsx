import React from 'react';
import NumericInput from '../forms/NumericInput';
import { INutrient } from './IngredientCreator/IngredientCreator';

export default function NutrientInput({ name, label, unitName }: INutrient) {
  const constructedLabel = unitName ? `${label} [ ${unitName} ]` : label;
  return <NumericInput name={name} label={constructedLabel} placeholder={0} />;
}
