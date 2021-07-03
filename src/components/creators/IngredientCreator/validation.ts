import * as yup from 'yup';

const nutrientRequiredMsg = 'Nutrient value required.';
const positiveNumberMsg = 'Value should be a positive number';

export const createIngredientYupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'At least 3 characters...')
    .required('Please provide ingredient name...'),
  kcal: yup.number().min(0).required(nutrientRequiredMsg),
  carbs: yup.number().min(0).required(nutrientRequiredMsg),
  protein: yup.number().min(0).required(nutrientRequiredMsg),
  fats: yup.number().min(0).required(nutrientRequiredMsg),
  glycemicIndex: yup
    .number()
    .min(
      0,
      "This field is optional, however we advise to look up and provide glycemic index. If ingredien't doesn't have carbs the glycemic index should be 0."
    ),
});
