const vscode = require("vscode");

const insertText = val => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage(
      "Can't insert log because no document is open"
    );
    return;
  }

  const selection = editor.selection;

  const range = new vscode.Range(selection.start, selection.end);

  const returnedString = parseString(val);

  editor.edit(editBuilder => {
    editBuilder.replace(range, returnedString);
  });
};

function activate(context) {
  const replaceAllImports = vscode.commands.registerCommand(
    "extension.findDuplicateLines",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      insertText("toto");
      // insertText(text);
    }
  );
  context.subscriptions.push(replaceAllImports);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
