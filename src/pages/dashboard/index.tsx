import Loading from '@common/Loading'
import ListingPage from '@components/ListingPage'
import useFetch from '@hooks/useFetch'
import endPoints from '@services/api'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const PRODUCT_LIMIT = 10
const PRODUCT_OFFSET = 5

export default function Dashboard() {
  const listInnerRef = useRef<HTMLDivElement>(null)
  const [currPage, setCurrPage] = useState(PRODUCT_LIMIT)
  const [products, setPoducts] = useState<any>([])
  const [loading, setLoading] = useState(false)
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

  useEffect(CallLoad, [currPage])

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + PRODUCT_LIMIT)
        console.log('paso')
      }
    }
  }

  const styles = {
    container: {
      height: '68vh'
    }
  }

  return (
    <>
      <div className="flex flex-col" style={styles.container}>
        <ListingPage listInnerRef={listInnerRef} products={products} onScroll={onScroll} />
        {loading ? <Loading /> : null}
      </div>
    </>
  )
}
