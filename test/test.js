import { findInstallPath } from '../lib/index.js';

findEdgePath();
function findEdgePath() {
    findInstallPath('Microsoft Edge').then(res => {
        console.log('Edge is installed on ' + res);
    }).catch(err=>{
        // What should you do?
        console.log(err)
    })
}