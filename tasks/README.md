

### Run

```
npm run task -- <task>:<subtask> args...
```

### Available tasks


#### `clean`

remove build files


#### `build`

build typescript to build folder


#### `deploy <server>`

send build folder and necessary files to server

restart forever in remote server


### `db:start`

start docker container with mysql database


### `db:stop`

stop docker container with mysql database


### `db:shell`

access mysql shell


#### `db:backup`

backup local database to `backup.sql` file


#### `db:restore`

restore `backup.sql` into local database


#### `db:deploy <server>`

deploys `backup.sql` to remote database


#### `forever:start`

starts forever


#### `forever:stop`

stops forever


#### `forever:restart`

restarts forever


#### `remote <server> <task>:<subtask>`

runs a task on remote server
