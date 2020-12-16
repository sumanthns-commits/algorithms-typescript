# algotihms-typescript

Implementation of famous algorithms in typescript

## How to run?

### Prerequisites

> [node](https://nodejs.org/en/)

> [yarn](https://yarnpkg.com/)

### Install dependencies

> yarn

### Run test

> yarn test

### Run build

> yarn build

## Compare sorting algorithms

To compare performance of various sorting algorithms for an array of random numbers of give size

> yarn build

> node build/report/compareSorting.js 100000

This will produce the following output that shows time taken in milliseconds on sorting a random array of size 100,000

```
 Result
  | Algorithms | Time take in millisecons
  |------------|-------------------------
  | Merge      | 84.18371900171041
  | Selection  | 4988.471524998546
  | Insertion  | 8406.207600004971
  | Bubble     | 23347.794918999076
```
