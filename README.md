# IndexedDB
Demonstration of IndexedDB.  Uses Web Chrome Browser extension to serve web-page and idb for IndexedDB with support for Promises.  This example create a local store and shows how to store and retrieve data.

## Dependencies:

* idb           https://github.com/jakearchibald/idb

IndexedDB with Usability.   This small library enables promises to be use instead of events which make async coding simpler.  

## Development setup:

The code is using the async itterators feature of idb. Version 4.0.4 of idb is included to demonstrate offline use rather than importing directly from unpkg.com.  Alternatively you can use a module system such as webpack or Rollup. 