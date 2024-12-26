export default function Users({ searchQuery, sharedIds }: { searchQuery: string, sharedIds: Set<string> }) {
    
    return (
        {searchQuery.length >= 2 && users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <img
                  src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(user.id)}
                className="text-orange-500 hover:text-orange-600"
              >
                Share
              </button>
            </div>
          ))}
    )
}