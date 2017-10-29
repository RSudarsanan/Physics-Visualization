// to set the default world of the engine 
/**
 * @array Example 
 * @brief Example is a global associative array which contains
 * definition of sample world and main world 
 * in form of objects
 * @return after getting created , it returns the engine, render, runner,
 * canvas and stop function
*/

var Example = Example || {};
// creating aliases for matter.js functions
Example.mixed = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: '#e6ffff',
            showAngleIndicator: true,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    World.add(world, [
        // walls
        //Bodies.rectangle(400, -20, 800, 100, { isStatic: true }),
        Bodies.rectangle(849, 300, 100, 600, { isStatic: true }),
        Bodies.rectangle(-49, 300, 100, 600, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 150, { isStatic: true, render: {fillStyle: '#1aff1a',
         strokeStyle: '#66ff66',
         lineWidth: 0} }),
        Bodies.rectangle(400, 600, 800, 100, { isStatic: true, render: {fillStyle: '#996633',
         strokeStyle: 'blue',
         lineWidth: 0} }),
        //Bodies.circle(400,300,10,{ render : { fillStyle: 'red'} , mass : 100, force : { x: 2, y: 2 }})
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 1, y: 0 },
        max: { x: 790, y: 515 }
    });

    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};
