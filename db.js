const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://root:root@p01.ijesd.mongodb.net/fitdb?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, () =>{ 
	console.log('DataBase is connect')
});




