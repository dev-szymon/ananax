export const getUsdaNutrientData = (product: any, string: string) => {
  const n = product.foodNutrients.filter((nutrient: any) => {
    const { nutrientName, value, unitName } = nutrient;

    if (string === 'Energy') {
      if (nutrientName === string && unitName === 'KCAL') {
        const object = {
          amount: value || 'n/a',
          unitName: unitName,
        };
        return object;
      }
    } else if (nutrientName === string) {
      const object = {
        amount: value || 'n/a',
        unitName: unitName,
      };
      return object;
    }
  });

  return n[0] || 'n/a';
};

export const getUsdaData = (product: any) => {
  const { description, fdcId } = product;

  const data = {
    id: fdcId,
    source: 'usda',
    name: description,
    nutrients: {
      protein: getUsdaNutrientData(product, 'Protein'),
      kcal: getUsdaNutrientData(product, 'Energy'),
      fats: getUsdaNutrientData(product, 'Total lipid (fat)'),
      carbs: getUsdaNutrientData(product, 'Carbohydrate, by difference'),
    },
  };

  return data;
};
