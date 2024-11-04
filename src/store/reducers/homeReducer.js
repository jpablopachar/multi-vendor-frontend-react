import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getCategories = createAsyncThunk(
  'product/getCategories',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-categories')

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-products')

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const productPriceRange = createAsyncThunk(
  'product/productPriceRange',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/product-price-range-latest')

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const queryProducts = createAsyncThunk(
  'product/queryProducts',
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ''
        } `
      )

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const productDetails = createAsyncThunk(
  'product/productDetails',
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product-details/${slug}`)

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const customerReview = createAsyncThunk(
  'review/customerReview',
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/customer/add-review', info)

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const getReviews = createAsyncThunk(
  'review/getReviews',
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
      )

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const getBanners = createAsyncThunk(
  'banner/getBanners',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/banners')

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
    totalProducts: 0,
    parPage: 3,
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: '',
    errorMessage: '',
    totalReview: 0,
    ratingReview: [],
    reviews: [],
    banners: [],
  },
  reducers: {
    messageClear: (state) => {
      state.successMessage = ''
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.categories
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.latestProduct = payload.latestProduct
        state.topRatedProduct = payload.topRatedProduct
        state.discountProduct = payload.discountProduct
      })
      .addCase(productPriceRange.fulfilled, (state, { payload }) => {
        state.latestProduct = payload.latestProduct
        state.priceRange = payload.priceRange
      })
      .addCase(queryProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.totalProducts = payload.totalProducts
        state.parPage = payload.parPage
      })
      .addCase(productDetails.fulfilled, (state, { payload }) => {
        state.product = payload.product
        state.relatedProducts = payload.relatedProducts
        state.moreProducts = payload.moreProducts
      })
      .addCase(customerReview.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.reviews = payload.reviews
        state.totalReview = payload.totalReview
        state.ratingReview = payload.ratingReview
      })
      .addCase(getBanners.fulfilled, (state, { payload }) => {
        state.banners = payload.banners
      })
  },
})

export const { messageClear } = homeReducer.actions
export default homeReducer.reducer
