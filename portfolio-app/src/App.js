import './css/App.css';
import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import { gsap, random } from 'gsap';
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

  useLayoutEffect(() => {
   
    bubArray.forEach(el => {
      gsap.set((`.bubble-${el}`), {
        position: 'absolute',
        x: gsap.utils.random(0, 500),
        y: gsap.utils.random(0, 800)
      })

      gsap.to(`.bubble-${el}`, {
        x: "random(-100, 900)",
        y: "random(-100, 500)",
        duration: 5,
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        ease: "Power3.out"
      })
  })

  }, [])

  useEffect(() => {
    let bubbles = document.querySelectorAll(".bubble");

    const onMouseOverBub = (e, idx, stew) => {
      console.log(e)
      console.log(stew)
      
      gsap.to(`.bubble-${idx}`, {
        x: (stew.x + e.pageX) / 360,
        y: (stew.y + e.pageY) / 360,
        duration: 5
      })
    }
    bubbles.forEach((el, idx) => {let stew = el.getBoundingClientRect(); el.addEventListener("mouseenter", (e) => onMouseOverBub(e, idx, stew))});
    
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
