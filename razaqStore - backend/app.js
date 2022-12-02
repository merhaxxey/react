require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

//db connection
const connectDB = require('./db/connect')

//cookie parser
const cookieParser = require('cookie-parser')
//error handlers
const notFoundMiddleware = require('./middleware/error-handler')
const errorHandlerMiddleware = require('./middleware/error-handler')

//routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const searchRoutes = require('./routes/searchRoutes')
const userProfileRoute = require('./routes/userProfileRoute')
const recentlyViewedRoutes = require('./routes/recentlyViewedRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

//middleware
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/cat', categoriesRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/review', reviewRoutes)
app.use('/api/v1/search', searchRoutes)
app.use('/api/v1/profile', userProfileRoute)
app.use('/api/v1/recentlyViewed', recentlyViewedRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order', orderRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(5000, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()