# Rounak-Raj__NodejsTask
I have used the following libraries
1->Express=It is used as a framework of Node.js. It is used for creating backend.
2->Multer=It is used for managing & storing files on server.
3->MySQL=It is used for creating an interface with database.


Routes which are created 
1->"http://localhost:8000/" 
After opening postman first you have to open body and go to the form-data
[{"key":"image","description":"","type":"file","enabled":true,"value":["select file to be uploaded"],"warning":"This file isn't in your working directory. Teammates you share this request with won't be able to use this file. To make collaboration easier you can setup your working directory in Settings."},{"key":"Name","value":"qwert","description":"","type":"text","enabled":true},{"key":"Address","value":"asdfg","description":"","type":"text","enabled":true},{"key":"Email","value":"a@gmail.com","description":"","type":"text","enabled":true},{"key":"Phone","value":"26541515","description":"","type":"text","enabled":true},{"key":"Password","value":"rttyguhijlh","description":"","type":"text","enabled":true},{"key":"psychiatrist","value":"1","description":"","type":"text","enabled":true}]
2->"http://localhost:8000/patient"
{
    "psychiatrist":phone no of psychatrist whose record you want to see
}
3->"http://localhost:8000/patientno"
{
    "psychiatrist":phone no of psychatrist whose record you want to see
}

