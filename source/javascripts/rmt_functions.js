/*
 * Gets the current time, and converts it to binary (8 bit)
 */
 function getBinaryTime(eventinfo) {
   var currentTime = new Date();
   //define the byte size to use
   var byteSize = 8;
   var bitArray = new Array();

   //Generate an array of possible values based on the byte size
   var index = 0;
   byteSize = byteSize - 1;
   for (var j = byteSize; j >= 0; j--) {
      bitArray[index] = Math.pow(2, j);
      index++;
   }

   //Get the current hour (0 - 23)
   var hours = currentTime.getHours();
   //Get the binary composition of the current hour as an array
   var hoursBinary = getBinaryEquivalent(hours, bitArray);
   var hoursBinaryString = "";
   //Convert the binary composition to its correct binary display
   bitArray.forEach(function(bit) {
     if (hoursBinary.indexOf(bit) > -1) {
       hoursBinaryString += " 1 ";
     } else {
       hoursBinaryString += " 0 ";
     }
   });

   //get the current minute value (0 - 59)
   var minutes = currentTime.getMinutes();
   //Get the binary composition of the current minute
   var minutesBinary = getBinaryEquivalent(minutes, bitArray);
   var minutesBinaryString = "";
   //Convert the binary composition to its correct binary display
   bitArray.forEach(function (bit) {
     if (minutesBinary.indexOf(bit) > -1) {
       minutesBinaryString += " 1 ";
     } else {
       minutesBinaryString += " 0 ";
     }
   });
        
   //Output the current binary time in hours and minutes
   //document.getElementById("binary_output").innerHTML = "Hour: " + hoursBinaryString + "<br /> Minutes: " + minutesBinaryString;
   $(".date time").empty();
 }

 /*
  * Converts a base ten number into its binary composition values and returns them as an array
  * For example, 27 would return an array of (16, 8, 2, 1)
  */
 function getBinaryEquivalent(baseTenNum, bitArray) {
   for (var i = 0; i < bitArray.length; i++) {
     if (baseTenNum >= bitArray[i]) {
       var binaryValues = new Array();
       binaryValues[0] = bitArray[i];
       return binaryValues.concat(getBinaryEquivalent(baseTenNum - bitArray[i], bitArray));
     }
   }
   //if we are passed zero, return zero
   return Array(0);
 }
