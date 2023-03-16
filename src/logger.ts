
/* IMPORT */

import Store from '~/store';
import {getGithubCommits, timestamp} from '~/utils';
import type {Job, Options} from '~/types';

/* MAIN */

class Logger {

  /* VARIABLES */

  protected options: Options;
  protected store: Store;
  protected intervalId?: number;

  /* CONSTRUCTOR */

  constructor ( options: Options ) {

    this.options = options;
    this.store = new Store ( options.id );

    if ( !this.options.loggers.length ) throw new Error ( 'No loggers provided' );

  }

  /* API */

  tick = async (): Promise<void> => {

    console.log ( `[${timestamp ()}] Refreshing... `);

    try {

      const queue: Job[] = [];

      for ( const options of this.options.repositories ) {

        const record = this.store.get ( options.repo );
        const since = record ? record.date : this.options.github?.since?.toISOString () || new Date ().toISOString ();
        const hash = record ? record.hash : undefined;
        const token = this.options.github?.token;

        const commits = await getGithubCommits ( options.repo, since, hash, token );
        const jobs: Job[] = commits.map ( commit => ({ commit, options, timestamp: new Date ( commit.commit.author.date ).getTime () }) );

        queue.push ( ...jobs );

      }

      queue.sort ( ( a, b ) => a.timestamp - b.timestamp );

      for ( const job of queue ) {

        for ( const logger of this.options.loggers ) {

          await logger ( job.commit, job.options, this.options );

        }

        this.store.set ( job.options.repo, { date: job.commit.commit.author.date, hash: job.commit.sha } );

      }

    } catch ( error: unknown ) {

      console.log  ( `[${timestamp ()}] Errored` );
      console.log ( error );

    }

  }

  start = (): void => {

    if ( this.intervalId ) return;

    this.tick ();

    this.intervalId = setInterval ( this.tick, this.options.github?.interval || 60_000 );

  }

  stop = (): void => {

    if ( !this.intervalId ) return;

    clearInterval ( this.intervalId );

    this.intervalId = undefined;

  }

}

/* EXPORT */

export default Logger;
