const cfonts = require("cfonts");

function displayTitle() {
  cfonts.say("EMPLOYEE\nMANAGER", {
    font: "slick",
    align: "left",
    colors: ["blueBright", "yellow"],
    background: "transparent",
    letterSpacing: 2,
    lineHeight: 1,
    space: true,
    maxLength: "0",
  });
}

module.exports = displayTitle;
