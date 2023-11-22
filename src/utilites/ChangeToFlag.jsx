// Function to convert country code to country flag emoji
export default function countryCodeToFlag(countryCode) {
  const flagOffset = 127397; // Offset for regional indicator symbols

  // Check if the input is a valid 2-letter country code
  if (countryCode.length !== 2) {
    console.error(
      "Invalid country code. Please provide a 2-letter country code."
    );
    return null;
  }

  // Convert each letter of the country code to the corresponding flag emoji
  const flagEmoji = countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + flagOffset))
    .join("");

  return flagEmoji;
}

// Example usage:
// const countryCode = "us";
// const flagEmoji = countryCodeToFlag(countryCode);

// if (flagEmoji) {
//   console.log(`Country Code: ${countryCode}`);
//   console.log(`Country Flag Emoji: ${flagEmoji}`);
// } else {
//   console.log("Failed to convert country code to flag emoji.");
// }
