window.addEventListener("load", () => {
  // (PART A) GET BGM
  const bgm = document.getElementById("bgm");

  // (PART B) AUTOPLAY NOT ALLOWED - SHOW "PLAY BUTTON"
  if (bgm.paused) {
    // (B1) GET "PLAY BUTTON"
    let play = document.getElementById("play");

    // (B2) CLICK TO PLAY
    play.onclick = () => {
      bgm.play();
      play.classList.remove("show");
    };

    // (B3) SHOW "PLAY BUTTON"
    play.classList.add("show");
  }
});
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up as Leon.s.kennedy in rural Spain and find a treasure near you.',
    options: [
      {
        text: 'Take the treasure',
        setState: { treasure: true },
        nextText: 2
      },
      {
        text: 'Leave the treasure',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth looking for Ashely and come across the iconic merchant',
    options: [
      {
        text: 'Trade the treasure for a handgun',
        requiredState: (currentState) => currentState.treasure,
        setState: { treasure: false, handgun: true },
        nextText: 3
      },
      {
        text: 'Trade the treasure for a shotgun',
        requiredState: (currentState) => currentState.treasure,
        setState: { treasure: false, shotgun: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and you are low hp somehow , you stumble upon a church next to a dangerous looking village',
    options: [
      {
        text: 'Explore the church',
        nextText: 4
      },
      {
        text: 'Explore the village',
        nextText: 5
      },
      {
        text: 'Use a green herb  and rest for a while',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are tired so you fall asleep exploring the church and are killed by the guards in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: ' You get cornered by the ganados in the village and end up dead because you fought them tired and low hp.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby church.',
    options: [
      {
        text: 'Explore the church',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the church you come across a group of ganados guards in your path to save Ashely.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack with ur handgun',
        requiredState: (currentState) => currentState.handgun,
        nextText: 9
      },
      {
        text: 'Attack with ur shotgun',
        requiredState: (currentState) => currentState.shotgun,
        nextText: 10
      },
      {
        text: 'Throw the treasure at them',
        requiredState: (currentState) => currentState.treasure,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run failed and you are dead.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The handgun is too weak to handle all the guards so you end up out of ammo and consequently dead.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The shotgun proves to be the right weapon against multiple enemies and you kill them all and save Ashely',
    options: [
      {
        text: 'Mission accomplished !',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw the treasure at the ganados and it dealt no damage so you end up dead',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()
