"use strict";

import childProcess from 'child_process';
import iconv from 'iconv-lite';

const regPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\';

const CODE_PAGE = {
    '936': 'gbk',
    '65001': 'utf-8'
};
const encoding = 'binary';

function iconvDecode(txt, page) {
    return iconv.decode(Buffer.from(txt, encoding), page).trim();
}

// Find the installation location of the application
function findInstallPath(name) {
    return new Promise((resolve, reject) => {
        try {
            // Get active code page
            childProcess.exec('chcp', function (error, stdout, _stderr) {
                if (error) reject(error);
                let page = CODE_PAGE[stdout.replace(/[^0-9]/ig, '')];
                // Query the application installation location from the registry
                childProcess.exec(`reg query "${regPath}${name}" /v InstallLocation`, { encoding }, function (error, stdout, stderr) {
                    if (error != null) {
                        console.log(error)
                        stderr = iconvDecode(stderr, page);
                        console.error('Find Error: %d', error)
                        reject('Application not found');
                    } else {
                        stdout = iconvDecode(stdout, page);
                        if (stdout.lastIndexOf('REG_SZ') == -1) {
                            console.error('Find Error: Application not found');
                            reject('Application not found');
                        } else {
                            let path = stdout.substring(stdout.lastIndexOf('REG_SZ') + 6).trim();
                            path = path.substring(0, path.lastIndexOf('\\')).trim();
                            resolve(path);
                        }
                    }
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = findInstallPath