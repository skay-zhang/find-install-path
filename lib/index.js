"use strict";

const childProcess = require('child_process');
const iconv = require('iconv-lite');

const regPath = 'HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\';

const CODE_PAGE = {
    '936': 'gbk',
    '65001': 'utf-8'
};
const encoding = 'binary';

function iconvDecode(txt, page) {
    return iconv.decode(Buffer.from(txt, encoding), page).trim();
}

function fundInstall(page, name, key) {
    return new Promise((resolve, reject) => {
        childProcess.exec(`reg query "${regPath}${name}" /v ${key}`, { encoding }, function (error, stdout, stderr) {
            if (error != null) {
                stderr = iconvDecode(stderr, page);
                reject('Application not found');
            } else {
                stdout = iconvDecode(stdout, page);
                if (stdout.lastIndexOf('REG_SZ') == -1) {
                    console.error('Find Error: Application not found');
                    reject('Application not found');
                } else {
                    let path = stdout.substring(stdout.lastIndexOf('REG_SZ') + 6).trim();
                    path = path.substring(0, path.lastIndexOf('\\')).trim();
                    path = path.replace(':\\',':\\\\');
                    resolve(path);
                }
            }
        });
    });
}

// Find the installation location of the application
exports.find = (name) => {
    return new Promise((resolve, reject) => {
        try {
            // Get active code page
            childProcess.exec('chcp', function (error, stdout, _stderr) {
                if (error) reject(error);
                let page = CODE_PAGE[stdout.replace(/[^0-9]/ig, '')];
                // Query the application installation location from the registry
                fundInstall(page, name, 'InstallLocation').then(res => {
                    resolve(res);
                }).catch(() => {
                    fundInstall(page, name, 'UninstallString').then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err)
                    });
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}