
export const ProductCardSkeleton = () => {
  return (
         <div className="bg-white rounded-md shadow-sm overflow-hidden aspect-auto">
            <div className="relative aspect-square">
                <div className="animate-pulse bg-gray-300 w-full h-full" />
            </div>
            <div className="p-4 space-y-1">
                <div className="animate-pulse rounded-md bg-gray-300 w-32 h-4" />
                <div className="animate-pulse rounded-md bg-gray-300 w-20 h-4" />
                <div className="flex items-center">
                    <div className="animate-pulse rounded-md bg-gray-300 w-10 h-4" />
                </div>
            </div>           
        </div>
  )
}

