const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const PDFDocument = require('pdfkit')
const {
    PdfReader
} = require('pdfreader');

const  bwipjs = require('bwip-js')


// Storage
const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname))
    }

})

// Init Upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('inputFile')


// Check File Type
function checkFileType(file, cb) {
    // Allows Ext
    const filetypes = /pdf/;

    // Check Etx
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    // Check Mime
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Pdf Only')
    }
}

// Setup Views
app.set('view engine', 'views');
app.set('views', __dirname + '/views');

// Use middleware
app.use(express.json())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}))

// Import Controller

// const {
//     readPdfGetInput,
//     outputPdf
// } = require('./controller/controller')

// Routing
app.get('/', (req, res) => {

    res.render('./index.ejs', {
        title: 'Homepage'
    })

})

app.get('/input', (req, res) => {
    res.redirect('/')
})

app.post('/input', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.render('index.ejs', {
                    msg: err
                })
            } else {
                if (req.file == undefined) {

                    res.render('index.ejs', {
                        msg: 'Error: No File Selected!'
                    })
                } else {
                    
                    const pdfFile = `./public/upload/${req.file.filename}`
                    
                    // Function Call For read given document and get required output 
                    // readFileAndGetValue(requiredValue, pdfFile);
                    
                    let str;
                    fs.readFile(pdfFile, (err, pdfBuffer) => {
                        
                        new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
                        
                        // Main array of input filed
                        const requiredValue = []

                            if (err) {
                                console.error("error:", err);
                            } else if (!item) {

                                // Array From Readfile
                                const newArr = str.split(' ')

                                //TODO: Bangla Name Filter
                                const temBanglaName = []
                                banglaNameFilter(newArr, temBanglaName);
                                // remove first element 
                                temBanglaName.shift()
                                let finalBanglaName = temBanglaName.join(' ')

                                finalBanglaName.length == 0 ? finalBanglaName = '-' : finalBanglaName

                                //    requiredValue.push(finalBanglaName)
                                requiredValue.push(finalBanglaName)


                                // console.log(finalBanglaName)

                                //TODO: English Name Filter
                                const temEnglishName = [];
                                englishNameFilter(newArr, temEnglishName);
                                temEnglishName.shift();
                                let finalEnglishName = temEnglishName.join(' ')

                                finalEnglishName.length == 0 ? finalEnglishName = '-' : finalEnglishName

                                requiredValue.push(finalEnglishName)
                                // console.log(finalEnglishName)

                                // TODO: Mother Name Filter
                                const temMotherName = [];

                                motherNameFilter(newArr, temMotherName);

                                temMotherName.shift();
                                let finalMotherName = temMotherName.join(' ')

                                finalMotherName.length == 0 ? finalMotherName = '-' : finalMotherName

                                requiredValue.push(finalMotherName)
                                // console.log(finalMotherName);


                                // TODO: Father Name Filter
                                const temFatherName = [];

                                fatherNameFilter(newArr, temFatherName);

                                temFatherName.shift();
                                let finalFatherName = temFatherName.join(' ')

                                finalFatherName.length == 0 ? finalFatherName = '-' : finalFatherName

                                requiredValue.push(finalFatherName)

                                // console.log(finalFatherName);

                                // TODO: Date Of Birth
                                const temDateOfBirth = [];

                                dateOfBirthFilter(newArr, temDateOfBirth);
                                temDateOfBirth.shift();

                                let finalDateOfBirth = temDateOfBirth.join(' ')


                                finalDateOfBirth.length == 0 ? finalDateOfBirth = '-' : finalDateOfBirth

                                requiredValue.push(finalDateOfBirth)

                                // console.log(finalDateOfBirth);

                                // TODO: NID No.
                                const temNidNo = [];

                                nidfilter(newArr, temNidNo);
                                temNidNo.shift();
                                let finalNidNo = temNidNo.join(' ')
                                if(temNidNo.length > 1){
                                    finalNidNo = temNidNo[0]
                                }

                                finalNidNo.length == 0 ? finalNidNo = '-' : finalNidNo

                                requiredValue.push(finalNidNo)

                                // console.log(finalNidNo)

                                // TODO: Home / Holding
                                const temHomeOrHoldingNo = [];

                                homeOrHoldingNoFilter(newArr, temHomeOrHoldingNo);
                                temHomeOrHoldingNo.shift();
                                if(temHomeOrHoldingNo[0] == 'No'){
                                    temHomeOrHoldingNo.shift();
                                }
                                let finalHomeOrHoldingNo = temHomeOrHoldingNo.join(' ')

                                finalHomeOrHoldingNo.length == 0 ? finalHomeOrHoldingNo = '-' : finalHomeOrHoldingNo

                                requiredValue.push(finalHomeOrHoldingNo)

                                // TODO: Village / Road
                                const temVillageRoad = [];

                                vilageRoadFilter(newArr, temVillageRoad);
                                temVillageRoad.shift();
                                
                                let finalVillageRoad= temVillageRoad.join(' ')

                                finalVillageRoad.length == 0 ? finalVillageRoad = '-' : finalVillageRoad

                                requiredValue.push(finalVillageRoad)

                                // TODO: Post Office

                                const temPostOffice = [];

                                postOfficeFilter(newArr, temPostOffice);
                                temPostOffice.shift();
                                
                                let finalPostOffice= temPostOffice.join(' ')

                                finalPostOffice.length == 0 ? finalPostOffice = '-' : finalPostOffice

                                requiredValue.push(finalPostOffice)



                                // TODO: Blood Group Filter
                                const temBloodgroup = [];

                                bllodGroupfilter(newArr, temBloodgroup);
                                temBloodgroup.shift();
                                let finalBloodGroup = temBloodgroup.join(' ')

                                finalBloodGroup.length == 0 ? finalBloodGroup = '-' : finalBloodGroup

                                requiredValue.push(finalBloodGroup)

                                // console.log(finalBloodGroup)

                                // TODO: Birth Place Filter
                                let temBirthPlace = [];

                                birthPlaceFilter(newArr, temBirthPlace);
                                temBirthPlace.shift();
                                let finalBirthPlace = temBirthPlace.join(' ')

                                finalBirthPlace.length == 0 ? finalBirthPlace = '-' : finalBirthPlace

                                requiredValue.push(finalBirthPlace)
                                // console.log(finalBirthPlace)

                                 // TODO: Issu date Creat

                                 let finalIssuDate  = new Date().toLocaleDateString()

                                 requiredValue.push(finalIssuDate)
                                 // console.log(finalBirthPlace)



                                console.log(newArr.slice(90))


                                res.render('input.ejs', {
                                        banglaName: requiredValue[0],
                                        englishName: requiredValue[1],
                                        fatherName: requiredValue[2],
                                        motherName: requiredValue[3],
                                        dateOfBirth: requiredValue[4],
                                        nidNo: requiredValue[5],
                                        homeOrHolding: requiredValue[6],
                                        villageOrRoad: requiredValue[7],
                                        postOffice: requiredValue[8],
                                        bloodGroup: requiredValue[9],
                                        birthPlace: requiredValue[10],
                                        issuDate: requiredValue[11]
                                })



                            } else if (item.text) {

                                // Make String Concatinate
                                str += ` ${item.text}`

                            }

                        })

                    })

                }
            }
        })

    } catch (err) {
        console.log(err)
    }
})

