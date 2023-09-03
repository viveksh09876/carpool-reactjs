import localforage from 'localforage'

var Store = localforage.createInstance({
  name: "carpool"
});

export default Store;