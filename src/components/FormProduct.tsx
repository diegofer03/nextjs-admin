import { addProducts, postProducts } from '@services/api/products'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

const MAX_LENGTH = 50
const MAX_DESC = 200

export default function FormProduct({ setOpen, setAlert, product }: any) {
  const formRef = useRef<HTMLFormElement>(null)
  const [flagImage, setFlagImage] = useState(false)
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formdata = new FormData(formRef.current!)
    const data = {
      title: formdata.get('title') as string,
      price: parseInt(formdata.get('price') as string),
      description: formdata.get('description') as string,
      categoryId: parseInt(formdata.get('category') as string),
      images: product ? product.images : [(formdata.get('images') as File).name]
    }

    if (product) {
      console.log(data)
      postProducts(data, product.id)
        .then(() => {
          router.push('dashboard/products')
        })
        .catch((error: Error) => {
          console.log(error)
        })
    } else {
      addProducts(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Create succesfully',
            type: 'success',
            autoClose: true
          })
          setOpen(false)
        })
        .catch((error: Error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: true
          })
          setOpen(false)
        })
    }
  }

  useEffect(() => {
    const categoryTag = document.querySelector('#category')
    ;(categoryTag as HTMLSelectElement).value = product?.category?.id
    if (product) setFlagImage(true)
  }, [product])

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={product?.title}
                id="title"
                maxLength={MAX_LENGTH}
                name="title"
                type="text"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                Price
              </label>
              <input
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={product?.price}
                id="price"
                name="price"
                type="number"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="category">
                Category
              </label>
              <select
                required
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="category"
                name="category"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                required
                autoComplete="description"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                defaultValue={product?.description}
                id="description"
                maxLength={MAX_DESC}
                name="description"
              />
            </div>
            <div className="col-span-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="images">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        htmlFor="images"
                      >
                        <span>Upload a file</span>
                        <input
                          className="sr-only"
                          disabled={flagImage}
                          id="images"
                          name="images"
                          type="file"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
