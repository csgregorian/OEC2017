`use strict`

var selected = []
var textdata = "";
var houseDatanotsplit = [];
var houseData = [];
var textFileName = "";

var cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: elements,

    minZoom: 0.25,
    maxZoom: 5,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#353638',
                'label': 'data(id)',
                'color': '#f7f9fc',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'label': 'data(weight)'
            }
        },

        {
            selector: 'node[type="generator"]',
            style: {
                'shape': 'hexagon',
                'width': 120,
                'height': 120
            }
        },

        {
            selector: 'node[type="control"]',
            style: {
                'shape': 'ellipse',
                'width': 80,
                'height': 80
            }
        },
        {
            selector: 'node[type="house"]',
            style: {
                'shape': 'rectangle',
                'width': 50,
                'height': 50
            }
        },
        {
            selector: '[flow="true"]',
            style: {
                'background-color': 'red',
                'line-color': 'red'
            }
        }
    ]
});

var options = {
    name: 'cose',

    // Called on `layoutready`
    ready: function() {},

    // Called on `layoutstop`
    stop: function() {},

    // Whether to animate while running the layout
    animate: true,

    // The layout animates only after this many milliseconds
    // (prevents flashing on fast runs)
    animationThreshold: 250,

    // Number of iterations between consecutive screen positions update
    // (0 -> only updated on the end)
    refresh: 20,

    // Whether to fit the network view after when done
    fit: true,

    // Padding on fit
    padding: 30,

    // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    boundingBox: undefined,

    // Randomize the initial positions of the nodes (true) or use existing positions (false)
    randomize: false,

    // Extra spacing between components in non-compound graphs
    componentSpacing: 100,

    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: function(node) { return 400000; },

    // Node repulsion (overlapping) multiplier
    nodeOverlap: 10,

    // Ideal edge (non nested) length
    idealEdgeLength: function(edge) { return edge._private.data.weight; },

    // Divisor to compute edge forces
    edgeElasticity: function(edge) { return 100; },

    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: 5,

    // Gravity force (constant)
    gravity: 80,

    // Maximum number of iterations to perform
    numIter: 1000,

    // Initial temperature (maximum node displacement)
    initialTemp: 200,

    // Cooling factor (how the temperature is reduced between consecutive iterations
    coolingFactor: 0.95,

    // Lower temperature threshold (below this point the layout will end)
    minTemp: 1.0,

    // Whether to use threading to speed up the layout
    useMultitasking: true
};

cy.layout(options);

cy.layout(options);

cy.center();
cy.fit();
cy.boxSelectionEnabled()

cy.on("select", function(event) {
    // console.log(event);
    // cy.animate({ fit: { eles: event.cyTarget }});

    paths = cy.elements().dijkstra({
        root: event.cyTarget,
        weight: function(edge) {
            return edge.data('weight');
        }
    })

    if (paths.distanceTo(cy.$("#A-1")) <= paths.distanceTo(cy.$("#A-2"))) {
        selected = paths.pathTo(cy.$("#A-1"))
    } else {
        selected = paths.pathTo(cy.$("#A-2"))
    }

    selected.each(function(i, ele) {
        ele.data('flow', 'true')
    })

    cy.nodes("[flow='true']").each(function(i, ele) {
        console.log(ele.data('id'))
    })
});

cy.on("unselect", function(event) {
    selected.each(function(i, ele) {
        ele.data('flow', 'false')
    })

    console.log(event);
    cy.animate({ fit: { eles: cy.elements() } });
});

$("#openfile").click(function() {
    var path = dialog.showOpenDialog({
        properties: ['openFile']
    });

    var fs = require('fs-extra');

    var textpath = String(path);

    fs.readFile(textpath, 'utf-8', function(err, data) {
        textdata = data;

        textdata = textdata.replace(/\r?\n|\r/g, " ");
        houseData = textdata.split(" ");
        console.log(houseData);
        var newpath = textpath.split('\\').pop().split('/').pop();

        $("#file").text(newpath);
    });
});