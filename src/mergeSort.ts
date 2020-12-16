const mergeSort = (incomingArray: number[]): number[] => {
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
  const sortedLeftArray = mergeSort(leftArray);
  const sortedRightArray = mergeSort(rightArray);

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
      sortedLeftArray[leftArrayPointer] < sortedRightArray[rightArrayPointer]
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
