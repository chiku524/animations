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
      h3Shadow: '10px 10px 10px blue',
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
      h3Shadow: '3px 3px red, -1em 0 0.4em olive',
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
      stagger: {amount: 0.2},
      paddingRight: 500
    })
    .from("#person-dog", {
      x: 300,
      duration: 4
    })

    //anim copy title
    let animTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".anim-title-container",
        start: "top center",
        end: "+=350",
        markers: true,
        toggleAttribute: "play none none reverse"
      } 
    });

    animTitle
    .to(".anim-title-container .title", {
      y: 50,
      ease: "Power3.easeOut",
      duration: 0.5
    })
    .to("half", {
      y: 75,
      ease: "Power3.easeOut",
      duration: 0.5
    })
    .to(".half h3", {
      stagger: 0.2,
      y: 25,
      animationDelay: 2,
      duration: 0.5,
      yoyo: true,
      color: "rgb(243, 241, 241)",
      textShadow: "2px 2px 10px rgb(5, 108, 226)",
      boxShadow: "0px 0px 10px #424141",
      borderRadius: '30%',
      padding: '10px'
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
            Nico Chikuji's <br />Animations site
          </h3>
        </div>
        <div className='icon-scroll'></div>
        <SVG1 className="eteam-svg"/>
        <section className='dogwalk'>
          <div className='tank-container'>
            <div className="tank">
              {bubArray ? bubArray.map((item, index) => <div className={`bubble bubble-${index}`} style={{width: index}}> </div>) : console.log('didnt work')}
            </div>
          </div>
          <div className='dog-svg-container'>
            <SVG2 className="dogwalk-svg" />
          </div>
          <div className='anim-title-container'>
            <div className="title">
              <div className='half first'>
                <h3>HERE</h3>
                <h3>ARE</h3>
                <h3>SOME</h3>
                <h3>COOL</h3>
                <h3>ANIMATIONS</h3>
              </div>
              <div className='half second'>
                <h3>I</h3>
                <h3>HAVE</h3>
                <h3>CREATED</h3>
                <h3>FOR</h3>
                <h3>PRACTICE</h3>
                <h3>!</h3>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
