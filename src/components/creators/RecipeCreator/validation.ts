import * as yup from 'yup';

const positiveNumberMsg = 'Value should be a positive number';

export const createRecipeYupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'At least 3 characters...')
    .required('Please provide recipe name...'),
  prepTime: yup
    .number()
    .positive(positiveNumberMsg)
    .required('Please provide preparation time.'),
  description: yup
    .string()
    .required('Please tell others how to prepare the dish.'),
});
