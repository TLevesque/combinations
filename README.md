# combinations package

TO DO...

A very simple VS Code extension to generate all possible combinations between lists of words.<br />

Select lines where the lists you want to combine are and then press Cmd+Maj+P and select the command "Generate combinations".<br />

Optional, you can add a separator by adding a line with "separator:" followed by the separator you want between brackets.<br />

### Example:

By selecting this text:<br />

Apple<br />
Banana<br />
Cake<br />

Sweet<br />
Acid<br />

separator:' - '<br />

<br />
=> Will generate this:<br />

=== 6 combinations ===<br />
Apple - Sweet<br />
Apple - Acid<br />
Banana - Sweet<br />
Banana - Acid<br />
Cake - Sweet<br />
Cake - Acid<br />
=== END ===<br />
