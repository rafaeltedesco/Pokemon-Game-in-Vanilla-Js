let score = 0
let pScore = document.querySelector('#score')
let nCaterpies = document.querySelector('#nCaterpies')
let zapdos = document.querySelector('#zapdos')
document.addEventListener('mousemove', mouse)
let thunders = []
let caterpies = []

function mouse(ev) {
  zapdos.style.setProperty('z-index', 3)
  zapdos.style.setProperty('left', `${ev.clientX-50}px`) 
  zapdos.style.setProperty('top', `${ev.clientY-25}px`)
  zapdos.style.setProperty('cursor', 'none')
}

document.body.addEventListener('click', attack)

function updateScore() {
  pScore.innerText = score

}

function attack() {
  let x = getComputedStyle(zapdos).getPropertyValue('left')
  let y = getComputedStyle(zapdos).getPropertyValue('top')
  drawThunder(x, y)
}

function checkHitCaterpie() {
  thunders.forEach(thunder=> {
    let thunderX = parseInt(getComputedStyle(thunder).getPropertyValue('left').split('px')[0])
    let thunderY = parseInt(getComputedStyle(thunder).getPropertyValue('top').split('px')[0])
    caterpies.forEach(caterpie=> {
       let caterpieX = parseInt(getComputedStyle(caterpie).getPropertyValue('left').split('px')[0])
       let caterpieY = parseInt(getComputedStyle(caterpie).getPropertyValue('top').split('px')[0])
       let distance = Math.sqrt(Math.pow(thunderX-caterpieX,2) + Math.pow(thunderY-caterpieY,2))
       if (distance <= (thunder.width)) {
         score++
         caterpie.remove()
         let index = caterpies.indexOf(caterpie)
         if (caterpie != -1) {
           caterpies.splice(index, 1)
         }

         updateScore()
         updateCaterpies()
       }
    })
  })
}

function drawThunder(x, y) {
  let img = document.createElement('img')
  img.src = 'https://pngimg.com/uploads/thunder/thunder_PNG64.png'
  img.width = zapdos.width
  img.style.setProperty('z-index', -1)
  img.style.setProperty('position', 'absolute')
  img.style.setProperty('left', x)
  img.style.setProperty('top', y)
  thunders.push(img)
  img.setAttribute('id', thunders.length)
  document.body.appendChild(img)
  let audio = new Audio()
  audio.src = './public/sound/thunder_mp3.mp3'
  
  audio.play()
  checkHitCaterpie()
  setTimeout(()=> eraseThunder(img), 1000)
}

function eraseThunder(img) {
  img.remove()
}

function updateCaterpies() {
  nCaterpies.innerText = caterpies.length
}

function randomCaterpie() {
  let img = document.createElement('img')
  img.src = 'http://static.pokemonpets.com/images/monsters-images-800-800/2010-Shiny-Caterpie.png'
  img.width = 50
  img.style.setProperty('position', 'absolute')
  let x = Math.floor(Math.random() * window.innerWidth) 
  let y = Math.floor(Math.random() * window.innerHeight)

  if (x < 0) x = 0
  if ((x + img.width) > window.innerWidth) x = window.innerWidth - (img.width * 2)
  if (y < 0) y = 0
  if (y + img.width * 2 > window.innerHeight) y = window.height/2

  img.style.setProperty('left', `${x}px`)
  img.style.setProperty('top', `${y}px`)
  img.style.setProperty('z-index', 1)
  caterpies.push(img)
  updateCaterpies()
  img.setAttribute('id', caterpies.length)
  document.body.appendChild(img)
}

function start() {
  pScore.innerText = score
  nCaterpies.innerText = caterpies.length
  
  let interval = setInterval(randomCaterpie, 800)
}

start()