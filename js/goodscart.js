let data1

 const response = (async () => {
  // This is the asynchronous context that you can use await
 
  const res = await fetch('./json/catalog.json');
  data1 = await res.json()
  console.log(data1)
})()

 
console.log(response.json())