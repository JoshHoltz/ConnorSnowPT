import { useSearchParams } from 'react-router-dom';
 

const ViewClient = () => {
  const [searchParams] = useSearchParams(); //REF: https://reactrouter.com/en/main/hooks/use-search-params
  const clientId = searchParams.get('id');

  return (
    <div>
      <h1>Editing Client #{clientId}</h1>
    </div>
  );
};

export default ViewClient;
