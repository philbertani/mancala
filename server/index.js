
const PORT = process.env.PORT || 8080
const app = require('./app')

const init = async () => {
  try {
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Using Port: ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

console.log(process.env)

init()
