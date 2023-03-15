
/* IMPORT */

import {LocalStore} from 'isostore';
import {isString} from '~/utils';
import type {StoreRecord} from '~/types';

/* MAIN */

class Store {

  /* VARIABLES */

  private store: LocalStore;

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    this.store = new LocalStore ( `github-logger-${id}` );

  }

  /* API */

  get = ( repo: string ): StoreRecord | undefined => {

    try {

      const recordRaw = this.store.get ( repo );

      if ( !recordRaw ) return;

      const record = JSON.parse ( recordRaw );

      if ( !isString ( record.date ) ) return;
      if ( !isString ( record.hash ) ) return;

      return record;

    } catch {

      return;

    }

  }

  set = ( repo: string, record: StoreRecord ): void => {

    this.store.set ( repo, JSON.stringify ( record ) );

  }

}

/* EXPORT */

export default Store;
