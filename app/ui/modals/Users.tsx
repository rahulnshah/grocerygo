import { searchUsers } from "@/app/lib/data";
import ShareButton from "./ShareButton";
import UnshareButton from "./UnshareButton";

export default async function Users({ listId, ownerId, searchQuery, sharedIds }: { listId: string, ownerId: string, searchQuery: string, sharedIds: Set<string> }) {
    const users = await searchUsers(searchQuery, ownerId, listId);
    console.log("searched users", users.users);
    return (
        <>
        {searchQuery.length >= 2 && users?.users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name!)}`}
                  alt={user.name || ''}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              {sharedIds.has(user.id?.toString() || '') ? (
                <UnshareButton listId={listId} userId={user.id?.toString() || ''} />
              ) : (
                <ShareButton listId={listId} userId={user.id?.toString() || ''} />
              )}
            </div>
          ))}
        </>
    );
}