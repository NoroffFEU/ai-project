import express from "express";
import getResponse from "./routes/getResponse.mjs";
import cors from "cors";


const app = express()
const PORT = process.env.PORT || 8080
const allowedOrigins =  process.env.CLIENT_URLS.split(',')

app.use(express.json())
app.use(cors({ origin: allowedOrigins }))
app.use('/api/getresponse', getResponse)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})