// @flow

import { from } from 'rxjs/observable/from'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { map as map$ } from 'rxjs/operators/map'

import zipObj from './zipObj'


// Transforms an object of Observables into an Observable of an object
// i.e. { a: Observable<number>, b: Observable<string> } -> Observable<{ a: number, b: string }>
export default function combineLatestObject(object) {
  const keys = Object.keys(object)
  const observables = Object.values(object)

  // Optimization: If subscribing just one observable, skip combineLatest
  if (keys.length === 1) {
    const key = keys[0]
    return from(observables[0]).pipe(map$(value => ({ [key]: value })))
  }

  return combineLatest(observables, (...newValues) => zipObj(keys, newValues))
}