app.get('/output', (req, res) => {
    // res.render('./index.ejs', {})
    res.redirect('/')
})

app.post('/output', (req, res) => {


    // Qr Code Genarate
    let pin = req.body.pin
    pin == 'undefined' ? pin = '123456789' : pin = req.body.pin

    let barcodeText = `<pin>${pin}</pin><name>${req.body.englishName}</name><DOB>${req.body.dateOfBirth}</
    DOB><FP></FP><F>Right Index</F><TYPE>A</TYPE><V>2.0</V><ds>302c0214361c4747fec
    e26a9906b23110ce1d07979b3eb82021436cca028aabfe443577a61d823315698c4e93ac8</
    ds>`

    bwipjs.toBuffer({
        bcid: 'datamatrix',
        text: barcodeText,
        scale: 3,
        height: 15,
        includetext:true,
        textxalign:'center'
    },function (err, png){
       
        if(err) throw err;
        else{

            fs.writeFileSync('./public/upload/barcode.png', png)
        }
    })



    const nidDataArr = [];
    nidDataArr[0] = req.body.banglaName
    nidDataArr[1] = req.body.englishName
    nidDataArr[2] = req.body.fatherName
    nidDataArr[3] = req.body.motherName
    nidDataArr[4] = req.body.dateOfBirth
    nidDataArr[5] = req.body.nidNo
    nidDataArr[6] = req.body.homeOrHolding
    nidDataArr[7] = req.body.villageOrRoad
    nidDataArr[8] = req.body.postOffice
    nidDataArr[9] = req.body.bloodGroup
    nidDataArr[10] = req.body.birthPlace
    nidDataArr[11] = req.body.issuDate

    const doc = new PDFDocument({
        size: 'A4'
    });

    doc.pipe(fs.createWriteStream('./public/image/nid.pdf'))

    doc
        .image('./public/image/blank-1.png', 0, 15, {
            width: 600
        })

    doc 
        // bangla name
        .font('./public/image/Potro Sans Bangla Regular.ttf')
        .fillColor('black')
        .fontSize(12)
        .text(nidDataArr[0], 140, 119)// bangla name
        .font('Times-Roman')
        .text(nidDataArr[1].toUpperCase(), 140, 141) // english name
        .font('./public/image/Potro Sans Bangla Regular.ttf')
        .fontSize(8)
        .text(nidDataArr[2], 140, 157)// father name
        .text(nidDataArr[3], 140, 172)// mother name
        .font('Times-Roman')
        .fillColor('red')
        .text(nidDataArr[4], 166, 189)// date of birth
        .fontSize(12)
        .text(nidDataArr[5], 141.5, 200) // nid no.
        .font('./public/image/Potro Sans Bangla Regular.ttf')
        .fontSize(8)
        .fillColor('black')
        .text(` বাসা/হোল্ডিং: ${nidDataArr[6]},বাসা/ গ্রাম/রাস্তা: ${nidDataArr[7]}, ডাকঘর: ${nidDataArr[8]}`, 325, 97) // home/holding + village/road + postoffice
        .font('Times-Roman')
        .fillColor('red')
        .text(nidDataArr[9], 380, 136) //Blood
        .fillColor('black')
        .font('./public/image/Potro Sans Bangla Regular.ttf')
        .text(nidDataArr[10], 420, 135) // birth place
        .text(nidDataArr[11], 476, 167.5) // issu date
        .image('./public/upload/barcode.png', 305, 182.5, {width: 220, height:30})




    try {

        doc.pipe(res)

        doc.end()
    } catch (err) {
        console.log(err)
    }
})

