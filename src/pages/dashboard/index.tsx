import { Chart } from '@common/chart'
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

  const categoryNames = products?.map((product: any) => product.category)
  const categoryCount = categoryNames?.map((cate: any) => cate.name)

  const countOccurrences = (array: Array<string>) =>
    array?.reduce((prev: any, curr: any) => ((prev[curr] = ++prev[curr] || 1), prev), {})

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#d32244', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0']
      }
    ]
  }

  return (
    <>
      <Chart chartData={data} className="mb-8 mt-2" />
      <div className="flex flex-col" style={styles.container}>
        <ListingPage listInnerRef={listInnerRef} products={products} onScroll={onScroll} />
        {loading ? <Loading /> : null}
      </div>
    </>
  )
}
