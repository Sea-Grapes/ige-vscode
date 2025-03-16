import { CompletionItem, CompletionItemKind, InsertTextFormat, MarkupKind, SignatureInformation } from 'vscode-languageserver/node'
import { parseMarkdown, parseRegions } from "./parser"
import { splitStr, read } from './utils'


const snippets = parseRegions(read('data/snippets.ige'))

// command for triggering signature help
const signatureHelpCommand = {
  title: 'triggerParameterHints',
  command: 'editor.action.triggerParameterHints'
}


const completionData: CompletionItem[] = [
  {
    label: 'setup',
    kind: CompletionItemKind.Property,
    detail: '(snippet) default setup snippet',
    insertTextFormat: InsertTextFormat.Snippet,
    insertText: snippets['setup']
  },
  {
    label: 'FILL|',
    kind: CompletionItemKind.Function,
    detail: '(util) FILL',
    command: signatureHelpCommand,
  }
]


const signatureData: Record<string, SignatureInformation | SignatureInformation[]> = {
  '40': {
    label: '40 X Y',
    documentation: {
      kind: MarkupKind.Markdown,
      value: ''
    },
    parameters: [
      { label: 'X' },
      { label: 'Y' }
    ]
  },
  'FILL': {
    label: 'FILL|X1 Y1|X2 Y2|RR GG BB',
    parameters: [
      { label: 'X1' },
      { label: 'Y1' },
      { label: 'X2' },
      { label: 'Y2' },
      { label: 'RR' },
      { label: 'GG' },
      { label: 'BB' },
    ]
  }
}

// parsing functions into completionData
const wordRegex = /\w+/
parseMarkdown(read('data/functions.md'), ({ heading, content }) => {
  let trigger = wordRegex.exec(heading)?.[0]
  if(!trigger) return

  let title = splitStr(heading, ' ')[1]
  
  const res: CompletionItem = {
    label: trigger,
    kind: CompletionItemKind.Function,
    detail: title,
    documentation: {
      kind: MarkupKind.Markdown,
      value: content
    },
    command: signatureHelpCommand,
    insertTextFormat: InsertTextFormat.PlainText,
    insertText: trigger + ' '
  }

  completionData.push(res)
})


export { completionData, signatureData }