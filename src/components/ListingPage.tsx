import { XCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ListingPage({ onScroll, listInnerRef, products, handleDelete }: any) {
  return (
    <div ref={listInnerRef} className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" onScroll={onScroll}>
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Category
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Price
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  scope="col"
                >
                  Description
                </th>
                <th className="relative px-6 py-3" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
                <th className="relative px-6 py-3" scope="col">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product: any) => (
                <tr key={`product-item-${product.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img alt="" className="h-10 w-10 rounded-full" src={product.images[0]} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ${product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      className="text-indigo-600 hover:text-indigo-900"
                      href={`/dashboard/edit/${product.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <XCircleIcon
                      aria-hidden="true"
                      className="-ml-1 mr-2 h-5 w-5"
                      onClick={() => {
                        handleDelete(product.id)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
