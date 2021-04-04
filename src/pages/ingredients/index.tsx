import * as React from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

export default function IngredientsPage() {
  const { isLoading, error, data } = useQuery('ingredients', async () => {
    const response = await fetch(
      'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=tIhYSTVEHtMz4AcuBgeI0VnGi7ttWl3hfYYluwhV',
      {
        body: `{"query": "carrot", "dataType": ["SR Legacy"], "sortBy": "fdcId", "sortOrder": "desc"}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    const data = await response.json();
    return data;
  });

  if (data) {
    console.log(data);

    return (
      <Layout>
        <div>ingredients</div>
      </Layout>
    );
  }
  if (isLoading) {
    return <Loader></Loader>;
  }
}
