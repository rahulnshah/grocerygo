export default function ToBuyItemSkeleton() {
  return (
    <div className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-gray-200 animate-pulse">
      {/* Skeleton for the item content */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Placeholder for item text */}
        <div className="h-3 bg-gray-300 rounded w-1/2"></div> {/* Placeholder for additional item text */}
      </div>

      {/* Skeleton for the buttons */}
      <div className="flex justify-between items-center mt-auto p-4">
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div> {/* Placeholder for delete button */}
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div> {/* Placeholder for edit button */}
      </div>
    </div>
  );
}
