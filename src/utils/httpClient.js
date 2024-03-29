// const BASE_URL = 'http://localhost:3000'
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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
