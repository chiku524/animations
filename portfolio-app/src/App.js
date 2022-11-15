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
      opacity: 1,
      duration: 1,
      scale: 1,
      ease: "back.out(1.7)",
      stagger: { amount: 0.2 }
    })

    let dogwalkTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".dogwalk",
        start: "-=100 center",
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

  }, [])

  //anim copy title
  useLayoutEffect(() => {
    let animTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".anim-title-container",
        start: "-=225 center",
        markers: true
      } 
    });

    animTitle
    .fromTo(".anim-title-container .title", {
      y: 50,
    }, {
      y: 25,
      duration: 1,
    })
    .fromTo(".half", {
      y: 75,
      scale: 0,
      opacity: 0
    }, {
      y: 45,
      duration: 1,
      scale: 1,
      opacity: 1
    })
    .to(".half h3", {
      stagger: 0.2,
      y: -45,
      duration: 3,
      animationDelay: 1.5,
      yoyo: true,
      color: "rgb(243, 241, 241)",
      boxShadow: "0px 0px 10px #424141",
      borderRadius: '50%',
      padding: '10px 30px',
      ease: "elastic"
    })
    .to(".half h3", {
      keyframes: {
        boxShadow: ["0px 0px 10px #424141", "0px 0px 15px #e2bd1a", "0px 0px 20px #29f176", "0px 0px 20px rgb(41, 128, 241)", "0px 0px 15px #c418bb", "0px 0px 10px #424141"],
      },
      repeat: -1,
      duration: 10,
    })
  }, [])
  

  for(let i=0; i<75; i++) {
    bubArray.push(i);
  }

  useLayoutEffect(() => {
    bubArray.forEach(el => {
      gsap.set(`.bubble-${el}`, {
        x: "random(0, 800)",
        y: "random(0, 500)",
      })
    })
  }, [])

  useEffect(() => {
    let bubbles = document.querySelectorAll(".bubble");
    let tank = document.querySelector(".tank");
    var xMove;
    var yMove;
    
    const getMovement = (e) => {
      xMove = e.movementX;
      yMove = e.movementY;   
    }

    const moveBubble = (e, idx, xMove, yMove) => {;
      let xMoveDupe = xMove * 10;
      let yMoveDupe = yMove * 10;

      gsap.to(`.bubble-${idx}`, {
        x: `+=${xMoveDupe}`,
        y: `+=${yMoveDupe}`,
        duration: 2
      })
    }
      
    tank.addEventListener('mousemove', (e) => getMovement(e));
    bubbles.forEach((el, idx) => el.addEventListener("mouseenter", (e) => moveBubble(e, idx, xMove, yMove)));
    
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
              {bubArray ? bubArray.map((item, index) => <div className={`bubble bubble-${index}`} style={{width: index*1.3}}> </div>) : console.log('didnt work')};
              <div className='tank-copy'>
                <h3>MOVE MOUSE TO HIT BUBBLES</h3>
              </div>
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
