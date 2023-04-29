const fs = require('fs');

const folderPath = "C:\\Users\\DELL\\Desktop\\myapp";
fs.readdir(folderPath , (err , files)=>{
    
    files.forEach((file,idx) =>{
        console.log("file = " + file);
        var filePath = "C:\\Users\\DELL\\Desktop\\myapp\\package.json";
        fs.readFile(filePath , 'utf-8' , (err , content)=>{
            console.log("content = " + content);
            // console.log("\n");
        });
    });
}); 