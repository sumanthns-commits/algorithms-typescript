import { performance } from "perf_hooks";
import bubbleSort from "../bubbleSort";
import insertionSort from "../insertionSort";
import mergeSort from "../mergeSort";
import selectionSort from "../selectionSort";

const profile = <T>(
  func: (a: T) => T
): ((
  a: T
) => {
  value: T;
  time: number;
}) => {
  return (a: T) => {
    const startTime = performance.now();
    const value = func(a);
    const endTime = performance.now();
    return {
      value,
      time: endTime - startTime,
    };
  };
};

const printUsage = () => {
  // tslint:disable-next-line:no-console
  console.log(`
    Description: Compares the performance of diffrent algorithms 
        to sort a array of random numbers of given size.

    Usage: node build/report/compareSorting.js <array size>

    Example: node compareSorting 10000
    `);
};

const main = () => {
  const bigArray = [];
  if (process.argv.length !== 3) {
    printUsage();
    process.exit(1);
  }
  const arrayLength = Number(process.argv[2]);
  for (let i = 0; i < arrayLength; i++) {
    bigArray.push(Math.random() * i);
  }
  const mergeSortResult = profile(mergeSort)(bigArray);
  const selectionSortResult = profile(selectionSort)(bigArray);
  const insertionSortResult = profile(insertionSort)(bigArray);
  const bubbleSortResult = profile(bubbleSort)(bigArray);

  // tslint:disable-next-line:no-console
  console.log(`
  Result
  | Algorithms | Time take in millisecons
  |------------|-------------------------
  | Merge      | ${mergeSortResult.time}
  | Selection  | ${selectionSortResult.time}
  | Insertion  | ${insertionSortResult.time}
  | Bubble     | ${bubbleSortResult.time}

  `);
};

main();
