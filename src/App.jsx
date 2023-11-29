import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [toggle, setToggle] = useState(true);
  const [volume, setVolume] = useState(50);

  function clicked() {
    setToggle(!toggle);
  }

  const audioClips = [
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", empty: "#", soundName: "Heater 1", name: "Q" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", empty: "#", soundName: "Heater 2", name: "W" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", empty: "#", soundName: "Heater 3", name: "E" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", empty: "#", soundName: "Heater 4", name: "A" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", empty: "#", soundName: "Clap", name: "S" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", empty: "#", soundName: "Open-HH", name: "D" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", empty: "#", soundName: "Kick-n'-Hat", name: "Z" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", empty: "#", soundName: "Kick", name: "X" },
    { soundUrl: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", empty: "#", soundName: "Closed-HH", name: "C" }
  ];

  function playSound(props) {
    const z = audioClips.filter(item => item.name.includes(props));
    const audio = document.getElementById(props);
    if(toggle){
      audio.volume = volume / 100;
      document.getElementById('display').innerHTML =  z[0].soundName;
    } else{
      audio.volume = 0;
    }
    audio.play();
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      document.getElementById("drum-"+event.key.toUpperCase()).focus();
      playSound(event.key.toUpperCase());
    })
  },[]);

  return (
    <div id='main'>
      <h1>Drum Machine</h1>
      <div id="drum-machine">
        <div id="parts">
          <div id="drum-pads">
            {audioClips.map((obj, index) => (
              <div className="drum-pad" key={index} id={`drum-${obj.name}`} onClick={() => playSound(obj.name)}>
                <audio className='clip' src={obj.soundUrl} id={obj.name}></audio>
                <h1>{obj.name}</h1>
              </div>
            ))}
          </div>
          <div id="display-box">
            <button id='ses' onClick={clicked}>{toggle ? "Sesi Kapa" : "Sesi Aç"}</button>
            <h2 id='volume'>Volume: {volume}</h2>
            <input type="range" name="range" id="range"
              min={0} max={100}
              value={volume} onChange={(e) => setVolume(e.target.value)} />
            <p id='display'></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
