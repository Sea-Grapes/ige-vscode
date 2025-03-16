
import * as fs from 'fs'
import * as path from 'path'

export const basePath = path.resolve(__dirname, '..')
export const read = file => fs.readFileSync(path.join(basePath, file), 'utf-8')

export const rgx_newline = /\r?\n/

export function splitStr(string: string, delimiter: string): [string, string] {
  const i = string.indexOf(delimiter)
  if(i === -1) return [string, '']
  return [string.slice(0,i), string.slice(i+1)]
}