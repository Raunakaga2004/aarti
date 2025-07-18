import React, { useState, useEffect, useRef } from 'react';
import frontAarti from './assets/1 reverse.png';
import frontRaunak from './assets/4.png';
import confidentSong from './assets/confident.mp3';
import prettySong from './assets/pretty.mp3';
import ennuitSong from './assets/ennuit.mp3';
import HoverHighlightImage from './components/HoverHighlightImage';
import FallingFlowers from './components/FallingFlowers';
import FallingSmoke from './components/FallingSmoke';
import couple1 from './assets/couple1.png'
import couple2 from './assets/couple13.jpg'
import couple3 from './assets/couple11.png'
import couple4 from './assets/2.png'
import couple5 from './assets/couple6.jpg'
import couple6 from './assets/couple9.jpg'

import {motion} from 'framer-motion'
import {Typewriter} from "react-simple-typewriter"

import {useNavigate} from "react-router-dom"

function App() {
  const [highlighted, setHighlighted] = useState<'aarti' | 'raunak' | null>(null);
  const [showBlank, setShowBlank] = useState(false);
  const [animateDown, setAnimateDown] = useState(false);
  const [showCouple, setShowCouple] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showBlackScreen, setBlackScreen] = useState(true);


  const confidentAudioRef = useRef<HTMLAudioElement>(new Audio(confidentSong));
  const prettyAudioRef = useRef<HTMLAudioElement>(new Audio(prettySong));
  const ennuitAudioRef = useRef<HTMLAudioElement>(new Audio(ennuitSong));

  useEffect(()=>{
    const timer = setTimeout(() => {
      setBlackScreen(false);
    }, 3000)

    return ()=> clearTimeout(timer);
  })

  // Initialize audio settings
  useEffect(() => {
    const confidentAudio = confidentAudioRef.current;
    const prettyAudio = prettyAudioRef.current;

    confidentAudio.loop = true;
    confidentAudio.volume = 0;
    prettyAudio.loop = true;
    prettyAudio.volume = 0;

    // Preload audio
    confidentAudio.load();
    prettyAudio.load();

    return () => {
      confidentAudio.pause();
      prettyAudio.pause();
    };
  }, []);

  // Fade in/out helper
  const fadeAudio = (audio: HTMLAudioElement, fadeIn: boolean, duration = 1000) => {
    const stepTime = 50;
    const steps = duration / stepTime;
    let currentStep = 0;
    const volumeStep = 1 / steps;
    if (fadeIn) {
      audio.volume = 0;
      audio.play();
    }
    const fadeInterval = setInterval(() => {
      if (fadeIn) {
        audio.volume = Math.min(audio.volume + volumeStep, 1);
      } else {
        audio.volume = Math.max(audio.volume - volumeStep, 0);
      }
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (!fadeIn) {
          audio.pause();
        }
      }
    }, stepTime);
  };

  // Handle highlight changes to play/fade music
  const hasPlayedRef = React.useRef<{ confident: boolean; pretty: boolean }>({
    confident: false,
    pretty: false,
  });

  useEffect(() => {
    const confidentAudio = confidentAudioRef.current;
    const prettyAudio = prettyAudioRef.current;

    if (highlighted === 'aarti') {
      fadeAudio(confidentAudio, false);
      if (!hasPlayedRef.current.pretty) {
        prettyAudio.volume = 1;
        prettyAudio.play();
        hasPlayedRef.current.pretty = true;
      } else {
        fadeAudio(prettyAudio, true);
      }
    } else if (highlighted === 'raunak') {
      fadeAudio(prettyAudio, false);
      if (!hasPlayedRef.current.confident) {
        confidentAudio.volume = 1;
        confidentAudio.play();
        hasPlayedRef.current.confident = true;
      } else {
        fadeAudio(confidentAudio, true);
      }
    } else {
      fadeAudio(confidentAudio, false);
      fadeAudio(prettyAudio, false);
    }
  }, [highlighted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // No effect in top 50% vertically
    if (y < rect.height / 2) {
      setHighlighted(null);
      return;
    }

    // Left half of screen highlights aarti, right half highlights raunak
    if (x < rect.width / 2) {
      setHighlighted('aarti');
    } else {
      setHighlighted('raunak');
    }
  };

  const handleMouseLeave = () => {
    setHighlighted(null);
  };

  //lyrics

  const [index, setIndex] = useState(-1);

  const lyrics = [
    {
      text : "And I write, the passing time",
      gender : "male"
    },
    {
      text : "And you live, all that we said",
      gender : "female"
    },
    {
      text : "The night, the moon, the fire, the storm",
      gender : "male"
    },
    {
      text : "In the dark streets, we build boredom",
      gender : "female"
    },

    {
      text : "It's in your head that everything fades",
      gender : "male"
    },
    {
      text : "The good times make me angry",
      gender : "female"
    },
    {
      text : "And we meet, at the bell",
      gender : "male"
    },
    {
      text : "Shouting hope, nostalgia",
      gender : "female"
    },
  ]

  const [currentLine, setCurrentLine] = useState({});

  useEffect(()=>{
    if(index != -1){
      setCurrentLine(lyrics[index]);
    }
  }, [index]);


  const handleTogetherClick = () => {
    setAnimateDown(true);
    ennuitAudioRef.current.volume = 1;
    ennuitAudioRef.current.play();
    setTimeout(() => {
      setShowCouple(true);
      setSlideIn(true);
    }, 1000); // match animation duration
  };

  useEffect(()=>{
    if(showCouple){
      const timer = setTimeout(()=>{
        setShowLoading(false)
      }, 5000)

      return ()=> clearTimeout(timer);
    }
  },[showCouple])

  const couple2Ref = useRef(null);
  const couple3Ref = useRef(null);
  const couple4Ref = useRef(null);
  const couple5Ref = useRef(null);
  const couple6Ref = useRef(null);

  useEffect(() => {
    if (!showLoading && showCouple) {
      const scrollTimer = setTimeout(() => {
        // setIndex(1);
        couple2Ref.current?.scrollIntoView({ behavior: "smooth" });
        setIndex(0);
      }, 9000); // wait 5s after motion appears

      
      return () => {
        clearTimeout(scrollTimer);
      }
    }
  }, [showLoading, showCouple]);

  useEffect(() => {
    if (!showLoading && showCouple) {
      
      const scrollTimer = setTimeout(() => {
        setIndex(1);
        couple3Ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 12000); // wait 5s after motion appears

      return () => clearTimeout(scrollTimer);
    }
  }, [showLoading, showCouple]);

  useEffect(() => {
    if (!showLoading && showCouple) {

      const indexTimer = setTimeout(() => {
        setIndex(3)
      }, 17000);

      const scrollTimer = setTimeout(() => {
          setIndex(2)
        couple4Ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 14000); // Scroll after 14s (9s after motion appears)

      return () => {
        clearTimeout(indexTimer);
        clearTimeout(scrollTimer);
      };
    }
  }, [showLoading, showCouple]);

  useEffect(() => {
    if (!showLoading && showCouple) {

      const indexTimer = setTimeout(() => {
        setIndex(5);
      }, 22000);

      const scrollTimer = setTimeout(() => {
        setIndex(4);
        couple5Ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 19000); // Scroll after 14s (9s after motion appears)

      return () => {
        clearTimeout(indexTimer);
        clearTimeout(scrollTimer);
      };
    }
  }, [showLoading, showCouple]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!showLoading && showCouple) {
      // setIndex(6); // Set to 2 when motion appears (after 5s)

      const indexTimer = setTimeout(() => {
        setIndex(7);
      }, 26000);

      const scrollTimer = setTimeout(() => {
        setIndex(6);
        couple6Ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 24000); // Scroll after 14s (9s after motion appears)

      const screenFade = setTimeout(()=>{
        setBlackScreen(true);
      }, 28000)

      const lastTimerSongFade = setTimeout(() => {
        fadeAudio(ennuitAudioRef.current, true);
      }, 29600);
      const lastTimer = setTimeout(() => {
        navigate(0);
      }, 30000);

      return () => {
        clearTimeout(indexTimer);
        clearTimeout(scrollTimer);
        clearTimeout(lastTimer);
        clearTimeout(lastTimerSongFade);
      };
    }
  }, [showLoading, showCouple]);


  return (
    <>
      {!showBlank && !showCouple ? (
        <>
          {showBlackScreen && <motion.div
            className="fixed top-0 left-0 h-full w-full bg-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 3 }}
          />}
          <div
            className={`h-screen w-screen overflow-x-hidden relative overflow-y-hidden transition-transform duration-1000 ${
              animateDown ? 'translate-y-full' : ''
            }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 hover:bg-[#2b2b2b] hover:text-white text-[#2b2b2b] rounded shadow font-semibold border border-[#2b2b2b]"
              onClick={handleTogetherClick}
            >
              Shared Stories
            </button>

            <div
              className={`absolute top-0 left-0 w-full h-1/2 flex justify-center items-center pointer-events-none ${
                highlighted === 'aarti'
                  ? 'text-[#b65ee1] text-[50vh] font-bold '
                  : highlighted === 'raunak'
                  ? 'text-[#2e72bf] text-[50vh] font-bold '
                  : 'text-[#2b2b2b]'
              }`}
            >
              <span className="select-none">
                {highlighted ||
                  'Hover to the bottom right for Raunak side and Hover to the bottom left for Aarti Side'}
              </span>
            </div>

            {/* Horizontal line in the middle */}
            <div
              className={`absolute top-1/2 left-0 w-full h-full pointer-events-none ${
                highlighted === 'aarti'
                  ? 'bg-[#b65ee1]'
                  : highlighted === 'raunak'
                  ? 'bg-[#2e72bf]'
                  : 'bg-[#2b2b2b]'
              }`}
            />

            <div className="relative flex flex-row justify-center items-center left-[120px] bottom-[-163px]">
              <HoverHighlightImage
                src={frontRaunak}
                width={400}
                height={800}
                className="translate-x-[150px]"
                alt="frontRaunak"
                style={{ filter: 'drop-shadow(5px -2px 2px rgba(0, 0, 0, 0.8))' }}
                highlight={highlighted === 'raunak'}
              />
              <HoverHighlightImage
                src={frontAarti}
                width={400}
                height={650}
                className="-translate-x-[400px] translate-y-[105px]"
                alt="frontAarti"
                style={{ filter: 'drop-shadow(-5px -2px 2px rgb(0, 0, 0, 0.8))' }}
                highlight={highlighted === 'aarti'}
              />
            </div>
          </div>
          {highlighted === 'aarti' && <FallingFlowers />}
          {highlighted === 'raunak' && <FallingSmoke />}
        </>
      ) : 
        <div className="h-screen w-screen bg-white overflow-x-hidden">
          {showBlackScreen && <motion.div
            className="fixed top-0 left-0 h-full w-full bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />}
          <div className="h-screen w-screen flex justify-center items-center">

            {index != -1 && <div
              className={`fixed text-5xl font-semibold px-4 py-2 break-words w-1/4 ${
                currentLine.gender === "male"
                  ? "text-[#2e72bf] left-[2vw]"
                  : "text-[#b65ee1] italic right-[2vw]"
              }`}
            >
              <Typewriter
                key={index}
                words={[currentLine.text]}
                cursor
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </div>}

            

            {showCouple && showLoading && (
              <div>Wait Our Memories are loading...</div>
            )}

            {showCouple && !showLoading && (
              <><motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full h-40 bg-black text-white text-center flex items-center justify-center z-50"
              >
              </motion.div>
              <motion.div
                initial={{ x: "-100vw", opacity: 1 }}
                animate={{ x: "0vw", opacity: 1 }}
                transition={{ duration: 5, ease: "easeOut" }}
              >
                <img src={couple1} className="h-[80vh]" />
              </motion.div>
              <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 10, ease: "easeOut"}}
              className="fixed bottom-0 left-0 w-full h-40 bg-black text-white text-center flex items-center justify-center z-50"
            >
            </motion.div>
              </>
            )}
          </div>

          <div ref={couple2Ref} className="h-screen flex items-center justify-center">
            <img src={couple2} className="h-[80vh]" />
          </div>

          <div ref={couple3Ref} className='h-screen flex justify-center items-center'>
            <img src={couple3} className="h-[80vh]" />
          </div>

          <div ref={couple4Ref} className='h-screen flex justify-center items-center'>
            <img src={couple4} className="h-[100vh]" />
          </div>

          <div ref={couple5Ref} className='h-screen flex justify-center items-center'>
            <img src={couple5} className="" />
          </div>

          <div ref={couple6Ref} className='h-screen flex justify-center items-center'>
            <img src={couple6} className="h-[80vh]" />
          </div>

      </div>
      }
    </>
  );
}

export default App;
