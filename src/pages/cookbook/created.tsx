// import React from 'react';
// import Layout from '../../components/Layout';

// import Loader from '../../components/Loader';
// import RecipeCard from '../../components/RecipeCard';
// import Link from 'next/link';
// import { BtnFilledStyles } from '../../components/styles';

// export default function CookbookCreated() {
//   if (data?.me) {
//     const { recipesCreated } = data.me;
//     return (
//       <Layout headerLabel="recipes created">
//         {recipesCreated.length === 0 ? (
//           <p>no recipes created</p>
//         ) : (
//           recipesCreated.map((r) => <RecipeCard recipe={r} key={r.id} />)
//         )}
//         <Link href="/create-ingredient">
//           <BtnFilledStyles>new ingredient</BtnFilledStyles>
//         </Link>
//         <Link href="/create-recipe">
//           <BtnFilledStyles>new recipe</BtnFilledStyles>
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
