import authReducer from './reducers/authReducer'
import cardReducer from './reducers/cardReducer'
import chatReducer from './reducers/chatReducer'
import dashboardReducer from './reducers/dashboardReducer'
import homeReducer from './reducers/homeReducer'
import orderReducer from './reducers/orderReducer'

const rootReducer = {
  auth: authReducer,
  card: cardReducer,
  chat: chatReducer,
  dashboard: dashboardReducer,
  home: homeReducer,
  order: orderReducer,
}

export default rootReducer
