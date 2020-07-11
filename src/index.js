const express = require("express");
require('./db/mongoose');
const User = require("./models/user");
const Task = require("./models/task");
const userRoute = require('./routers/user');
const taskRoute = require('./routers/task');
const app = express();
const port = process.env.Port || 3000

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
    console.log('Server is up on port', +port);
});


// const jwt = require('jsonwebtoken');

// const myfun = async () => {
//     const token = jwt.sign({ _id: 'abc' }, 'thisismy', { expiresIn: '4 days' })
//     console.log(token)
//     const data = jwt.verify(token, 'thisismy')
//     console.log(data)
// }
// myfun()