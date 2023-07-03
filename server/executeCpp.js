const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });

}

const executeCpp = (filePath) => {
const jobID=path.basename(filePath).split('.')[0];
const outPath =path.join(outputPath,`${jobID}.exe`).replace(/ /g, '\\ ');
const outputPath1=outputPath.replace(/ /g, '\\ ');
filePath=filePath.replace(/ /g, '\\ ');
return new Promise((resolve,reject)=>{
    exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath1} &&  .//${jobID}.exe`,(error,stdout,stderr)=>{
        if(error){
            reject({error,stderr});
        }
        if (stderr){
            reject({stderr})
        }
        resolve({stdout});
    });
})
};
module.exports={executeCpp};