
/* IMPORT */

import type {Commit, Options, OptionsRepo} from '~/types';

/* MAIN */

const toString = ( commit: Commit, repo: OptionsRepo, options: Options ): string => {

  const title = repo.title;
  const message = commit.commit.message;

  return `${title} - ${message}`;

};

/* EXPORT */

export default toString;
