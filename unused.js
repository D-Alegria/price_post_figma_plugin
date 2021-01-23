// // export compo
    // var settings: ExportSettingsImage = { format: "JPG" };
    // var result = await newInstance.exportAsync(settings);
    // // console.log(result);

    // console.log(msg.body);

    // console.log(figma);

    // // saveBase64AsFile(result, "test 1");

    // figma.ui.postMessage(result);




// const buffer =require('buffer');
// onmessage = (event) => {
//   console.log("got this from the plugin code", event.data.pluginMessage);
//   saveBase64AsFile(event.data.pluginMessage, "text");
// };

// function saveBase64AsFile(u8, fileName) {
//   // const screenshot = new TextDecoder("utf-8").decode(u8);
//   // // passing screenshot as string over network
//   // const uint8array = new TextEncoder().encode(screenshot);
//   // const data = Buffer.from(uint8array);
//   // fs.writeFileSync(`${fileName}.png`, data, "binary");
//   // var b64 = btoa(bin);

//   // return bta;
//   const x = new Uint8Array(u8).reduce(
//     (data, byte) => data + String.fromCharCode(byte),
//     ""
//   );

//   // console.log(`to string ${x.toString()}`);

//   // console.log(`not to string ${x}`);
//   console.log(window);

//   var bas = btoa(x);

//   // passing screenshot as string over network
//   function urlBase64ToUint8Array(base64String) {
//     var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     var base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");

//     var rawData = atob(base64);
//     var outputArray = new Uint8Array(rawData.length);

//     for (var i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }

//   const uint8array = urlBase64ToUint8Array(bas);
//   const data = window.Buffer.from(uint8array);
//   console.log(fs);
//   fs.writeFileSync(`${fileName}.png`, data, "binary");
// }
