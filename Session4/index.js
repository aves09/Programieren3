const os = require("os");
message = "The operation system is";

function main(){
    console.log(message + os.platform());
}

main();