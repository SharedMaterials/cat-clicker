async function pushButton() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account  = accounts[0];
  
  contract.methods.pushButton().send({
    from: account,
    gas: 233000
  })
  
  setCount();
}

async function setCount() {
  pointsSpan = document.getElementById("pnts-span");
  points = await contract.methods.getCount().call();
  pointsSpan.textContent= points;
}

async function spend() {
  
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account  = accounts[0];
  
  contract.methods.spend().send({
    from: account,
    gas: 233000
  })
}

contract.events.CatPhotoPurchased(function(error, result) {
  if (!error){
    const apiString = result.returnValues._value;
    setCount()
    fetch(apiString)
    .then(resp => resp.json())
    .then(catJson => {
      const catUrl = catJson[0].url;
      const catImg = document.createElement('img')
      catImg.src = catUrl;
    
      const imgCaption = document.createElement('figcaption');
      imgCaption.textContent = "Cat Photo courtesy of https://thecatapi.com/"
      
      const catDiv = document.getElementById("cat-div");
      while(catDiv.firstChild) {
        catDiv.removeChild(catDiv.lastChild);
      }
      catDiv.appendChild(catImg);
      catDiv.appendChild(imgCaption);
    })
  } else {
    alert('There was an error handling the cat photo purchase')
  }
})

contract.events.ButtonPushed(function(error, result) {
  if (!error){
      setCount()
  } else {
    alert('There was an error increasing your points')
  }
})

setCount()