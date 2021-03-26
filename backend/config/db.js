import mongoose from 'mongoose'

const connectDB = () => {
  const conn = mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
    .then(response => {
      console.log(`Mongo DB Connected: ${response.connection.host}`.cyan.underline)
    })
    .catch(error => {
      console.error(`Error: ${error.message}`.red.underline.bold)
      process.exit(1)
    })
}

export default connectDB