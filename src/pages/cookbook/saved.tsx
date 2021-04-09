// import React from 'react';
// import Layout from '../../components/Layout';
// import Loader from '../../components/Loader';
// import { useRouter } from 'next/router';
// import RecipeCard from '../../components/RecipeCard';
// import Link from 'next/link';
// import { PrimaryButton } from '../../components/styles';

// export default function CookbookSaved() {
//   const router = useRouter();

//   if (data?.me) {
//     const { recipesSaved } = data.me;
//     return (
//       <Layout headerLabel="recipes saved">
//         {recipesSaved.length === 0 ? (
//           <p>no recipes saved</p>
//         ) : (
//           recipesSaved.map((r) => <RecipeCard recipe={r} key={r.id} />)
//         )}
//         <Link href="/create-ingredient">
//           <PrimaryButton>new ingredient</PrimaryButton>
//         </Link>

//         <Link href="/create-recipe">
//           <PrimaryButton>new recipe</PrimaryButton>
//         </Link>
//       </Layout>
//     );
//   }
//   if (!loading && !data?.me) {
//     router.replace('/login?next=' + router.pathname);
//     return (
//       <Layout>
//         <Loader />
//       </Layout>
//     );
//   }
// }
