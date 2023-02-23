import FormProduct from '@components/FormProduct'
import endPoints from '@services/api'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Edit() {
  const [product, setProduct] = useState()
  const [notFound, setNotFound] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const { id } = router.query
    if (!router?.isReady) return
    async function getProduct() {
      try {
        const response = await axios.get(endPoints.products.getProduct(id as string))
        setProduct(response.data)
      } catch (error) {
        console.log(error)
        setNotFound(true)
      }
    }
    getProduct()
  }, [router?.isReady])
  return notFound ? (
    <div className="text-center text-red-700"> Product Not Found </div>
  ) : (
    <FormProduct product={product} />
  )
}
