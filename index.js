let multer  = require('multer');
let express = require('express');
let mysql=require('mysql')
let app     = express();
app.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwertyuiop',
    database:'lattice',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err){
        console.log('DB connection succeded.');
        let sql="CREATE TABLE if not exists psychiatrist (LastName varchar(255),FirstName varchar(255),Hospital_name varchar(255),phone_no int,pincode int,state varchar(255),primary key(phone_no));"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("psychiatrist table created");
        });
        sql="create table if not exists Patient (name varchar(255),Address varchar(255),Email varchar(255),Phone_no int,Password varchar(255),photo varchar(255));"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("patient table created");
        });
    }
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
let port = process.env.PORT || 8000;
app.listen(port,function(){
    console.log(`server is listening on port ${port}`);
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.post('/', upload.single('image'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var sql = `INSERT INTO patient (name, address,email,Phone_no, Password,photo,psychiatrist) VALUES ('${req.body.Name}', '${req.body.Address}','${req.body.Email}','${req.body.Phone}','${req.body.Password}','${req.file.filename}','${req.body.psychiatrist}');`;
  mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.send();
});
app.get('/patient',(req,res)=>{
    console.log(req.body);
    var sql=`select name,Address,Email,Phone_no,psychiatrist from patient where patient.psychiatrist=${req.body.psychiatrist};`;
    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        resul = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(resul[0]);
        res.send(resul[0]);
        return;
      });
    //   res.send();
});
app.get('/patientno',(req,res)=>{
    console.log(req.body);
    var sql=`select name from patient where patient.psychiatrist=${req.body.psychiatrist};`;
    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        result = Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result.length);
        res.send(`${result.length}`)
        return;
      });
    //   res.send();
});