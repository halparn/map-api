const fs = require("fs");

fs.readFile('user-data.txt', (err, data)=>{
    if(err){
        console.log('blablabla');
        return
    } 
    console.log(data.toString());
})

fs.writeFile("user-data.txt", "userName=alperen", (err) => {
  if (err) {
    console.log(err);
  } else console.log("wrote file");
});

// console.log(name);
