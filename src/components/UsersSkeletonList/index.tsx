function UsersCardSkeleton() {
  return (
    <div className="p-4 rounded-lg shadow-md w-[200px] h-[225px] bg-gray-200 animate-pulse flex flex-col items-center">
      <div className="mb-4 h-16 w-16 rounded-full bg-gray-300"></div>
      <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="flex items-center space-x-2 mb-2 w-full px-4">
        <div className="h-3 w-5 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center space-x-2 mb-2 w-full px-4">
        <div className="h-3 w-5 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center space-x-2 mb-2 w-full px-4">
        <div className="h-3 w-5 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center space-x-2 w-full px-4">
        <div className="h-3 w-5 bg-gray-300 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

function UsersSkeletonList() {
  return (
    <div className="flex flex-wrap gap-4 pb-32">
      {Array.from({ length: 10 }).map((_, index) => (
        <UsersCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default UsersSkeletonList;
