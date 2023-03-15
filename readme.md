# GitHub Logger

A simple logger for GitHub repositories, with various backends.

It support logging new commits from a list of repositories, to the console, to Discord, or to a custom backend. The last logged commit for each repository is remembered between restarts, to avoid duplications.

## Install

```sh
npm install --save github-logger
```

## Usage

```ts
import Logger, {console, discord} from 'github-logger';

// Let's define some options for our logger first of all

const options = {
  id: 'unique-id', // Unique ID, for data persistence
  discord: { // Discord-related options
    webhook: 'https://discord.com/api/webhooks/XXX/XXX' // Webhook URL to post to
  },
  github: { // GitHub-related options
    interval: 30_000, // Interval in milliseconds to check for new commits, 60 seconds by default
    since: new Date (), // Date after which to start looking for commits, if there's no last known commit
    token: 'ghp_XXX' // GitHub personal token to use, strongly recommended
  },
  loggers: [ // Loggers to use
    console, // Log to the console
    discord // Log to Discord
  ],
  repositories: [ // Repositories to watch
    {
      title: 'Github-Logger',
      repo: 'fabiospampinato/github-logger'
    },
    {
      title: 'Pioppo',
      repo: 'fabiospampinato/pioppo'
    }
  ]
};

// Let's create a logger

const logger = new Logger ( options );

// Starting the logger

logger.start ();

// Stopping the logger

logger.stop ();
```

## License

MIT © Fabio Spampinato
