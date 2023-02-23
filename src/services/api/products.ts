import axios from 'axios'
import endPoints from '.'

interface dataProduct {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

const addProducts = async (body: dataProduct) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.post(endPoints.products.postProducts, body, config)

  return response.data
}

const postProducts = async (body: dataProduct, id: string) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.put(endPoints.products.putProducts(id), body, config)

  return response.data
}

const deleteProducts = async (id: number) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.delete(endPoints.products.deleteProducts(id), config)

  return response.data
}

export { addProducts, deleteProducts, postProducts }
