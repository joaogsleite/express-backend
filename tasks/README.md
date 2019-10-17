

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


### `mysql:start`

start docker container with mysql database


### `mysql:stop`

stop docker container with mysql database


### `mysql:shell`

access mysql shell


#### `mysql:backup`

backup local database to `backup.sql` file


#### `mysql:restore`

restore `backup.sql` into local database


#### `mysql:web [-- PORT]`

starts phpMyAdmin web client in http://localhost:8006 or http://localhost:PORT


#### `mysql:deploy <server>`

deploys `backup.sql` to remote database


#### `forever:start`

starts forever


#### `forever:stop`

stops forever


#### `forever:restart`

restarts forever


#### `remote <server> <task>:<subtask>`

runs a task on remote server
