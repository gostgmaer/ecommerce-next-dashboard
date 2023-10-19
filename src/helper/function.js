import moment from "moment";


// Export the calculateTimeGap function with maxGap parameter
export function calculateTimeGap(date1, date2, maxGap) {
  const momentDate1 = moment(date1, "YYYY-MM-DD HH:mm:ss");
  const momentDate2 = date2 ? moment(date2, "YYYY-MM-DD HH:mm:ss") : moment();

  // Calculate the time gap duration
  const duration = moment.duration(momentDate2.diff(momentDate1));

  // Calculate the years and months in the duration
  const years = duration.years();
  const months = duration.months();

  // Check if the duration exceeds the maximum allowable time gap in months
  if (duration.asMonths() > maxGap) {
    return `Time Gap exceeds the maximum allowable (${maxGap} months)`;
  }

  // Format the duration based on the maxGap value
  let formattedDuration = "";
  if (years > 0) {
    formattedDuration += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (formattedDuration) {
      formattedDuration += " ";
    }
    formattedDuration += `${months} month${months > 1 ? "s" : ""}`;
  }

  return `${formattedDuration}`;
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};


export const findIndex = (array, index) => {
  const found = array.find(function (element, ind) {
    return index === ind;
  });
  return found
};


export const arrayGroupbykey = (array,key)=>{

      // @ts-ignore
      const uniqueCategories = [...new Set(array.map(item => item[key]))];

      // Create a function to filter the array based on a category
      function filterByCategory(array, key) {
        return array.filter(item => item.category === key);
    }
    
    // Create an array to store filtered arrays
    const filteredArrays = [];
    
    // Filter the array for each unique category and push the results into the filteredArrays array
    uniqueCategories.forEach(key => {
        const filteredArray = filterByCategory(array, key);
        filteredArrays.push(filteredArray);
    });
    
    return filteredArrays
}