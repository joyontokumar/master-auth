const express = require("express");
require('./db/mongoose');
const User = require("./models/user");
const Task = require("./models/task");
const userRoute = require('./routers/user');
const taskRoute = require('./routers/task');
const app = express();
const port = process.env.Port || 3000



const multer = require("multer");
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error('Please upload a jpg or png image'))
        }
        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);





app.listen(port, () => {
    console.log('Server is up on port', +port);
});
