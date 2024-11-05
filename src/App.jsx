import { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getCategories } from './store/reducers/homeReducer'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Shops = lazy(() => import('./pages/Shops'))
const Card = lazy(() => import('./pages/Card'))
const Shipping = lazy(() => import('./pages/Shipping'))
const Payment = lazy(() => import('./pages/Payment'))
const CategoryShop = lazy(() => import('./pages/CategoryShop'))
const SearchProducts = lazy(() => import('./pages/SearchProducts'))
const Details = lazy(() => import('./pages/Details'))
const ConfirmOrder = lazy(() => import('./pages/ConfirmOrder'))
const ProtectUser = lazy(() => import('./router/routes/ProtectUser'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Index = lazy(() => import('./components/dashboard'))
const Orders = lazy(() => import('./components/dashboard/Orders'))
const ChangePassword = lazy(() =>
  import('./components/dashboard/ChangePassword')
)
const Wishlist = lazy(() => import('./components/dashboard/Wishlist'))
const OrderDetails = lazy(() => import('./components/dashboard/OrderDetails'))
const Chat = lazy(() => import('./components/dashboard/Chat'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