app.get('/download', (req, res) => {
    res.redirect('/')
})
app.post('/download', (req, res) => {

    res.render('./download.ejs', {})

})


// TODO: ----------------------------------------------- Function ------------------------------------------ TODO:

// Filter value main funciton
// TODO: Bagla Name function
function banglaNameFilter(newArr, temBanglaName) {
    // Logical Variable
    let result = 0
    // let final = 0;
    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Name(Bangla)') {
            result = 1
        } else if (elem.trim() == 'Name(English)') {
            result = 0
        }

        // Push Require value
        if (result == 1) {

            temBanglaName.push(elem)
        }
    });
}

// TODO: English Name Function
function englishNameFilter(newArr, temEnglishName) {
    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Name(English)') {
            result = 1
        } else if (elem.trim() == 'Date') {
            result = 0
        }

        // Push Require value
        if (result == 1) {

            temEnglishName.push(elem)
        }

    });
}

// TODO: Mother Name Function
function motherNameFilter(newArr, temMotherName) {
    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Name' && newArr[index - 1].trim() == 'Mother') {
            result = 1
        } else if (elem.trim() == 'Spouse') {
            result = 0
        }

        // Push Require value
        if (result == 1) {

            temMotherName.push(elem)
        }

    });
}

// TODO: Father Name Function
function fatherNameFilter(newArr, temFatherName) {
    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Name' && newArr[index - 1].trim() == 'ather') {
            result = 1
        } else if (elem.trim() == 'Name' && newArr[index - 1].trim() == 'Father') {
            result = 1
        } else if (elem.trim() == 'Mother') {

            result = 0
        }


        // Push Require value
        if (result == 1) {

            temFatherName.push(elem)
        }

    });
}

