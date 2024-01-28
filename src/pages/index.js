import React, { useEffect, useRef, useState } from "react";
import { FaPause } from "react-icons/fa";

import "./../styles/index.scss";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const IndexPage = () => {
  const gameWrapper = useRef(null);
  const staticFriesImg = useRef(null);
  const paused = useRef(false);
  const [gamePuased, setGamePuased] = useState(false);
  const lastPauseTimestamp = useRef(undefined);
  const timePaused = useRef(0);
  const [score, setScore] = useState("0000");
  const potatoesNumberRef = useRef(500);
  const [potatoesNumber, setPotatoesNumber] = useState(
    potatoesNumberRef.current.toString()
  );

  useEffect(() => {
    let start = Date.now(),
      potatoFallingDuration = 10000,
      maxPotatoes = 500;

    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && !paused.current) {
        paused.current = true;
        lastPauseTimestamp.current = Date.now();
        setGamePuased((gamePuased) => true);
      }
    });

    window.addEventListener("blur", () => {
      if (!paused.current) {
        paused.current = true;
        lastPauseTimestamp.current = Date.now();
        setGamePuased((gamePuased) => true);
      }
    });

    const peelers = gameWrapper.current.querySelectorAll(".peelers div");

    const peelersOffsetTop =
      gameWrapper.current.querySelector(".peelers").offsetTop;
    const peelersHeight =
      gameWrapper.current.querySelector(".peelers").clientHeight;

    function numberTransition(start, end, duration) {
      const interval = 10; // Interval in milliseconds
      const steps = duration / interval;
      const stepValue = (end - start) / steps;

      let stepCount = 0;

      const transitionInterval = setInterval(() => {
        if (!paused.current) {
          potatoFallingDuration += stepValue;
          stepCount++;

          if (stepCount >= steps) {
            clearInterval(transitionInterval);
          }
        }
      }, interval);
    }

    numberTransition(potatoFallingDuration, 2500, 30000);

    function generatePotatoes(elapsedTime) {
      const potatoRow = document.createElement("div");
      potatoRow.dataset.elapsedTime = elapsedTime.toString();
      potatoRow.className = "potatoRow";
      potatoRow.style.bottom = `${window.innerHeight}px`;

      const numPotatoes = Math.random() < 0.5 ? 1 : 2;
      const columns = [1, 2, 3];
      for (let i = 0; i < numPotatoes && potatoesNumberRef.current > 0; i++) {
        const randomIndex = Math.floor(Math.random() * columns.length);

        const potato = document.createElement("div");
        potato.style.gridColumn = `${columns[randomIndex]}`;
        potato.dataset.column = `${columns[randomIndex]}`;
        potato.className = "potato";
        potatoRow.append(potato);

        potatoesNumberRef.current--;
        setPotatoesNumber(
          potatoesNumberRef.current.toString().padStart(3, "0")
        );

        columns.splice(randomIndex, 1);
      }
      gameWrapper.current.prepend(potatoRow);
    }

    gameWrapper.current.addEventListener("touchstart", potatoOnTouchStart);

    function potatoOnTouchStart(e) {
      e.preventDefault();
      const currentTarget = e.target;
      if (
        e.target.classList.contains("potato") &&
        currentTarget.getBoundingClientRect().top + currentTarget.clientHeight >
          peelersOffsetTop &&
        currentTarget.getBoundingClientRect().top <
          peelersOffsetTop + peelersHeight
      ) {
        currentTarget.classList.add("clicked");
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

        const friesIncrementIndicator = document.createElement("img");
        friesIncrementIndicator.src =
          "https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/fries.png";
        friesIncrementIndicator.className = "friesIncrementIndicator";
        gameWrapper.current.append(friesIncrementIndicator);

        animateElementInArc(
          friesIncrementIndicator,
          e.changedTouches[0].clientX - scoreIncrementIndicator.clientWidth / 2,
          e.changedTouches[0].clientY -
            scoreIncrementIndicator.clientHeight / 2,
          staticFriesImg.current.getBoundingClientRect().left,
          staticFriesImg.current.getBoundingClientRect().top,
          1000
        );

        friesIncrementIndicator.onanimationend = (e) => {
          if (e.animationName === "friesIncrementIndicatorPulse") {
            gameWrapper.current.removeChild(friesIncrementIndicator);
            gameWrapper.current.removeChild(scoreIncrementIndicator);
          }
        };

        friesIncrementIndicator.onanimationstart = (e) => {
          if (e.animationName === "friesIncrementIndicatorPulse") {
            setScore((score) =>
              (Number(score) + 10).toString().padStart(4, "0")
            );
          }
        };
      }
    }

    function animateElementInArc(
      element,
      startX,
      startY,
      endX,
      endY,
      duration
    ) {
      const controlX = randomIntFromInterval(0, window.innerWidth);
      const controlY = randomIntFromInterval(startY, endY);

      const startTime = Date.now();

      function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const currentX = quadraticBezier(startX, controlX, endX, progress);
        const currentY = quadraticBezier(startY, controlY, endY, progress);

        element.style.top = currentY + "px";
        element.style.left = currentX + "px";

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      function quadraticBezier(start, control, end, t) {
        return (
          Math.pow(1 - t, 2) * start +
          2 * (1 - t) * t * control +
          Math.pow(t, 2) * end
        );
      }

      animate();
    }

    function step() {
      if (!paused.current) {
        const elapsed = Date.now() - start - timePaused.current;
        const potatoRows = gameWrapper.current.querySelectorAll(".potatoRow");

        if (potatoRows[0].offsetTop > 0) {
          generatePotatoes(elapsed);
        }

        if (potatoRows[potatoRows.length - 1].offsetTop > window.innerHeight) {
          gameWrapper.current.removeChild(potatoRows[potatoRows.length - 1]);
        }

        potatoRows.forEach((el) => {
          const value =
            (elapsed - el.dataset.elapsedTime) / potatoFallingDuration;
          if (value < 1) {
            el.style.bottom = `${
              window.innerHeight -
              (window.innerHeight + window.innerWidth / 3) * value
            }px`;
          }
        });
      }
      requestAnimationFrame(step);
    }

    generatePotatoes(0);
    requestAnimationFrame(step);
  }, [setScore]);

  return (
    <>
      <div className="minigame">
        <div className="topBar">
          <div className="score">
            <img
              ref={staticFriesImg}
              src="https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/fries.png"
            />
            <div className="digitsWrapper">
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
          </div>
          <div className="potatoesNumber">
            <img src="https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/potato.png" />
            <div className="digitsWrapper">
              <div
                className="digits"
                style={{
                  transform: `translateY(calc(-${Number(
                    potatoesNumber[0]
                  )} * 5.2vw))`,
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
                  transform: `translateY(calc(-${Number(
                    potatoesNumber[1]
                  )} * 5.2vw))`,
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
                  transform: `translateY(calc(-${Number(
                    potatoesNumber[2]
                  )} * 5.2vw))`,
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
          </div>
          <button
            className="pauseButton"
            onClick={() => {
              paused.current = true;
              lastPauseTimestamp.current = Date.now();
              setGamePuased(true);
            }}
          >
            <FaPause />
          </button>
        </div>
        <div className="potatoGame" ref={gameWrapper}>
          <div className="peelers">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {gamePuased && (
          <div className="pausePopup">
            <div>
              <button
                onClick={() => {
                  paused.current = false;
                  timePaused.current += Date.now() - lastPauseTimestamp.current;
                  setGamePuased(false);
                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <link
      rel="preload"
      as="image"
      href="https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/potato.png"
    ></link>
    <link
      rel="preload"
      as="image"
      href="https://devlak2001.s3.eu-central-1.amazonaws.com/potatoPeeler/fries.png"
    ></link>
    <title>Home Page</title>
  </>
);
