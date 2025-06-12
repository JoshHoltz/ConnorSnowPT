import { useSearchParams } from 'react-router-dom';
import { ClientOverview } from '../../components/admin/ClientOverview'; 
import { ClientMetrics } from '../../components/admin/ClientMetrics';
import { ClientNotes } from '../../components/admin/ClientNotes';
import { PRs } from '../../components/admin/PRs';

const ViewClient = () => {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('id');

  return (
    <div>
      <ClientOverview clientId={clientId} />
      <ClientMetrics clientId={clientId} />
      <div className='flex'>
      <ClientNotes clientId={clientId} />
      <PRs clientId={clientId} />
      </div>

    </div>
  );
};

export default ViewClient;
