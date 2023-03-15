
/* IMPORT */

import toString from '~/loggers/string';
import type {Commit, Options, OptionsRepo} from '~/types';

/* MAIN */

const toConsole = ( commit: Commit, repo: OptionsRepo, options: Options ): void => {

  const message = toString ( commit, repo, options );

  console.log ( message );

};

/* EXPORT */

export default toConsole;
