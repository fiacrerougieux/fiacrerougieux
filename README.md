# enerviz
## Welcome
This is the repo of my site enerviz.net

## Overall description
Each html page references three javascript scripts, the main script IS specific to the current html page. The main script uses two supporting scripts called engine and utilities. All the js scripts are written in p5.js. Shoutout to The Coding Train for explaining how to use p5.js in an awesome way.

## Decscription of the supporting scripts
### Engine.js
Engine.js is the core of the program for the animation of solar cells.

It contains five objects:
- Particle
- Photon
- Electron
- Hole
- Load.
Objects have methods such as:
- .move() to move around the solar cell
- .display() to be displayed on the screen
- .collide() for electrons to collide with each others and holes to collide with each other.

### Utilities.js
Utilities.js are tools used for the programs.

It contains four functions:
- initialise() initialise the variables for the simulation so that all simulations on the site have the same values
- electronHoleInteraction() for electrons and holes to collide and recombine
- displayCellElements() to display various cell elements such as the absorber, the electron selective membrane, the hole selective membrane and the metal contact, wire and load.
- displayLegend() to display the legend of various objects such as photons, electrons, holes and cell elements such as the absorber, the electron selective membrane, the hole selective membrane and the metal contact, wire and load.

## That is it
Let me know if you have any feedback!
