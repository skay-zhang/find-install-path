const findInstallPath = require('../lib/index.js');

findEdgePath();
function findEdgePath() {
    findInstallPath.find('Microsoft Edge').then(res => {
        console.log('Edge is installed on ' + res);
    }).catch(err=>{
        // What should you do?
        console.log(err)
    })
}