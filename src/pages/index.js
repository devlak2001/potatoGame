import React, { useEffect, useRef, useState } from "react";

import "./../styles/index.scss";

const IndexPage = () => {
  const gameWrapper = useRef(null);
  const [score, setScore] = useState("0000");

  useEffect(() => {
    let start;
    let maxPotatoes = 500;
    const peelers = gameWrapper.current.querySelectorAll(".peelers div");
    console.log(peelers[0]);
    const peelersOffsetTop =
      gameWrapper.current.querySelector(".peelers").offsetTop;
    const peelersHeight =
      gameWrapper.current.querySelector(".peelers").clientHeight;
    let speed = 0.1;

    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generatePotatoes(elapsedTime) {
      const potatoRow = document.createElement("div");
      potatoRow.dataset.elapsedTime = elapsedTime.toString();
      potatoRow.className = "potatoRow";
      potatoRow.style.bottom = `${window.innerHeight}px`;

      const numPotatoes = Math.random() < 0.5 ? 1 : 2;
      const columns = [1, 2, 3];
      for (let i = 0; i < numPotatoes && maxPotatoes > 0; i++) {
        const randomIndex = Math.floor(Math.random() * columns.length);

        const potato = document.createElement("img");
        potato.src =
          "https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/potato.png";
        potato.style.gridColumn = `${columns[randomIndex]}`;
        potato.dataset.peelable = "false";
        potato.dataset.column = `${columns[randomIndex]}`;
        potato.ontouchstart = potatoOnTouchStart;
        potatoRow.append(potato);

        maxPotatoes--;

        columns.splice(randomIndex, 1);
      }
      gameWrapper.current.append(potatoRow);
    }

    function potatoOnTouchStart(e) {
      const currentTarget = e.currentTarget;
      if (
        currentTarget.getBoundingClientRect().top + currentTarget.clientHeight >
          peelersOffsetTop &&
        currentTarget.getBoundingClientRect().top <
          peelersOffsetTop + peelersHeight
      ) {
        currentTarget.classList.add("clicked");
        setScore((score) => (Number(score) + 10).toString().padStart(4, "0"));
        peelers[parseInt(currentTarget.dataset.column) - 1].style.animation =
          "none";
        console.log(currentTarget.clientHeight);
        peelers[parseInt(currentTarget.dataset.column) - 1].style.animation =
          "peeling 0.4s ease";

        const scoreIncrementIndicator = document.createElement("div");
        scoreIncrementIndicator.textContent = "+10";
        scoreIncrementIndicator.className = "scoreIncrementIndicator";
        gameWrapper.current.append(scoreIncrementIndicator);
        scoreIncrementIndicator.style.top = `${
          e.changedTouches[0].clientY - scoreIncrementIndicator.clientHeight / 2
        }px`;
        scoreIncrementIndicator.style.left = `${
          e.changedTouches[0].clientX - scoreIncrementIndicator.clientWidth / 2
        }px`;
        setTimeout(() => {
          const clockwise = Math.random() < 0.5 ? 1 : -1;
          scoreIncrementIndicator.style.transform = `translateY(-${
            100 + randomIntFromInterval(0, 50)
          }%) scale(${1 + randomIntFromInterval(0, 50) / 100}) rotate(${
            clockwise * Math.floor(Math.random() * 45)
          }deg)`;
          scoreIncrementIndicator.style.opacity = "0";
        }, 0);
      }
    }

    function step(timeStamp) {
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;
      const potatoRows = gameWrapper.current.querySelectorAll(".potatoRow");

      if (potatoRows[potatoRows.length - 1].offsetTop > 0) {
        generatePotatoes(elapsed);
      }

      if (speed < 0.3) {
        speed = 0.1 + elapsed / 100000;
      }

      if (potatoRows[0].offsetTop > window.innerHeight) {
        gameWrapper.current.removeChild(potatoRows[0]);
      }

      potatoRows.forEach((el) => {
        el.style.bottom = `${
          window.innerHeight - (elapsed - el.dataset.elapsedTime) * speed
        }px`;
      });

      requestAnimationFrame(step);
    }

    generatePotatoes(0);
    requestAnimationFrame(step);
  }, [setScore]);

  return (
    <div className="potatoGame" ref={gameWrapper}>
      <div className="score">
        <div
          className="digits"
          style={{
            transform: `translateY(calc(-${Number(score[0])} * 11.4vw))`,
          }}
        >
          <div>
            <span>0</span>
          </div>
          <div>
            <span>1</span>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
          <div>
            <span>7</span>
          </div>
          <div>
            <span>8</span>
          </div>
          <div>
            <span>9</span>
          </div>
        </div>
        <div
          className="digits"
          style={{
            transform: `translateY(calc(-${Number(score[1])} * 11.4vw))`,
          }}
        >
          <div>
            <span>0</span>
          </div>
          <div>
            <span>1</span>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
          <div>
            <span>7</span>
          </div>
          <div>
            <span>8</span>
          </div>
          <div>
            <span>9</span>
          </div>
        </div>
        <div
          className="digits"
          style={{
            transform: `translateY(calc(-${Number(score[2])} * 11.4vw))`,
          }}
        >
          <div>
            <span>0</span>
          </div>
          <div>
            <span>1</span>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
          <div>
            <span>7</span>
          </div>
          <div>
            <span>8</span>
          </div>
          <div>
            <span>9</span>
          </div>
        </div>
        <div
          className="digits"
          style={{
            transform: `translateY(calc(-${Number(score[3])} * 11.4vw))`,
          }}
        >
          <div>
            <span>0</span>
          </div>
          <div>
            <span>1</span>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
          <div>
            <span>7</span>
          </div>
          <div>
            <span>8</span>
          </div>
          <div>
            <span>9</span>
          </div>
        </div>
      </div>
      <div className="peelers">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>Home Page</title>
  </>
);
