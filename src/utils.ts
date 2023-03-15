
/* IMPORT */

import type {Commit, Repo} from '~/types';

/* MAIN */

const delay = ( ms: number ): Promise<void> => {

  return new Promise ( resolve => {

    setTimeout ( resolve, ms );

  });

};

const getGithubCommits = async ( repo: Repo, sinceDate?: string, sinceHash?: string, token?: string ): Promise<Commit[]> => {

  const commitsPerPage = 100;
  const endpoint = `https://api.github.com/repos/${repo}/commits?per_page=${commitsPerPage}&since=${sinceDate}`;
  const headers = token ? { 'Authorization': `token ${token}` } : undefined;
  const response = await ( await fetch ( endpoint, { headers } ) ).json ();

  const commits: Commit[] = response.filter ( ( commit: Commit ) => commit.sha !== sinceHash );
  const commitsNext = ( response.length === commitsPerPage ) ? await getGithubCommits ( repo, last ( commits ).commit.author.date, last ( commits ).sha, token ) : [];

  return [...commits, ...commitsNext];

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const last = <T> ( arr: T[] ): T => {

  return arr[arr.length - 1];

};

/* EXPORT */

export {delay, getGithubCommits, isString, last};
