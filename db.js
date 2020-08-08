const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_ROOT+'@demo.htdnu.mongodb.net/'+process.env.MONGO_DB+'?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, () =>{ 
	console.log('DataBase is connect')
});




