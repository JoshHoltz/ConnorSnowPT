import { useSearchParams } from 'react-router-dom';
import { ClientOverview } from '../../components/admin/ClientOverview'; 

const ViewClient = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('id');

  return (
    <div>
      {/* <h1>hello</h1>
      <h1>Editing Client #{clientId}</h1> */}
      <ClientOverview clientId={clientId} />
    </div>
  );
};

export default ViewClient;
