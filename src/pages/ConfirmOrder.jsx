import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import api from '../api/api'

const load = async () => {
  return await loadStripe(import.meta.env.VITE_STRIPE_KEY)
}

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true)
  const [stripe, setStripe] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!stripe) return

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('succeeded')
          break
        case 'processing':
          setMessage('processing')
          break
        case 'requires_payment_method':
          setMessage('failed')
          break
        default:
          setMessage('failed')
      }
    })
  }, [stripe])

  const getLoad = async () => {
    const tempStripe = await load()

    setStripe(tempStripe)
  }

  useEffect(() => {
    getLoad()
  }, [])

  const updatePayment = async () => {
    const orderId = localStorage.getItem('orderId')

    if (orderId) {
      try {
        await api.get(`/order/confirm/${orderId}`)

        localStorage.removeItem('orderId')

        setLoader(false)
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }

  useEffect(() => {
    if (message === 'succeeded') updatePayment()
  }, [message])

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === 'failed' || message === 'processing' ? (
        <>
          <img src="/images/error.png" alt="" />
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to="/dashboard/my-orders"
          >
            Back to Dashboard{' '}
          </Link>
        </>
      ) : message === 'succeeded' ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img src="/images/success.png" alt="" />
            <Link
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
              to="/dashboard/my-orders"
            >
              Back to Dashboard{' '}
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  )
}

export default ConfirmOrder
