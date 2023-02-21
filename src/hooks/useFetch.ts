import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (ep: string) => {
  const [data, setData] = useState<any>()

  async function fethData() {
    const response = await axios.get(ep)
    setData(response)
  }

  useEffect(() => {
    try {
      fethData()
    } catch (error: any) {
      console.log(error)
    }
  }, [])

  return data
}

export default useFetch
