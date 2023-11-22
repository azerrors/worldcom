export function convertTimestampToAMPM(timestamp) {
  // Convert the timestamp to milliseconds
  const milliseconds = timestamp * 1000;

  // Create a new Date object
  const dateObject = new Date(milliseconds);

  // Get the components of the date
  const year = dateObject.getFullYear();
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + dateObject.getDate()).slice(-2);
  const hours = ("0" + dateObject.getHours()).slice(-2);
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);
  const seconds = ("0" + dateObject.getSeconds()).slice(-2);

  // Convert hours to AM/PM format
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

  return formattedDate;
}

// Example usage
export function timestampToAMPM(timestamp) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Add leading zero if needed
  const formattedHours = hours12 < 10 ? '0' + hours12 : hours12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Construct the AM/PM clock format
  const ampmFormat = `${formattedHours}:${formattedMinutes} ${meridiem}`;

  return ampmFormat;
}

// Example usage:

