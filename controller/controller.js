// const {PDFDocument, StandardFonts, rgb}  = require('pdf-lib')
// const fs = require('fs');

// const{
//     upload
// } = require('../server')

// exports.readPdfGetInput = async(req, res)=>{
    
//     upload(req, res, (err)=>{
//         if(err){
//             res.render('index.ejs', {
//                 msg:err
//             })
//         }else{
//             if(req.file == undefined){
//                 // res.redirect('/', {
//                 //     msg:'Error: No File Selected!'
//                 // })
//                 console.log('jnkj')
//                 res.render('index.ejs',{
//                     msg:'Error: No File Selected!'
//                 })
//             }else{
//                 // Required Value
//                 const requiredValue = [
//                     'আল আিমন ইসলাম',
//                     'Alamin Islam',
//                     'মাঃ ফজলুর রহমান',
//                     'রেহানা সুলতান',
//                     '1987-10-02',
//                     '4194421014',
//                     'বাসা/Ïহািŏং: Ɓপালী কেলানী',
//                     'কেলানী, åাম/রাũা: চর লÚী',
//                     'ডাকঘর: রামগিতরহাট - ৩৭৩২, রামগতী, লÚীপুর',
//                     'B+',
//                     'লÚীপুর',
//                     '২৭/০৯/২০২২'

//                 ]

//                 const pdfFile = `../upload/${req.file.filename}`
//                 // readFileAndGetValue(requiredValue, pdfFile);
            
//                 res.render('input.ejs', 
//                 {
//                     name:requiredValue[0],

//                 })
//             }
//         }
//     })
//     try{
       
//     }catch(err){
//         console.log(err)
//     }
// }

// exports.outputPdf = (req, res)=>{

//     res.render('output.ejs', {})
// }



// function readFileAndGetValue(arr, pdfFile){
//     arr.push('Anisul Islam');



//    }