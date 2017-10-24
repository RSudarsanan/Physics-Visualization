var Example = Example || {};

Example.Sample1 = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Body = Matter.Body,
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
            wireframes: false,
            showVelocity: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
/*    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
        var sides = Math.round(Common.random(1, 8));

        // triangles can be a little unstable, so avoid until fixed
        sides = (sides === 3) ? 4 : sides;

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }

        switch (Math.round(Common.random(0, 1))) {
        case 0:
            if (Common.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { isStatic: true, chamfer: chamfer });
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
            }
        case 1:
            return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
        }
    });*/

    var cradle = Composites.newtonsCradle(280, 100, 5, 30, 200);
    World.add(world, cradle);
    Body.translate(cradle.bodies[0], { x: -180, y: -140 });
    /*
    cradle = Composites.newtonsCradle(280, 380, 7, 20, 140);
    World.add(world, cradle);
    Body.translate(cradle.bodies[0], { x: -140, y: -100 });*/

    //World.add(world, stack);

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

    // context for MatterTools.Demo
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
