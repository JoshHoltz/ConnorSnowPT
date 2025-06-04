import { useSearchParams } from 'react-router-dom';
import { ClientOverview } from '../../components/admin/ClientOverview'; 

const ViewClient = () => {
  const [searchParams] = useSearchParams(); //REF: https://reactrouter.com/en/main/hooks/use-search-params
  const clientId = searchParams.get('id');

  return (
    <div>
      <h1>Editing Client #{clientId}</h1>
      <ClientOverview />
    </div>
  );
};

export default ViewClient;