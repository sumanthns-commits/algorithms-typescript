const defaultComparator = (a: number, b: number) =>
  a < b ? -1 : a > b ? 1 : 0;

const mergeSort = <T>(
  incomingArray: any[],
  comparator: (a: any, b: any) => number = defaultComparator
): T[] => {
  const arrLength = incomingArray.length;
  // base condition for recursion
  if (arrLength <= 1) {
    return incomingArray;
  }

  // divide incoming array into left and right on midpoint
  const midLength = arrLength % 2 === 0 ? arrLength / 2 : (arrLength + 1) / 2;
  const leftArray = incomingArray.slice(0, midLength);
  const rightArray = incomingArray.slice(midLength, arrLength);

  // sort left and right array
  const sortedLeftArray: T[] = mergeSort(leftArray, comparator);
  const sortedRightArray: T[] = mergeSort(rightArray, comparator);

  // merge left and right array
  const mergedArray = [];
  let leftArrayPointer = 0;
  let rightArrayPointer = 0;

  for (let k = 0; k < arrLength; k++) {
    if (typeof sortedLeftArray[leftArrayPointer] === "undefined") {
      mergedArray[k] = sortedRightArray[rightArrayPointer];
      rightArrayPointer++;
    } else if (typeof sortedRightArray[rightArrayPointer] === "undefined") {
      mergedArray[k] = sortedLeftArray[leftArrayPointer];
      leftArrayPointer++;
    } else if (
      comparator(
        sortedLeftArray[leftArrayPointer],
        sortedRightArray[rightArrayPointer]
      ) <= 0
    ) {
      mergedArray[k] = sortedLeftArray[leftArrayPointer];
      leftArrayPointer++;
    } else {
      mergedArray[k] = sortedRightArray[rightArrayPointer];
      rightArrayPointer++;
    }
  }
  return mergedArray;
};

export default mergeSort;
