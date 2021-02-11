Because the LiveServer extention watchs the project directory for
changes to know when to reload, this database file will cause
problems for us unless we ignore it. Type
<code>cmd/ctrl-shift-p</code> then enter "open settings". You are
looking for the "Preferences: Open Settings (JSON)" option. Select
it then find the portion with live server settings. Add a line to
ignore .json files in the server directory. It should look like
this:
"liveServer.settings.ignoreFiles": [
    "server/*.json",
    ".vscode/**",
    "**/*.scss",
    "**/*.sass",
    "**/*.ts"
]
