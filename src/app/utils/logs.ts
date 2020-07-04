import fs from 'fs'

export const init = (baseDir: string) => {
    if (!fs.existsSync(`${baseDir}/logs`)) {
        fs.mkdirSync(`${baseDir}/logs`)
    }

    let date = new Date()

    let logs: fs.WriteStream | null = null
    let errs: fs.WriteStream | null = null

    console.log = (item: any) => {
        if (!logs) {
            logs = fs.createWriteStream(baseDir + `/logs/logs-${date.toISOString()}.log`, { flags: 'a' })
        }

        logs.write(`[${new Date().toISOString()}]: ${item}\n`)
    }

    console.error = (item: any) => {
        if (!errs) {
            errs = fs.createWriteStream(baseDir + `/logs/errors-${date.toISOString()}.log`, { flags: 'a' })
        }

        errs.write(`[${new Date().toISOString()}]: ${item}\n`)
    }
}