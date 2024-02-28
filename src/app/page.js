'use client';
import styles from './page.module.scss'
import Galery from '../components/Galery';
import ZoomParallax from '../components/ZoomParallax';
import Card from '../components/Card';
import { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis'
import { GSAP, FramerMotion } from '../components/ScrollParallax';

import MenuImage from '../components/MenuImage';

import TextScroll from '../components/TextScroll';

import StickyButtons from '../components/StickyButtons';

import MouseScale from '../components/MouseScale';

import TextDisper from '../components/TextDisper';

import BezierCurve from '../components/BezierCurve';

import { useSpring } from 'framer-motion';
import Description from '../components/SplitVignette/description';
import Gallery from '../components/SplitVignette/gallery';

import FloatingShape from '../components/floatingShape';

import WeirdText from '../components/WeirdText';

import Header from '../components/StickyContainer/header';
import StickyCursor from '../components/StickyContainer/stickyCursor';

import FloatingGalery from '../components/FloatingGalery';

import Word from '../components/AnimatedText/Word';
import Character from '../components/AnimatedText/Character';
import Paragraph from '../components/AnimatedText/Character';

import TextOverlay from '../components/TextOverlay';

const paragraph = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

import SmoothScroll from '@/components/Earth/smoothScroll';
import Projects from '@/components/Earth/projects';
import dynamic from 'next/dynamic';

const Earth = dynamic(() => import('../components/Earth/earth'), {
  ssr: false,
  loading: () => <img src="/assets/placeholder.png"></img>
})

const projects = [
  {
    name: "Dyal Thak",
    handle: "dyal_thak"
  },
  {
    name: "Leidinger Matthias",
    handle: "leidinger_matthias"
  },
  {
    name: "Mark Rammers",
    handle: "mark_rammers"
  },
  {
    name: "Landon Speers",
    handle: "landon_speers"
  }
]


export default function Home() {

  const stickyElement = useRef(null);

  const container = useRef(null);
  const stickyMask = useRef(null);

  const initialMaskSize = .8;
  const targetMaskSize = 30;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect( () => {
    requestAnimationFrame(animate)
  }, [])

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress();
    stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + "%";
    requestAnimationFrame(animate)
  }

  const getScrollProgress = () => {
    const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
    const delta = scrollProgress - easedScrollProgress;
    easedScrollProgress += delta * easing;
    return easedScrollProgress
  }

  useEffect( () => {
    const lenis = new Lenis()
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  }, [])

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  }

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring)
  }

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
  }, [])

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2 * 0.25);
    const targetY = clientY - (window.innerWidth / 2 * 0.30);
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  }

  return (
    <main className={styles.main}>

      {/*<Header ref={stickyElement}/>*/}
      {/*<StickyCursor stickyElement={stickyElement}/>*/}
      
      
      <Galery />
      <ZoomParallax />
      <MouseScale />
      <Card />
      <GSAP />
      <FramerMotion />

      <div onMouseMove={mouseMove} >
      {
        projects.map( ({handle}, i) => {
          return <Gallery mousePosition={mousePosition} handle={handle} key={i}/>
        })
      }
      <Description mousePosition={mousePosition} projects={projects}/>
      </div>
      
      <FloatingGalery />

      <MenuImage />

      <TextOverlay />

      <TextScroll />

      <div style={{height: "100vh"}}></div>
      <Paragraph paragraph={paragraph}/>
      <div style={{height: "100vh"}}></div>
      <Word paragraph={paragraph}/>
      <div style={{height: "100vh"}}></div>
      <Character paragraph={paragraph} />
      <div style={{height: "100vh"}}></div>
      

      <SmoothScroll>
        <div className={styles.maindiv}>
          <Earth />
          <Projects />
        </div>
      </SmoothScroll>

      <div className={styles.maincontainer}>
        <FloatingShape />
      </div>

      <WeirdText />

      <TextDisper />

      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <video autoPlay muted loop>
            <source src="/medias/nature.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>

      <StickyButtons/>

      <BezierCurve />
    </main>
  )
}