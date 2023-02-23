import { Chart } from '@common/chart'
import useFetch from '@hooks/useFetch'
import endPoints from '@services/api'
import { useEffect, useState } from 'react'

const PRODUCT_LIMIT = 0
const PRODUCT_OFFSET = 0

export default function Dashboard() {
  const [products, setPoducts] = useState<any>([])
  const dataProducts = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET))

  useEffect(() => {
    setPoducts(dataProducts?.data)
  }, [dataProducts])

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
    </>
  )
}
