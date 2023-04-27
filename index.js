new Label("ZIM - Sinuca").alp(0.5).pos(30,30);
F.color = white; // frame color

// new Physics(gravity, borders, scroll, frame)
const physics = new Physics(0);

// holes positions
const holes_pos = [[420 , 640], 
                   [-420, 640],
                   [420 , 75 ],
                   [-420, 75 ],
                   [0   , 65 ],
                   [0   , 650]];

// bords positions and shapes
const bords_pos_shapes = [[-435, 130], [30 , 500],
                          [435 , 130], [30 , 500],
                          [210 , 665], [360, 30 ],
                          [210 , 75 ], [360, 30 ],
                          [-210, 665], [360, 30 ],
                          [-210, 75 ], [360, 30 ]];

//RESTART
const restart = new Rectangle(80,80,blue)
    .alp(0.9)
    .cur()
    .center();
makeIcon("rotate", white, gray).alp(0.8).center(restart);

function createTable(game_status){
    var table = new Rectangle(875,600,green.darken(0.3))
        .center()
        .addPhysics(false);
    table.removeFrom();
    
    if (game_status === true) {
        table.addTo();
    }
    else{
        table.removeFrom();
    }
}

function createHole(hole_pos, game_status){
    var hole = new Circle(25,white,grey)
        .centerReg()
        .pos(hole_pos[0], hole_pos[1], CENTER, BOTTOM)
        .addPhysics(false);
    hole.removeFrom();
      
    if (game_status === true) {
        hole.addTo();
    }
    else{
        hole.removeFrom();
    }
}

function createHoles(holes_pos, game_status) {
    const holes = [];
    for (var idx in holes_pos){
        holes.push(createHole(holes_pos[idx], game_status));
    }
    return holes;
}

function createBord(bord_pos, bord_shape, game_status) {
    var bord = new Rectangle(bord_shape[0], bord_shape[1], brown.darken(0.6))
        .centerReg()
        .pos(bord_pos[0], bord_pos[1], CENTER, BOTTOM)
        .addPhysics(false);
    bord.removeFrom();
    
    if (game_status === true) {
        bord.addTo();
    }
    else{
        bord.removeFrom();
    }
}

function createBords(bords_pos_shapes, game_status) {
    const bords = [];
    for (var id in bords_pos_shapes) {
        if ((id % 2) === 0) {
            bords.push(createBord(bords_pos_shapes[id],
                                  bords_pos_shapes[(id+++1)],
                                  game_status));
        }
    }
    return bords;
}

function createGame(start_game) {    
        if (start_game === true) {
            // create a table
            var table = createTable(start_game);
            
            // create a ball
            const ball = new Circle(25,blue,grey)
            	.center()
            	.addPhysics({bounciness:1.1});
            
            // create holes
            var holes = createHoles(holes_pos, start_game);
            
            // create Bords
            var bords = createBords(bords_pos_shapes, start_game);
            
            // turn on dragging
            physics.drag();
            
            //test to see if the ball is on one of the holes
            ball.contact(obj=>{
            	for (var i in holes) {
            	    if (obj == holes[i]) {
                		obj.color = blue;
                		ball.removeFrom();
                		restart.addTo();
                		start_game = false;
                		createGame(start_game);
                		S.update();
                	}
                }
            });
        }
        else {
            restart.on("mousedown", ()=>{
                var table = createTable(start_game);
                var bords = createBords(bords_pos_shapes, start_game);
                var holes = createHoles(holes_pos, start_game);
                restart.removeFrom();
                start_game = true;
                createGame(start_game);
                S.update();
            });
        }
}

const start = createGame(true);
