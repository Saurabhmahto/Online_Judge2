const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });

}

const executeCpp = (filePath) => {
const jobID=path.basename(filePath).split('.')[0];
const outPath =path.join(outputPath,`${jobID}.exe`);
// const outputPath1=outputPath.replace(/ /g, '\\');
// filePath=filePath.replace(/ /g, '\\');
// console.log(`g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" &&  "./${jobID}.exe"`);
return new Promise((resolve,reject)=>{
    exec(`g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" &&  "./${jobID}.exe"`,(error,stdout,stderr)=>{
        if(error){
            // console.log(error);
            reject({error,stderr});
        }
        if (stderr){
            // console.log(stderr);

            reject({stderr})
        }
        resolve({stdout});
    });

})
};
module.exports={executeCpp};