/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState} from 'react';
import { Player } from './Player';
import bg from '../images/space.jpg';
import { Meteor } from './Meteor'
import { Bullet } from './Bullet';
import QuestionModal from './QuestionModal';
import { create } from '@mui/material/styles/createTransitions';
import { useSelector, useDispatch } from 'react-redux';


function Shootergame() {
    const items = useSelector(state => state.example.items);
    console.log(items)
  let canvas;
  let ctx;
  let maxMeteorCount = 10;
  let lastMeteorSpawnAt = Date.now();
  const [showQuiz,setShowQuiz]=useState(false);
  const [i,setI]=useState(0);
  const [score,setScore]=useState(0)
  let timer=0;
  const player = new Player(950 / 2,550 / 1.5)
  const randomNumber = (min,max) => Math.random() * max + min;
  let createInterval=true;
  let visited=0;
  let scoree=0;
  let element=document.getElementById("score")
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("myCanvas");

    let meteors = []
    let bullets = []
    
    const fireBulletcb = (xpos,ypos) => bullets.push(new Bullet(xpos,ypos));
    if(!showQuiz)
        {
   let  myInterval=setInterval(() => {    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,950,550);
      
      player.update(fireBulletcb);
    //   setScore((prev)=>{
    //     if(prev!=player.score)
    //         return player.score
    //   })
      player.draw(ctx);
    //   let myscore=localStorage.getItem("score")
    //   player.setScore(myscore,ctx)

      const random = randomNumber(0, 700);
      if (
        meteors.length < maxMeteorCount &&
        Date.now() - lastMeteorSpawnAt > 1500
      ) {
        meteors.push(new Meteor(random, -200));
        lastMeteorSpawnAt = Date.now();
      }

      meteors = meteors.filter((enemy) => !enemy.dead);
      meteors.forEach((meteor) => {
        meteor.update(player, bullets);
        meteor.draw(ctx);
      });

      bullets = bullets.filter((bullet) => !bullet.dead);
      bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
      });
    

      let prevScore=player.score
      if(player.score%50==0 && player.score!=0 && player.score==prevScore)
        {
            let score=localStorage.getItem("score") || 0
            localStorage.setItem("score",score+70)
            clearInterval(myInterval)
          setShowQuiz(true)
        

        }
  
    }, 80);
}
  })
  const close=()=>{
    setShowQuiz(false)
    setI((prev)=>prev+1)

  }

  useEffect(()=>{

  })
  return (

    <div style={{
    display:'flex',justifyContent:'center',alignItems:'center',height:'100%',flexDirection:'row'
    }}>
        <canvas id="myCanvas" width="950" height="550" style={{backgroundImage: `url(${bg})`,backgroundSize:"cover" ,border:'2px solid #000000',marginTop:'48px'}}/>

        {showQuiz && <QuestionModal onClose={close} questionData={items?.questions[i]}/>}
    </div>
  );
}

export default Shootergame;
