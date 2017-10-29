
/*
 * @brief this is an auto run function at the time of execution, it 
 * sets the labels on the canvas for proper navigation on the page
*/
(function() {
    var sourceLinkRoot = 'examples';

    var demo = MatterTools.Demo.create({
        toolbar: {
            title: 'Homepage',
            url: '../homepage/index.html',
            reset: true,
            source: true,
            inspector: true,
            tools: true,
            fullscreen: true,
            exampleSelect: true
        },
        tools: {
            inspector: true,
            gui: true
        },
        inline: false,
        preventZoom: true,
        resetOnOrientation: true,
        routing: true,
        startExample: 'mixed',
        examples: [
            
            {
                name: 'Mechanics',
                id: 'mixed',
                init: Example.mixed,
                sourceLink: sourceLinkRoot + './default.js'
            },
            
            {
                name: 'Sample1',
                id: 'Sample1',
                init: Example.Sample1,
                sourceLink: sourceLinkRoot + './Sample1.js'
            },
            
            {
                name: 'Sample2',
                id: 'Sample2',
                init: Example.Sample2,
                sourceLink: sourceLinkRoot + './Sample2.js'
            }
            
        ]
    });
    document.body.appendChild(demo.dom.root);

    MatterTools.Demo.start(demo);
})();
