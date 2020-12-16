const bubbleSort = (incomingArray: number[]): number[] => {
  const sortedArray: number[] = [...incomingArray];
  for (const element of sortedArray) {
    // compare every element with the one on its right
    // and swap its greater.
    // Greatest element will bubble up to the end of array in every iteration
    for (let j = 0; j < sortedArray.length - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }
  return sortedArray;
};

export default bubbleSort;
