import React, { useRef, useState } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { IIngredientData, NutrientKeys } from '../../../types/ingredients';
import IngredientSearchResult from '../../IngredientSearchResult';
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useIngredientsSelector } from '../../../context/ingredientsSelectorContext';

const DISPLAY_NUTRIENTS: NutrientKeys[] = ['kcal', 'protein', 'fats', 'carbs'];

const IngredientSelector = () => {
  const {
    ingredients: contextIngredients,
    setIngredients: setContextIngredients,
  } = useIngredientsSelector();
  const [results, setResults] = useState<any[] | null>(null);
  const btnRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        {Object.keys(contextIngredients).length > 0 && (
          <Heading as="h5" fontSize="1rem" marginBottom="1rem">
            Ingredients
          </Heading>
        )}

        {Object.keys(contextIngredients).map((ingr) => {
          const { [ingr]: des, ...rest } = contextIngredients;
          const { name, nutrients, id, amount } = contextIngredients[ingr];
          return (
            <Box>
              <Flex justify="space-between">
                <h5>{name}</h5>
                <CloseButton
                  size="sm"
                  onClick={() => setContextIngredients({ ...rest })}
                />
              </Flex>

              <Box>
                {DISPLAY_NUTRIENTS.map((nutrientKey) => {
                  const { unitName, value } = nutrients[nutrientKey];
                  const constructedLabel = unitName
                    ? `${nutrientKey} [ ${unitName} ]`
                    : nutrientKey;
                  return (
                    <Flex
                      direction="column"
                      align="flex-start"
                      key={nutrientKey}
                    >
                      <span className="nutrient-label">{constructedLabel}</span>
                      <div className="nutrient-value">{`${
                        value || 'n/a'
                      }`}</div>
                    </Flex>
                  );
                })}
                <Flex direction="column" align="flex-end">
                  <span className="nutrient-label">{` [ ${amount.unitName} ]`}</span>
                  <Box>
                    <input
                      style={{
                        backgroundColor: 'var(--colorWhite)',
                        textAlign: 'right',
                        width: '100%',
                      }}
                      type="number"
                      value={amount.value}
                      onChange={(e) => {
                        setContextIngredients({
                          ...contextIngredients,
                          [ingr]: {
                            ...contextIngredients[ingr],
                            amount: {
                              value: Number(e.target.value),
                              unitName: amount.unitName,
                            },
                          },
                        });
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Button marginBottom="1rem" type="button" onClick={onOpen}>
        + add ingredients
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent p="1rem 0">
          <DrawerBody>
            <Formik
              initialValues={{ search: '' }}
              onSubmit={async (values) => {
                const response = await fetch(
                  `/api/search-ingredients/${values.search}`
                );

                const { ingredients }: { ingredients: IIngredientData[] } =
                  await response.json();

                setResults([...ingredients]);
              }}
            >
              <Form>
                <Flex align="center" justify="space-between">
                  <Field
                    type="search"
                    name="search"
                    placeholder="search ingredients..."
                    autoComplete={'off'}
                  >
                    {({ field, form }: FieldProps) => (
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<SearchIcon color="gray.300" />}
                        />
                        <Input
                          type="search"
                          placeholder="search..."
                          variant="filled"
                          focusBorderColor="green.900"
                          {...field}
                        />
                      </InputGroup>
                    )}
                  </Field>
                  <Button
                    variant="ghost"
                    colorScheme="pink"
                    type="submit"
                    textAlign="center"
                  >
                    search
                  </Button>
                  <DrawerCloseButton position="relative" top={0} right={0} />
                </Flex>
              </Form>
            </Formik>

            {results &&
              results.map((ingredient) => (
                <IngredientSearchResult
                  key={ingredient.id}
                  ingredient={ingredient}
                />
              ))}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IngredientSelector;
