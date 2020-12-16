const insertionSort = (incomingArray: number[]): number[] => {
  const sortedArray: number[] = [...incomingArray];
  for (let i = 0; i < sortedArray.length; i++) {
    // compare the current element with all elements to its left
    // and swap when current element is less than the one to its left
    for (let j = i; j > 0; j--) {
      if (sortedArray[j] < sortedArray[j - 1]) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j - 1];
        sortedArray[j - 1] = temp;
      }
    }
  }
  return sortedArray;
};

export default insertionSort;
