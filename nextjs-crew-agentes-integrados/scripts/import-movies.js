import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('JV3WUFKTAI', '4a1c7b7d52925015ef347b857e62a70b');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
  const movies = await datasetRequest.json();
  return await client.saveObjects({ indexName: 'movies_index', objects: movies });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));