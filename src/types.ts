
/* MAIN */

type Commit = {
  sha: string,
  node_id: string,
  commit: {
    author: {
      name: string,
      email: string,
      date: string
    },
    committer: {
      name: string,
      email: string,
      date: string
    },
    message: string,
    tree: {
      sha: string,
      url: string
    },
    url: string,
    comment_count: number,
    verification: {
      verified: boolean,
      reason: string,
      // signature
      // payload
    }
  },
  url: string,
  html_url: string,
  comments_url: string,
  author: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  committer: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  parents: {
    sha: string,
    url: string,
    html_url: string,
  }[]
};

type Job = {
  commit: Commit,
  options: OptionsRepo,
  timestamp: number
};

type Logger = {
  ( commit: Commit, repo: OptionsRepo, options: Options ): void
};

type Options = {
  id: string, // Unique ID, for data persistence
  discord?: { // Discord-related options
    webhook: string // Webhook URL to post to
  },
  github?: { // GitHub-related options
    interval?: number, // Interval in milliseconds to check for new commits
    since?: Date, // Date after which to start looking for commits
    token?: string // GitHub personal token to use, strongly recommended
  },
  loggers: Logger[], // Loggers to use
  repositories: OptionsRepo[] // Repositories to watch
};

type OptionsRepo = {
  title: string,
  repo: Repo
};

type Repo = `${string}/${string}`;

type StoreRecord = {
  date: string,
  hash: string
};

/* EXPORT */

export type {Commit, Job, Logger, Options, OptionsRepo, Repo, StoreRecord};
