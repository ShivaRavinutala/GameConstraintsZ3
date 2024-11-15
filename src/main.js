// Jim Whitehead
// Created: 5/26/2024
// Phaser: 3.80.0
//
// Pathfinder demo
//
// An example of pathfinding in Phaser using the EasyStar.js pathfinder 
// https://github.com/prettymuchbryce/easystarjs
// 
// Assets from the following Kenney Asset packs
// Tiny Dungeon
// https://kenney.nl/assets/tiny-dungeon
//
// Tiny Town
// https://kenney.nl/assets/tiny-town
//


// game config
// Imports
window.global = window;

import Load from './Scenes/Load.js';
import Boot from './Scenes/Boot.js';
import Pathfinder from './Scenes/Pathfinder.js';

// Game configuration
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1280,
    height: 800,
    scene: [Load, Boot, Pathfinder]
}

// Declare variables
var cursors;
const SCALE = 2.0;

// Initialize the game
const game = new Phaser.Game(config);

