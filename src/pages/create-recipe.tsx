// import { useRouter } from 'next/router';
// import React from 'react';
// import RecipeCreator from '../components/creators/RecipeCreator';
// import Layout from '../components/Layout';
// import Loader from '../components/Loader';
// import { isServer } from '../lib/isServer';

// export default function CreateRecipe() {
//   const router = useRouter();

//   if (loading || isServer) {
//     return (
//       <Layout>
//         <Loader />
//       </Layout>
//     );
//   }

//   if (data?.me) {
//     return (
//       <Layout>
//         <RecipeCreator />
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
