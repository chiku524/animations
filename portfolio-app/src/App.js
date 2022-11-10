import './css/App.css';
import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactComponent as SVG1 } from './svg/engineering-team.svg';
import { ReactComponent as SVG2 } from './svg/dog-walking.svg';

function App() {
  const [bubArray, setBubArray] = useState([]);

  gsap.registerPlugin(ScrollTrigger);
  
  useLayoutEffect(() => {
    gsap.to(".page-title", {
      opacity: 1,
      duration: 1,
      repeat: 1,
      color: 'rgb(243, 241, 241)',
      textShadow: '10px 10px 10px blue',
      rotateZ: -1,
      yoyo: true
    })

    // e-team svg
    let eteamTL = gsap.timeline();

    eteamTL.set("#monitor-1, #monitor-2, #monitor-3", {
      opacity: 0,
      scale: 0
    })
    .set("#people", {
      opacity: 0,
      transformOrigin: "50% 50%",
      scale: 0
    })
    .to("#people", {
      opacity: 1,
      duration: 1,
      ease: 'in',
      scale: 1,
      stagger: { amount: 0.2 }
    })
    .to("#monitor-1, #monitor-2, #monitor-3", {
      textShadow: '3px 3px red, -1em 0 0.4em olive',
      opacity: 1,
      duration: 1,
      scale: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.2 }
    })

    let dogwalkTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".dogwalk",
        start: "top center",
        end: "+=350",
        markers: true,
        scrub: 1,
      } 
    });

    dogwalkTL
    .from("#fire-hydren, #person-dog", {
      duration: 1,
      opacity: 0,
      scale: 0,
      transformOrigin: "50% 50%",
      stagger: {amount: 0.2}
    })
    .from("#person-dog", {
      x: 300,
      duration: 4
    })
  }, [])
  

  for(let i=0; i<50; i++) {
    bubArray.push(i);
  }

  console.log(bubArray)

  useLayoutEffect(() => {
   
    bubArray.forEach(x => {
      let widthb = Math.round(Math.random() * (800 - 0 + 1) + 1);
      let heightb = Math.round(Math.random() * (500 - 0 + 1) + 1);
      let drifty = Math.round(Math.random() * (700 - 0 + 1) + 1);
      let driftx = Math.round(Math.random() * (1000 - 0 + 1) + 1);
      gsap.set((`.bubble-${x}`), {
        position: 'absolute',
        x: widthb,
        y: heightb
      })
      gsap.to(`.bubble-${x}`, {
        y: drifty,
        x: driftx,
        duration: 7,
        repeat: -1,
        yoyoEase: true,
        transitionTimingFunction: 'ease-out'
      })
  })

  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <div className='header'>
          <h3 className='page-title'>
            Nico Chikuji's <br />Portfolio site
          </h3>
        </div>
        <div className='icon-scroll'></div>
        <SVG1 className="eteam-svg"/>
        <section className='dogwalk'>
          <div className="tank">
            {bubArray ? bubArray.map((item, index) => <div className={`bubble bubble-${index}`} style={{width: index}}> </div>) : console.log('didnt work')}
          </div>
          <SVG2 className="dogwalk-svg" />
        </section>
      </header>
    </div>
  );
}

export default App;
