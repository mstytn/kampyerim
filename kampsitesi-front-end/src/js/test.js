const p = document.querySelector('p')
const b = document.querySelector('button')
b.addEventListener('click', e => {
  b.innerText = 'WAIT'
  b.disabled = true

  const myHeaders = new Headers();
  const controler = new AbortController()
  const timeOutId = setTimeout(() => { controler.abort(), console.log('controller aborted') }, 5000)
  const displayTimeout = setTimeout(() => { p.innerText = 'Result'; b.disabled = false; b.innerText = 'RE-FETCH' }, 5000)

  // myHeaders.append("corssorigin", "*");
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Accept-Encoding', 'gzip, deflate, br');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    signal: controler.signal,
  };
  fetch("http://localhost:3000", requestOptions)
    .then(response => { 
      clearTimeout(timeOutId)
      return response.json()
    })
    .then(data => {p.innerText = JSON.stringify(data)})
    .catch(error => console.log('error', error));
})