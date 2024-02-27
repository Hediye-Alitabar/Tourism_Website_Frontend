const BASE_URL = 'http://localhost:3000'

// export async function GET(path) {
//   // try{
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow'
//     };
//     return fetch(`${BASE_URL}${path}`, requestOptions)

  // }
// catch{
  
// }
//       .then(response => response.json())
//       .catch(error => console.log('error', error));

  // return data
// } 

export async function GET(path) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data
}

export async function DELETE(path) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));


  return data
}

export async function post(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "TOKEN");

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    // body: {...raw, userId: finduser[0].userId}
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
  return data;
}

export async function patch(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data;
}

export async function put(path, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return data;
}
