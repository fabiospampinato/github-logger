
/* IMPORT */

import toString from '~/loggers/string';
import {delay} from '~/utils';
import type {Commit, Options, OptionsRepo} from '~/types';

/* MAIN */

const toDiscord = async ( commit: Commit, repo: OptionsRepo, options: Options ): Promise<void> => {

  const message = toString ( commit, repo, options );
  const webhook = options.discord?.webhook;

  if ( !webhook ) throw new Error ( 'Missing Discord webhook' );

  const response = await fetch ( webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      content: message
    })
  });

  if ( response.ok ) return;

  const json = await response.json ();
  const retryAfter = Number ( json.retry_after );

  if ( retryAfter <= 0 ) throw new Error ( 'Unable to post to Discord' );

  await delay ( retryAfter );

  await toDiscord ( commit, repo, options );

};

/* EXPORT */

export default toDiscord;
