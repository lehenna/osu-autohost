# Osu Autohost Commands

| name      | short name | description                                    | example   |
| --------- | ---------- | ---------------------------------------------- | --------- |
| help      | h          | Shows the list of commands.                    | !help     |
| config    | c          | Shows the lobby configuration.                 | !config   |
| pp <mods> |            | Obtain the possible PP values ​for a map.      | !pp HDHR  |
| rs        |            | Shows your recently obtained score.            | !rs       |
| playtime  | pt         | Shows the playing time of a user in the lobby. | !playtime |

The following commands are optional, that is, they are only present when autohost rotate is activated.

| name                    | short name | description                                                      | example   |
| ----------------------- | ---------- | ---------------------------------------------------------------- | --------- |
| queue                   | q          | Show the current auto host rotate queue.                         | !queue    |
| queuepos                | qp         | Show your current position in the queue.                         | !queuepos |
| autoskip                |            | Skip your turn automatically.                                    | !autoskip |
| start <time in seconds> |            | initializes a start timer or starts a start vote.                | !start 20 |
| skip                    |            | Skip your turn as host or start a vote to skip the current host. | !skip     |
| cancel                  |            | Cancels the start timer.                                         | !cancel   |
