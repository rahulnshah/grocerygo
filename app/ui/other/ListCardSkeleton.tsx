export default function ListCardSkeleton() {
  return (
    <div className="w-full bg-gray-200 rounded-lg shadow-md animate-pulse">
      <div className="p-4">
        {/* Title and description skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
        
        {/* Shared users skeleton */}
        <div className="flex items-center mt-2 space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full -ml-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Progress skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2 mt-4"></div>

        {/* Actions skeleton */}
        <div className="flex justify-between items-center mt-4 space-x-1">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
