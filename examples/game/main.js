/* 
 The code in this demo is based off of Sitepoint - HTML5 Games: Novice to Ninja Ch3
 This is an exercise in Canvas animation and understanding someone else's code.
keep track of assets (container)
    game loop
        get user input
        move everything a little bit (update)
        respond to collisions
        draw everything (canvas)
👾 🚀
*/
import lib from "./lib/index.js";

const { CanvasRenderer, Text, KeyControls } = lib;

// Game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
document.querySelector("#board").appendChild(renderer.view);
const controls = new KeyControls();

// show something

const message = new Text("Hello world", {
  font: "30pt sans-serif",
  fill: "DarkRed",
  align: "center"
});
message.pos.x = 100;
message.pos.y = 30;

message.update = function (dt) {
  this.pos.x += dt * 400;
  this.pos.y += dt * 400;
};

// Main loop
let dt = 0;
let last = 0;

function loopy(ms) {
  requestAnimationFrame(loopy);
  // to account for performance differences...ms is passed in and is the time since the page was loaded.
  // convert to seconds
  const t = ms / 1000;
  // find the amount of time since last time the loop was called...we can use this to update our assets
  dt = t - last;
  // reset last to the current time.
  last = t;

  // move everything a bit.
  // message.update(dt);

  // render everything
  renderer.ctx.save();
  renderer.ctx.translate(Math.round(message.pos.x), Math.round(message.pos.y));
  const { font, fill, align } = message.style;
  if (font) renderer.ctx.font = font;
  if (fill) renderer.ctx.fillStyle = fill;
  if (align) renderer.ctx.textAlign = align;
  renderer.ctx.fillText(message.text, 0, 0);
  renderer.ctx.restore();
}

requestAnimationFrame(loopy);
