import Loading from '@common/Loading'
import ListingPage from '@components/ListingPage'
import useFetch from '@hooks/useFetch'
import endPoints from '@services/api'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Modal from '@common/Modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import FormProduct from '@components/FormProduct'
import useAlert from '@hooks/useAlert'
import Alert from '@common/Alert'
import { deleteProducts } from '@services/api/products'

const PRODUCT_LIMIT = 10
const PRODUCT_OFFSET = 5

export default function Products() {
  const listInnerRef = useRef<HTMLDivElement>(null)
  const [currPage, setCurrPage] = useState(PRODUCT_LIMIT)
  const [products, setPoducts] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { alert, setAlert, toggleAlert } = useAlert(null)
  const dataProducts = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET))

  useEffect(() => {
    setPoducts(dataProducts?.data)
  }, [dataProducts])

  const CallLoad = () => {
    setLoading(true)
    axios
      .get(endPoints.products.getProducts(currPage, PRODUCT_OFFSET))
      .then((data: any) => {
        setPoducts(data.data)
        setLoading(false)
        console.log()
      })
      .catch((error: Error) => {
        setLoading(false)
        console.log(error)
      })
  }

  useEffect(CallLoad, [currPage, alert])

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + PRODUCT_LIMIT)
        console.log('paso')
      }
    }
  }

  const handleDelete = (id: number) => {
    deleteProducts(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Product delete',
          type: 'success',
          autoclose: true
        })
      })
      .catch((error: Error) => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: true
        })
      })
  }

  const styles = {
    container: {
      height: '60vh'
    }
  }

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            List of Prducts
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="button"
              onClick={() => setOpen(true)}
            >
              <PlusIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
              Add Product
            </button>
          </span>
        </div>
      </div>
      <div className="flex flex-col" style={styles.container}>
        <ListingPage
          handleDelete={handleDelete}
          listInnerRef={listInnerRef}
          products={products}
          onScroll={onScroll}
        />
        {loading ? <Loading /> : null}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setAlert={setAlert} setOpen={setOpen} />
      </Modal>
    </>
  )
}
