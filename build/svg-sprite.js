/*
 * @Author: nooldey 
 * @Date: 2017-08-10 18:21:39 
 * @Last Modified by: nooldey
 * @Last Modified time: 2017-08-14 18:22:19
 * @description: 自动提取assets中的svg文件并整合到统一输出文件
 */

const fs = require('fs')
const path = require('path')
const svgfolder = path.resolve(__dirname,'../src/assets/svg')

let writeString = '';
let count = 0;

const isFolder = f => !/\./.test(f)

const pickSvg = (folder) => {
    fs.readdir(folder,(err,file) => {
        if (err) {
            throw err
        }
        file.forEach((f) => {
            // 提取每个文件的内容
            if (isFolder(f)) {
                pickSvg(`${svgfolder}/${f}`)
            } else {
                count++;
                // 提取svg
                const ctx = fs.readFileSync(`${folder}/${f}`).toString().replace('\n','')
                // 提取文件中svg标签的内容
                let cont = ctx.match(/<svg\s*[^>]*>((.|\n)*)<\/svg>/)
                // 提取文件中svg的属性viewBox的值
                let vb = ctx.match(/viewBox=".+?"/)
                if (cont&&cont.length>1) {
                    let vbox = vb ? vb[0] : '';
                    let symbol = `<symbol id="${f.replace(/\..*/,'')}" ${vbox}>${cont[1]}</symbol>`
                    writeString += symbol+'\n';
                }
            }
        })
        writeSvg()
    })
}

const writeSvg = () => {
    fs.writeFile(
        './src/assets/svg.js',
        'export default `\n<svg>'+writeString+'</svg>`',
        (err) => {
            if(err){
                throw err
            }
            console.log('done!',count)
        }
    )
}

pickSvg(svgfolder)