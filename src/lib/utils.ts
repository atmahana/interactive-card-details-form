export const setMaxLength = (value: string, maxLength: number) => {
  const truncatedValue = value.slice(0, maxLength);
  return truncatedValue;
};

export const convertNumberToFormattedString = (number: number) => {
  // Function to convert a number to an array of digits
  function numberToArray(number: number) {
    const numberString = number.toString();
    return [...numberString].map(Number);
  }

  // Function to divide the array into chunks of 4 digits and add spaces
  function combineChunksWithSpaces(chunksArray: any) {
    const flatArray = [].concat(...chunksArray);
    const combinedArrayWithSpaces = [];
    for (let i = 0; i < flatArray.length; i += 4) {
      const chunk = flatArray.slice(i, i + 4);
      combinedArrayWithSpaces.push(chunk.join(""));
    }
    return combinedArrayWithSpaces.join(" ");
  }

  // Convert the number to an array of digits
  const digitArray = numberToArray(number);

  // Divide the array into chunks of 4 digits each
  const chunkedArray = [];
  for (let i = 0; i < digitArray.length; i += 4) {
    const chunk = digitArray.slice(i, i + 4);
    chunkedArray.push(chunk);
  }

  // Combine the chunks into one big array with spaces
  const resultString = combineChunksWithSpaces(chunkedArray);

  return resultString;
}