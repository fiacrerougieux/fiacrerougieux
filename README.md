# Introduction to solar cells
## Welcome
This is the repo of my site https://fiacrer.github.io/.


![Solar Cell](SolarCell.PNG)

## Overall description
The website describes the very basics of solar cell operation by using javascript based animations. Each html page references three javascript scripts, the main script is specific to the current html page. The main script uses two supporting scripts called engine and utilities. All the js scripts are written in p5.js. Shoutout to The Coding Train for explaining how to use p5.js in an awesome way.

## Decscription of the supporting scripts
### Engine.js
Engine.js is the core of the program for the animation of solar cells.

#### Classess
It contains six classes:
- Particle: this is the parent class of photons, electrons and holes.
- Photon: this is a child class to the Particle class.
- Phonon: this is a child class to the Particle class.
- Electron: this is a child class to the Particle class.
- Hole: this is a child class to the Particle class.
- Load: this is a class to define loads.

Electrons and holes can be hot or cold.

#### Methods
Electrons, holes and photons have the methods:
- .collide() for electrons to collide with each others and holes to collide with each other.

Electrons, holes, photons and phonons have the methods:
- .move() to move around the solar cell

Electrons, holes, photons, phonons and loads have the method:
- .display() to be displayed on the screen

### Utilities.js
Utilities.js contains the functions used during the animation.

#### Functions
It contains ten functions:
- initialise() initialise the variables for the simulation so that all simulations on the site have the same starting values.
- electronHoleInteraction() for electrons and holes to collide and recombine.
- electronHoleElectronAuger() for electrons and holes Auger recombination.
- removePhonons() to remove phonons when they reach the edge of the simulation volume.
- electronElectronTrapInteraction() to simulate the electron trap interaction.
- holeHoleTrapInteraction() to simulate the hole trap interaction.
- carrierRecombinationCentreInteraction() to simulate the carrier recombination centre interaction.
- electronPhononInteraction() to simulate the electron phonon interaction.
- deleteElectronRight() to delete electrons at the right of the simulation volume.
- displayCellElements() to display various cell elements such as the absorber, the electron selective membrane, the hole selective membrane and the metal contact, wire and load.
- displayLegend() to display the legend of various objects such as photons, electrons, holes and cell elements such as the absorber, the electron selective membrane, the hole selective membrane and the metal contact, wire and load.

## That is it
Let me know if you have any feedback!
