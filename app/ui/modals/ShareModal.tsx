import Search from './Search';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Users from './Users';
import { getListSharedUsers } from '@/app/lib/data';
import UnshareButton from './UnshareButton';
interface SharedUser {
  id: string;
  name: string;
  email: string;
  shared_at: string;
}

interface ShareModalProps {
  listId: string;
  ownerId: string;
  searchParams?: string;
}

const ShareModal: React.FC<ShareModalProps> = async ({ listId, ownerId, searchParams }) => {
  const query = searchParams || '';
  console.log("query", query);
  const sharedUsers = await getListSharedUsers(listId, ownerId) as { users: SharedUser[] };
  const sharedIds = new Set<string>(sharedUsers.users.map(user => user.id));
  console.log("sharedIds", sharedIds);
  return (
    <div className="bg-white rounded-lg shadow-xl">
      <div className="p-4">
        {/* <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Share</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div> */}

        <Search placeholder="Search for a user" />
        <Users listId={listId} ownerId={ownerId} searchQuery={query} sharedIds={sharedIds}/>
        <div className="space-y-2">
          {sharedUsers?.users?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Shared with
              </h3>
              <div className="space-y-2">
                {sharedUsers.users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <UnshareButton listId={listId} userId={user.id} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
