export const getReverseGeocoding = (latitude: string | number, longitude: string | number, apiKey: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  const resp = fetch(url)
    .then(response => response.json())
    .then(data => console.warn(data))
    .catch(error => console.error(error));
  // const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlang=' + latitude + ',' + longitude + '&key=' + apiKey);
  return resp;
  // } catch (error) {
  //   console.warn(error);
  // }
};

// export const func2 = (latitude: string | number, longitude: string | number, apiKey: string) => {
//   fetch('https://maps.googleapis.com/maps/api/geocode/json?latlang=' + latitude + ',' + longitude + '&key=' + apiKey)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       const parts = data.results[0].address_components;
//       document.body.insertAdjacentHTML(
//         'beforeend',
//         `<p>Formatted: ${data.results[0].formatted_address}</p>`
//       );
//       parts.forEach((part: any) => {
//         if (part.types.includes('country')) {
//           //we found "country" inside the data.results[0].address_components[x].types array
//           document.body.insertAdjacentHTML(
//             'beforeend',
//             `<p>COUNTRY: ${part.long_name}</p>`
//           );
//         }
//         if (part.types.includes('administrative_area_level_1')) {
//           document.body.insertAdjacentHTML(
//             'beforeend',
//             `<p>PROVINCE: ${part.long_name}</p>`
//           );
//         }
//         if (part.types.includes('administrative_area_level_3')) {
//           document.body.insertAdjacentHTML(
//             'beforeend',
//             `<p>LEVEL 3: ${part.long_name}</p>`
//           );
//         }
//       });
//     })
//     .catch(err => console.warn(err.message));
// };
