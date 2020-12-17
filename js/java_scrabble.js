/*
 Name: Tony Dam
 Email: tony_dam@student.uml.edu
 Affiliation: Junior Student at UMass Lowell in COMP.4610-201
              91.61 GUI Programming I
Date created: 11/23/20

Sources from: W3Schools, Stackoverflow, Youtube, JSFiddle
and https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient

Website was created for personal use. Creates a mini version of scrabble
word game, counting the word, letter, and tile scores.
Copyright (c) November 23rd, 2020 Tony Dam. All rights reserved.
May be freely copied or excerpted for educational purposes with credit to
author.
*/
$(document).ready(function() {
    $(function() {
        for(let i = 1; i < 8; i++){
            $(`#letterSlot${i}`).droppable(droppableOpts);
        }
    });
    initialSetUp();
});

var dropped;
var droppedOn;
var dropped_id;
var droppedOn_id;

    var droppableOpts = {
        drop: function(ev, ui) {
            dropped = ui.draggable;
            droppedOn = $(this);
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
            dropped.position({of: droppedOn});

            droppedOn_id = droppedOn[0].id;
            
            $( `#${droppedOn_id}` ).droppable({
                accept: ".tileFromBag"
            });
            /* keeps track of letter points */
            console.log($(dropped[0]));
            var letterPoints = parseInt(dropped[0].attributes.points.nodeValue);
            console.log(letterPoints);

            /* keeps track of word points */
            console.log($(dropped[0]));
            var wordPoints = parseInt(dropped[0].attributes.points.nodeValue);
            console.log(wordPoints);
            
            var origin = parseInt(dropped[0].attributes.fromSlot.nodeValue);
            console.log(origin);
            
            dropped_id = dropped[0].id;

            $(`#${dropped_id}`).draggable("disable"); //disables draggable after dropping

            missingSlots.push(origin);//tile slot that needs to be repopulated

            var slot_number = parseInt(droppedOn[0].attributes.col.nodeValue);
            console.log(slot_number);
            /*if bonus letter slot is landed */
            if (slot_number == 2) {
                letterPoints *= 2;
                console.log("double points" + letterPoints);
            }
            /*if bonus word slot is landed */
            if (slot_number == 6){
                wordPoints *= 2;
                console.log("double points" + wordPoints);
            }

            /* adds letter and word points */
            gameScore += letterPoints;
            wordScore += wordPoints;

            $( `#${droppedOn_id}` ).droppable( "option", "accept", ".no_longer_accepts" );
        }
    }
   var default_tiles = ["A", "A", "A", "A", "A", "A", "A", "A", "A", 
                        "B", "B", "C", "C", "D", "D", "D", "D", "E", 
                        "E", "E", "E", "E", "E", "E", "E", "E", "E", 
                        "E", "E", "F", "F", "G", "G", "G", "H", "H",  
                        "I", "I", "I", "I", "I", "I", "I", "I", "I", 
                        "J", "K", "L", "L", "L", "L", "M", "M", "N",
                        "N", "N", "N", "N", "N", "O", "O", "O", "O", 
                        "O", "O", "O", "O", "P", "P", "Q", "R", "R", 
                        "R", "R", "R", "R", "S", "S", "S", "S", "T", 
                        "T", "T", "T", "T", "T", "U", "U", "U", "U",  
                        "V", "V", "W", "W", "X", "Y", "Y", "Z", "_", 
                        "_"
                        ] ;

    /* Variables for tiles */
    var tiles = [] ; 
    tiles = [...default_tiles];
    var missingSlots = [];
    var newGame = 1;
    var gameScore = 0;
    var wordScore = 0;
    
    function randomTile() {
        var missing = 7 - $("#rackContainer img").length;
        while (tiles.length > 0 && missing > 0) {
            let index = Math.floor((Math.random() * tiles.length) % tiles.length);
            let letterPickedFromBag = tiles[index];

            putOnRack(letterPickedFromBag);

            tiles.splice(index, 1); 
            
            console.log(letterPickedFromBag);
            missing--;
        }
    }

    /*
        rack tiles
    */
    function putOnRack(letterPickedFromBag) {
        for ( let i = 0; i < missingSlots.length; i++) {
            let slot_to_fill = missingSlots[i];
            jQuery('<img/>', {
                id: `tileFromBag${slot_to_fill}`,
                "class": 'tileFromBag ui-draggable',
                letter : letterPickedFromBag,
                points  : ScrabbleTiles[letterPickedFromBag].value,
                fromSlot   : slot_to_fill
            }).appendTo(`#tile${slot_to_fill}`);
            $(`#tileFromBag${slot_to_fill}`).attr("src", `tiles/Scrabble_Tile_${letterPickedFromBag}.jpg`);
            missingSlots.splice(i, 1);

            $(`#tileFromBag${slot_to_fill}`).draggable();
            $(`#tileFromBag${slot_to_fill}`).hover(function() {
                $(this).css('cursor','pointer');
            });
            $( `#tileFromBag${slot_to_fill}` ).draggable({
                scroll: false
            });
            $( `#tileFromBag${slot_to_fill}` ).draggable({
                revert: true
            });
        }
    }

    /*
        sets up beginning of program
    */
    function initialSetUp() {
        for(let i = 1; i < 8; i++){
            let index = Math.floor((Math.random() * tiles.length) % tiles.length);
            let letterPickedFromBag = tiles[index];
            jQuery('<img/>', {
                id: `tileFromBag${i}`,
                "class": 'tileFromBag ui-draggable',
                letter : letterPickedFromBag,
                points  : ScrabbleTiles[letterPickedFromBag].value,
                fromSlot   : i
            }).appendTo(`#tile${i}`);

            $(`#tileFromBag${i}`).attr("src", `tiles/Scrabble_Tile_${letterPickedFromBag}.jpg`);
            tiles.splice(index, 1); 
            
            console.log(letterPickedFromBag);
        }

        $(function() {
            for(let i = 1; i < 8; i++){
                $(`#tileFromBag${i}`).draggable();
                $(`#tileFromBag${i}`).hover(function() {
                    $(this).css('cursor','pointer');
                });
                $( `#tileFromBag${i}` ).draggable({
                    scroll: false
                });
                $( `#tileFromBag${i}` ).draggable({
                    revert: true
                });
            }
        });

        newGame = 0;
    }

    /*
        resets the board and prepares for the next work to place
    */
    function nextWord() {
        clear();
        randomTile();
        updateIndicators(); //not working properly
        nextRound();
    }

    function nextRound() {
        $(function() {
            for(let i = 1; i < 8; i++){
                $(`#letterSlot${i}`).droppable(droppableOpts);
                $(`#letterSlot${i}` ).droppable( "option", "accept", ".tileFromBag" );
            }
        });
    }

    /*
    displays scores
    */
    function updateIndicators() {
        $('#score').text("Word Score:\n" + wordScore);
        $('#total').text("Letter Score: " + gameScore);
        $('#tilesLeft').text("Tiles Remaining:\n" + tiles.length);
    }

    /*
    clears board
    */
    function clear() {

        for(let i = 1; i < 8; i++){
            $(`#letterSlot${i}`).empty();
        }

    }

    /*
    resets the entire game
    */
    function restart() {
        clear();
        recall();
        newGame = 1;
        gameScore = 0;
        wordScore = 0;
        tiles = [...default_tiles];
        nextRound();
        initialSetUp();
        updateIndicators();
    }

    /*
    gets rid of all tiles on rack if there are any
    */
   function recall() {
    for(let i = 1; i < 8; i++){
        $(`#tile${i}`).empty();
    }
   }
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;