// TODO: Date Of Birth Function
function dateOfBirthFilter(newArr, temDateOfBirth) {

    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Birth' && newArr[index - 1].trim() == 'of') {
            result = 1
        } else if (elem.trim() == 'Birth' && newArr[index + 1].trim() == 'Place') {

            result = 0
        }


        // Push Require value
        if (result == 1) {

            temDateOfBirth.push(elem)
        }

    });

}

// TODO: Nid Function
function nidfilter(newArr, temNidNo) {
    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'ID' && newArr[index - 1].trim() == 'National') {
            result = 1
        } else if (elem.trim() == 'Pin') {

            result = 0
        }


        // Push Require value
        if (result == 1) {

            temNidNo.push(elem)
        }

    });

}

// TODO: Home / Holding Function
function homeOrHoldingNoFilter(newArr, temHomeOrHoldingNo){

     let tempResult = []
     

     // Logical Variable
     let result = 0

     newArr.forEach((elem, index) => {
 
         // Logical Variable Assaign
         if (elem.trim() == 'Home/Holding' && newArr[index + 1].trim() == 'No') {
             result = 1
         } else if ((elem.trim() == 'P' && newArr[index+1].trim() == 'ost') || elem.trim() == 'Post' && newArr[index + 1] == 'Office') {
 
             result = 0
         }


 
 
         // Push Require value
         if (result == 1) {
 
            tempResult.push(elem)
         }
 
     });


     tempResult.slice((tempResult.length/2).toFixed()).forEach(e=>{
        temHomeOrHoldingNo.push(e)
     })



}

// TODO: Additional Road / Village
function vilageRoadFilter(newArr, temVillageRoad){

    let tempResult = []
     // Logical Variable
     let result = 0

     newArr.forEach((elem, index) => {
 
         // Logical Variable Assaign
         if (elem.trim() == 'Village/Road' && newArr[index - 1].trim() == 'Additional') {
             result = 1
         } else if (elem.trim() == 'Home/Holding' || (elem.trim() == 'Home/Holding' && newArr[index + 1].trim() == 'No')) {
 
             result = 0
         }
 
 
         // Push Require value
         if (result == 1) {
 
            tempResult.push(elem)
         }
 
     });

     
     tempResult.slice((tempResult.length/2).toFixed()).forEach(e=>{
         
        temVillageRoad.push(e)    
         
    })
     
}

// TODO: Post Office
function postOfficeFilter(newArr, temPostOffice){


    let tempResult = []
     // Logical Variable
     let result = 0

     newArr.forEach((elem, index) => {
 
         // Logical Variable Assaign
         if ((elem.trim() == 'Office' && newArr[index - 1].trim() == 'Post') || elem.trim() == 'Post Office') {
             result = 1
         } else if (elem.trim() == 'Postal Code' || (elem.trim() == 'Postal' && newArr[index + 1].trim() == 'Code')) {
 
             result = 0
         }
 
 
         // Push Require value
         if (result == 1) {
 
            tempResult.push(elem)
         }
 
     });

     
     tempResult.slice((tempResult.length/2).toFixed()).forEach(e=>{
         
        temPostOffice.push(e)    
         
    })

}

// TODO: Blood Group Function
function bllodGroupfilter(newArr, temBloodgroup) {

    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'Group' && newArr[index - 1].trim() == 'Blood') {
            result = 1
        } else if (elem.trim() == 'TIN') {

            result = 0
        }


        // Push Require value
        if (result == 1) {

            temBloodgroup.push(elem)
        }

    });

}

// TODO: Birth Place Function
function birthPlaceFilter(newArr, temBirthPlace) {

    const temArr1 = [];
    // Logical Variable
    let result = 0

    newArr.forEach((elem, index) => {

        // Logical Variable Assaign
        if (elem.trim() == 'District') {
            result = 1
        } else if (elem.trim() == 'RMO') {

            result = 0
        }


        // Push Require value
        if (result == 1) {

            temArr1.push(elem)
        }

    });

    temArr1.slice((temArr1.length / 2).toFixed()).forEach(e => {
        temBirthPlace.push(e)
    })


}

function issuDateConverBangla(tempIssuDate){
    // const 
}





// listening
app.listen(6500, (err) => {
    if (err) {
        console.log(err)

    } else {
        console.log(`SERVER IS RUNNING ON PORT`)
    }
})