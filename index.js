/* import app from './app.js' */
const app = require('./app.js')
const AppPORT = process.env.PORT || 5001

app.listen(AppPORT, () => {
    console.log(`Server started on port ${AppPORT}`);
})


