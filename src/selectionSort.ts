const selectionSort = (incomingArray: number[]): number[] => {
  const sortedArray: number[] = [...incomingArray];
  let currentMinimumPosition: number;
  let currentMinimum: number;
  for (let i = 0; i < sortedArray.length; i++) {
    // select `i`th element as the current minimum
    currentMinimum = sortedArray[i];
    currentMinimumPosition = i;
    // iterate over rest of the elements
    // update current minimum is any other element is less than current minimum
    for (let j = i; j < sortedArray.length; j++) {
      if (sortedArray[j] < currentMinimum) {
        currentMinimum = sortedArray[j];
        currentMinimumPosition = j;
      }
    }
    // swap `i`th element with current minimum
    const temp = sortedArray[i];
    sortedArray[i] = currentMinimum;
    sortedArray[currentMinimumPosition] = temp;
  }

  return sortedArray;
};

export default selectionSort;
