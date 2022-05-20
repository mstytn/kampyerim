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

const f = document.querySelector('form')

f.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(f)
  const reqBody = {}
  for (var pair of formData.entries()) {
    reqBody[pair[0]] = pair[1]
  }
  const myHeaders = new Headers();
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept-Encoding', 'gzip, deflate, br');

  console.log(reqBody)

  const requseOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify(reqBody)
  }

  fetch('http://localhost:3000/camps/filter/', requseOptions)
  .then(response => response.json())
  .then(data => console.log(data) )
  .catch(error => console.error(error))
})

