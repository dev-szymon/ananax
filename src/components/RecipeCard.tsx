// import styled from 'styled-components';
// import { NutrientSimpleStyles, PlainButton, SingleRow } from './styles';
// import { More, Heart, Book } from '../images';
// import Link from 'next/link';
// import { useQuery, useMutation } from '@apollo/client';
// import {
//   ME_QUERY,
//   TOGGLE_LIKE_RECIPE,
//   TOGGLE_SAVE_RECIPE,
// } from '../lib/queries';

// const RecipeCardStyles = styled.div`
//   width: 100%;
//   border-bottom: 1px solid var(--colorPrimary);
//   img {
//     width: 100%;
//     max-width: 100%;
//   }
//   .username-tag {
//     font-size: 0.875rem;
//     color: var(--colorSecondaryText);
//   }
// `;

// const LikeAndSaveStyles = styled.div`
//   display: flex;
//   justify-content: space-around;
//   width: var(--lengthLg3);
// `;

// interface Props {
//   recipe: {
//     id: string;
//     name: string;
//     images: string[];
//     createdBy: { id: string; username: string };
//     kcal: number;
//   };
// }
// export default function RecipeCard({ recipe }: Props) {
//   const { name, images, id, createdBy, kcal } = recipe;
//   const { data, loading, error } = useQuery(ME_QUERY);
//   const { liked, recipesSaved } = data?.me;

//   const [toggleLikeRecipe] = useMutation(TOGGLE_LIKE_RECIPE);
//   const [toggleSaveRecipe] = useMutation(TOGGLE_SAVE_RECIPE);
//   return (
//     <RecipeCardStyles>
//       <SingleRow>
//         <Link href={`/users/${id}`}>
//           <span className="username-tag">{`@${createdBy.username}`}</span>
//         </Link>
//         <PlainButton>
//           <More fill="var(--colorThird)" />
//         </PlainButton>
//       </SingleRow>
//       <Link href={`/recipes/${id}`}>
//         <SingleRow>
//           <h2 style={{ fontSize: '1rem', cursor: 'pointer' }}>{name}</h2>
//         </SingleRow>
//       </Link>
//       <img src={images[0]} />
//       <SingleRow>
//         <NutrientSimpleStyles>
//           <span className="nutrient-value">{kcal}</span>{' '}
//           <span className="nutrient-label">kcal </span>
//         </NutrientSimpleStyles>
//         <LikeAndSaveStyles>
//           <PlainButton
//             onClick={() =>
//               toggleLikeRecipe({
//                 variables: { recipe: id },
//                 update: (cache, { data }) => {
//                   cache.writeQuery({
//                     query: ME_QUERY,
//                     data: {
//                       __typename: `Query`,
//                       me: data?.toggleLikeRecipe,
//                     },
//                   });
//                 },
//               })
//             }
//           >
//             <Heart isActive={liked.some((r: { id: string }) => r.id === id)} />
//           </PlainButton>
//           <PlainButton
//             onClick={() =>
//               toggleSaveRecipe({
//                 variables: { recipe: id },
//                 update: (cache, { data }) => {
//                   cache.writeQuery({
//                     query: ME_QUERY,
//                     data: {
//                       __typename: `Query`,
//                       me: data?.toggleSaveRecipe,
//                     },
//                   });
//                 },
//               })
//             }
//           >
//             <Book
//               isActive={recipesSaved.some((r: { id: string }) => r.id === id)}
//             />
//           </PlainButton>
//         </LikeAndSaveStyles>
//       </SingleRow>
//     </RecipeCardStyles>
//   );
// }
