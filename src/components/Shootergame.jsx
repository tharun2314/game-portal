/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import bg from "../images/space.jpg";
import { Meteor } from "./Meteor";
import { Bullet } from "./Bullet";
import QuestionModal from "./QuestionModal";

function Shootergame() {
  let canvas;
  let ctx;
  let maxMeteorCount = 10;
  let lastMeteorSpawnAt = Date.now();
  const [showQuiz, setShowQuiz] = useState(false);

  const player = new Player(950 / 2, 550 / 1.5);
  const randomNumber = (min, max) => Math.random() * max + min;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("myCanvas");
    const ex = new Meteor();

    let meteors = [];
    let bullets = [];
    const fireBulletcb = (xpos, ypos) => bullets.push(new Bullet(xpos, ypos));

    setInterval(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 950, 550);

      player.update(fireBulletcb);
      player.draw(ctx);

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
    }, 20);
  });
  const close = () => {
    setShowQuiz(false, () => {});
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "row",
      }}
    >
      <canvas
        id="myCanvas"
        width="950"
        height="550"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          border: "2px solid #000000",
          marginTop: "48px",
        }}
      />
      <QuestionModal open={showQuiz} onClose={close} />
    </div>
  );
}

export default Shootergame;
