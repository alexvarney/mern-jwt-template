var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_HOST, { useNewUrlParser: true })
  .then(async () => {
    const users = await User.find();

    if (users.length === 0) {
      //Create default admin user if there's no users in the database
      const newAdmin = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("password", 8),
        role: 'admin',
      });

      newAdmin
        .save()
        .then(res =>
          console.log("Created default admin (admin@example.com; password)")
        )
        .catch(err => console.log(err));
    }
  })
  .catch(err => Console.log(err));


var apiRouter = require('./routes/api/apiRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('client/build'))

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


module.exports = app;
