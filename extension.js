const vscode = require("vscode");

const combinator = text => {
  const itemsArr = text.split("\n");

  const arrs = [];
  let a = [];
  let separator = null; // ?

  itemsArr.forEach(el => {
    if (/^separator:/.test(el)) {
      if (el.match(/"(.*)"/) && el.match(/"(.*)"/).pop()) {
        separator = el.match(/"(.*)"/).pop();
      }
      if (el.match(/'(.*)'/) && el.match(/'(.*)'/).pop()) {
        separator = el.match(/'(.*)'/).pop();
      }
    } else {
      if (el.length) {
        a.push(el);
      }
      if (!el.length) {
        if (a.length) {
          arrs.push(a);
        }
        a = [];
      }
    }
  });

  const recursiveFunc = (...lists) => {
    const combinations = [];
    const max = lists.length - 1;
    const helper = (arr, i) => {
      for (let j = 0, l = lists[i].length; j < l; j++) {
        const a = arr.slice(0);
        a.push(lists[i][j]);
        if (i === max) combinations.push(a);
        else helper(a, i + 1);
      }
    };
    helper([], 0);
    return combinations;
  };

  const resultArr = recursiveFunc(...arrs).map(el => el.join(separator || " "));
  return [
    `\n=== ${resultArr.length} combinations ===`,
    ...resultArr,
    "=== END ==="
  ].join("\n");
};

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

  const returnedString = combinator(val);

  editor.edit(editBuilder => {
    editBuilder.insert(selection.end, returnedString);
  });
};

function activate(context) {
  const replaceAllImports = vscode.commands.registerCommand(
    "extension.combinations",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      // insertText("toto");
      insertText(text);
    }
  );
  context.subscriptions.push(replaceAllImports);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
