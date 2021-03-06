/**
 * @class Basic_Constructs
 * @brief Basic building blocks of the drawing, like point,ray,line,circle , contains member functions to handle these basic objects and methods related to and needed for them
*/

var Basic_Constructs = {

  point: function(x, y) {return {type: 1, x: x, y: y, exist: true}},

  line: function(point1, point2) {return {type: 2, point1: point1, point2: point2, exist: true}},

  ray: function(point1, point2) {return {type: 3, point1: point1, point2: point2, exist: true}},

  line_segment: function(point1, point2) {return {type: 4, point1: point1, point2: point2, exist: true}},

  segment: function(point1, point2) {return {type: 4, point1: point1, point2: point2, exist: true}},

  circle: function(c, r) {
    if (typeof r == 'object' && r.type == 1) {
      return {type: 5, c: c, r: this.line_segment(c, r), exist: true}
    } else {
      return {type: 5, c: c, r: r, exist: true}
    }
  },
  //// basic vector-algebra functions
  /**
  * @method dot
  * @brief Calculates the dot product between 2 vectors whose tails aae at origins and heads passed as the points in the argueements
  * @param {Basic_Constructs.point} point1
  * @param {Basic_Constructs.point} point2
  * @return {Number}
  **/
  dot: function(point1, point2) {
    return point1.x * point2.x + point1.y * point2.y;
  },

  /**
  * @method cross
  * @brief Calculates the cross product between 2 vectors whose tails are at origins and heads passed as the points in the argueements
  * @param {Basic_Constructs.point} point1
  * @param {Basic_Constructs.point} point2
  * @return {Number}
  **/
  cross: function(l1, l2) {
    return point1.x * point2.y - point1.y * point2.x;
  },
  // basic functions for intersections between various connstructs
  /**
  * @method intersection
  * @brief Calculates the intersection point or points(if more than one and they exist),objects can be line and circle 
  * @param {Basic_Constructs} object1
  * @param {Basic_Constructs} object2
  * @return {Basic_Constructs.point}
  **/

  intersection: function(obj1, obj2) {
    // line & line
    if (obj1.type == 2 && obj2.type == 2) {
      return this.intersection_line_line(obj1, obj2);
    }
    // line & circle
    else if (obj1.type == 2 && obj2.type == 5) {
      return this.intersection_line_circle(obj1, obj2);
    }
    // circle & line
    else if (obj1.type == 5 && obj2.type == 2) {
      return this.intersection_line_circle(obj2, obj1);
    }
  },
  // intersection of line with line
  /**
  * @method intersection_line_line
  * @brief Calculates the intersection point of two line objects
  * @param {Basic_Constructs.line} object1
  * @param {Basic_Constructs.line} object2
  * @return {Basic_Constructs.point}
  **/

  intersection_line_line: function(l1, l2) {
    var A = l1.point2.x * l1.point1.y - l1.point1.x * l1.point2.y;
    var B = l2.point2.x * l2.point1.y - l2.point1.x * l2.point2.y;
    var xa = l1.point2.x - l1.point1.x;
    var xb = l2.point2.x - l2.point1.x;
    var ya = l1.point2.y - l1.point1.y;
    var yb = l2.point2.y - l2.point1.y;
    return Basic_Constructs.point((A * xb - B * xa) / (xa * yb - xb * ya), (A * yb - B * ya) / (xa * yb - xb * ya));
  },
  // intersection of line with circle
  /**
  * @method intersection_line_circle
  * @brief Calculates the intersection point of line and circle
  * @param {Basic_Constructs.line} object1
  * @param {Basic_Constructs.circle} object2
  * @return {Basic_Constructs.point}
  **/

  intersection_line_circle: function(l1, c1) {
    var xa = l1.point2.x - l1.point1.x;
    var ya = l1.point2.y - l1.point1.y;
    var cx = c1.c.x;
    var cy = c1.c.y;
    var r_sq = (typeof c1.r == 'object') ? ((c1.r.point1.x - c1.r.point2.x) * (c1.r.point1.x - c1.r.point2.x) + (c1.r.point1.y - c1.r.point2.y) * (c1.r.point1.y - c1.r.point2.y)) : (c1.r * c1.r);

    var l = Math.sqrt(xa * xa + ya * ya);
    var ux = xa / l;
    var uy = ya / l;

    var cu = ((cx - l1.point1.x) * ux + (cy - l1.point1.y) * uy);
    var px = l1.point1.x + cu * ux;
    var py = l1.point1.y + cu * uy;


    var d = Math.sqrt(r_sq - (px - cx) * (px - cx) - (py - cy) * (py - cy));

    var ret = [];
    ret[1] = Basic_Constructs.point(px + ux * d, py + uy * d);
    ret[2] = Basic_Constructs.point(px - ux * d, py - uy * d);

    return ret;
  },

  // functions to check whether intersection is on ray or not
   /**
  * @method intersection_is_on_ray
  * @brief checks whether the point lies on the ray
  * @param {Basic_Constructs.line} object1
  * @param {Basic_Constructs.ray} object2
  * @return {Bool}
  **/
  intersection_is_on_ray: function(point1, r1) {
    return (point1.x - r1.point1.x) * (r1.point2.x - r1.point1.x) + (point1.y - r1.point1.y) * (r1.point2.y - r1.point1.y) >= 0;
  },

  // functun to check whether intersection is on segment or not
 /**
  * @method intersection_is_on_segment
  * @brief checks whether the point lies on the segment
  * @param {Basic_Constructs.line} object1
  * @param {Basic_Constructs.segment} object2
  * @return {Bool}
  **/ 
  intersection_is_on_segment: function(point1, s1) {
    return (point1.x - s1.point1.x) * (s1.point2.x - s1.point1.x) + (point1.y - s1.point1.y) * (s1.point2.y - s1.point1.y) >= 0 && (point1.x - s1.point2.x) * (s1.point1.x - s1.point2.x) + (point1.y - s1.point2.y) * (s1.point1.y - s1.point2.y) >= 0;
  },
  // return parallel line
  /**
  * @method parallel
  * @brief returns line paralel to given line passing through the given point
  * @param {Basic_Constructs.line} object1
  * @param {Basic_Constructs.point} object2
  * @return {Basic_Constructs.line}
  **/ 

  parallel: function(l1, point1) {
    var dx = l1.point2.x - l1.point1.x;
    var dy = l1.point2.y - l1.point1.y;
    return Basic_Constructs.line(point1, Basic_Constructs.point(point1.x + dx, point1.y + dy));
  },
  // return midpoint
  /**
  * @method midpoint
  * @brief returns midpint of the given line or line_segment
  * @param {Basic_Constructs.line} object1
  * @return {Basic_Constructs.point}
  **/ 
  midpoint: function(l1) {
    var nx = (l1.point1.x + l1.point2.x) * 0.5;
    var ny = (l1.point1.y + l1.point2.y) * 0.5;
    return Basic_Constructs.point(nx, ny);
  },
  // returns perpendicular bisector line
  /**
  * @method perpendicular_bisector
  * @brief returns line perpendicular bisector to the given line
  * @param {Basic_Constructs.line} object1
  * @return {Basic_Constructs.line}
  **/ 
  perpendicular_bisector: function(l1) {
    return Basic_Constructs.line(
        Basic_Constructs.point(
          (-l1.point1.y + l1.point2.y + l1.point1.x + l1.point2.x) * 0.5,
          (l1.point1.x - l1.point2.x + l1.point1.y + l1.point2.y) * 0.5
        ),
        Basic_Constructs.point(
          (l1.point1.y - l1.point2.y + l1.point1.x + l1.point2.x) * 0.5,
          (-l1.point1.x + l1.point2.x + l1.point1.y + l1.point2.y) * 0.5
        )
      )
  },
  // functions to return length of segments
  length_of_segment: function(seg) {
    return Math.sqrt(this.length_squared(seg.point1, seg.point2));
  },
  length_of_segment_squared: function(seg) {
    return this.length_squared(seg.p1, seg.p2);
  },
  length: function(point1, point2) {
    return Math.sqrt(this.length_squared(point1, point2));
  },
  length_squared: function(point1, point2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    return dx * dx + dy * dy;
  }, 
};

// class with member functions which implement the drawing of basic functionality of 
/**
 * @class CanvasPainter
 * @brief This class has a drawing member function which basically draws the basic objects that are functinoal objects inn the basic-construct class.
*/
var canvasPainter = {
  draw: function(graph, color) {
    if (graph.type == 1) {
      ctx.fillStyle = color ? color : 'green';
      ctx.fillRect(graph.x, graph.y, 2, 2); //Draw a rectangle filled
    }
    // to draw a line 
    else if (graph.type == 2) {
      ctx.strokeStyle = color ;
      ctx.beginPath();
      var ang1 = Math.atan((graph.point2.y - graph.point1.y)/(graph.point2.x - graph.point1.x)); //slope
      var canvasLimit = Math.abs(graph.point1.x) + Math.abs(graph.point1.y) + canvas.height + canvas.width;  //Take a distance that exceeds the drawing area (as the line endpoint)
      ctx.moveTo(graph.point1.x - Math.cos(ang1) * canvasLimit, graph.point1.y - Math.sin(ang1) * canvasLimit);
      ctx.lineTo(graph.point1.x + Math.cos(ang1) * canvasLimit, graph.point1.y + Math.sin(ang1) * canvasLimit);
      ctx.stroke();
    }
    // to draw a ray
    else if (graph.type == 3) {
      ctx.strokeStyle = color ;
      var ang1, cvsLimit;
      ctx.beginPath();
      ang1 = Math.atan2((graph.point2.y - graph.point1.y),(graph.point2.x - graph.point1.x)); 
      canvasLimit = Math.abs(graph.point1.x) + Math.abs(graph.point1.y) + canvas.height + canvas.width;  
      ctx.moveTo(graph.point1.x, graph.point1.y);
      ctx.lineTo(graph.point1.x + Math.cos(ang1) * canvasLimit, graph.point1.y + Math.sin(ang1) * canvasLimit);
      ctx.stroke();
    }
    // (line_)segment
    else if (graph.type == 4) {
      ctx.strokeStyle = color ;
      ctx.beginPath();
      ctx.moveTo(graph.point1.x, graph.point1.y);
      ctx.lineTo(graph.point2.x, graph.point2.y);
      ctx.stroke();
    }
    //  draw the circle circle
    else if (graph.type == 5) {
      ctx.strokeStyle = color ;
      ctx.beginPath();
      if (typeof graph.r == 'object') {
        var dx = graph.r.point1.x - graph.r.point2.x;
        var dy = graph.r.point1.y - graph.r.point2.y;
        ctx.arc(graph.c.x, graph.c.y, Math.sqrt(dx * dx + dy * dy), 0, Math.PI * 2, false);
      } else {
        ctx.arc(graph.c.x, graph.c.y, graph.r, 0, Math.PI * 2, false);
      }
      ctx.stroke();
    }
  },
  clean_canvas: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

var Constructs = {};
//////////////////////////////////////////////////////////////    LINE OBJECT   /////////////////////////////////////////////////////////////////////////////////
// the generic functional obect
Constructs['lineobj'] = {//basic constuct
// generic event handlers used in various other object as it as.
/**
 * @fn c_mousedown
 * @brief Handles all the possibilities regarding the construction of
 *          of the lineobj which is an abstraction to many other objects which require a basic line to be drawn when the mouse is clicked and also calls
 *          the draw function accordingly
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mousedown: function(obj, mouse){
  obj.point2 = mouse;
  console.log("calling mouseOnPoint_construct");
  console.log(obj);
  console.log(mouse);
  if (!mouseOnPoint_construct(mouse, obj.point1)){
    draw(); // draw the object
  }
},

/**
 * @fn c_mousemove
 * @brief Handles all the possibilities regarding the construction of
 *          of the lineobj which is an abstraction to many other objects which require a basic line to be drawn when the mouse is clicked and also calls
 *          the draw function accordingly
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mousemove: function(obj, mouse){
  obj.point2 = mouse;
  obj.point1 = constructionPoint;
  if (!mouseOnPoint_construct(mouse, obj.point1)){
    draw();
  }
},

/**
 * @fn c_mouseup
 * @brief Handles all the possibilities regarding the construction of
 *          of the object when the mouse is lifted after it was clicked
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mouseup: function(obj, mouse){
  if (!mouseOnPoint_construct(mouse, obj.point1)){
    isConstructing = false;
  }
},

/**
 * @fn rayIntersection
 * @brief Computes the point wjere the ray passed as an arguement 
 *          hits the sides of the object, if the point lies on teh object then returns teh point
 * @param[in] obj the object with which intersectin is being considered
 * @param[in] ray the ray which is being considered for intersecton
 */

rayIntersection: function(obj, ray) {
  var rp_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.line(obj.point1, obj.point2));   
  if (Basic_Constructs.intersection_is_on_segment(rp_temp, obj) && Basic_Constructs.intersection_is_on_ray(rp_temp, ray)){
    return rp_temp; //return the point if it lies on the segment then only otherwise null will be returned
  }
}
};
///////////////////////////////////////////////////////////////////// SINGLE RAY oF lIGHT ///////////////////////////////////////////////////////////////////////
/**
 * @member Ray
 * @brief Contains all the necessary functions and parameters for drawing and creating and handling single ray of light
 */

  Constructs['Ray'] = {
/**
 * @fn create
 * @brief Creates the functional object of the Construct,which contains information about its type and necessary boundary points and properties if any.  
 */

  create: function(mouse) {
    return {type: 'Ray', point1: mouse, point2: mouse};
  },
  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,

/**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when its
 *          mouse is moved and when mousedown event occurs, just draws the support doesnt draws the rays, that is handled by shoot waiting rays function
 * @param[in] obj The object to be drawn
 */

  draw: function(obj) {
  //var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(255,255,0)';
  ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 2, 2);
  },

/**
 * @fn shoot
 * @brief shhot function for luminous objects treats the rays as a ray functional object of the class Basic_constructs and calculates from where the rays are to b eshot and adds
 those rays objects to an array of waitingRays. It doesnt draw the rays,it just adds the rays to the array 
 * @param[in] obj The object from which rays are to be shot
 */

  shoot: function(obj) {
  var ray1 = Basic_Constructs.ray(obj.point1, obj.point2);
  ray1.brightness = 1;
 /* ray1.gap = true;
  ray1.isNew = true;*/
  addRay(ray1);
  }
};  
///////////////////////////////////////////////////////////////////////  POINT-SOURCE  ////////////////////////////////////////////////////////////////////////////
/**
 * @member Beam
 * @brief Contains all the necessary functions and parameters for drawing and creating and handling Point Source    
 */

Constructs['Point_Source'] = {

/**
 * @fn create
 * @brief Creates the functional object of the Construct,which contains information about its type and necessary boundary points and properties if any.  
 */
  create: function(mouse) {
    console.log("create in Point_Source");
  return {type: 'Point_Source', x: mouse.x, y: mouse.y, p: 0.5};
  },

  c_mousedown: function(obj, mouse){
    console.log("c_mousedown in Point_Source");
    draw();
  },
  c_mousemove: function(obj, mouse){},// do nothing in this case

  c_mouseup: function(obj, mouse){
    isConstructing = false;
  },
/**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when its
 *          mouse is moved and when mousedown event occurs, just draws the support doesnt draws the rays, that is handled by shoot waiting rays function
 * @param[in] obj The object to be drawn
 */

  draw: function(obj) {
    ctx.fillStyle = 'rgb(255,255,0)'; // yellow point source this just draws the source rays will be drawn later
    ctx.fillRect(obj.x - 2, obj.y - 2, 5, 5);
  },

/**
 * @fn shoot
 * @brief shhot function for luminous objects treats the rays as a ray functional object of the class Basic_constructs and calculates from where the rays are to b eshot and adds
 those rays objects to an array of waitingRays. It doesnt draw the rays,it just adds the rays to the array 
 * @param[in] obj The object from which rays are to be shot
 */

  shoot: function(obj) {
    var step = Math.PI * 2 / parseInt(rayDensity_light* 500); // get the spacing between rays
    var ang0=0;
    for (var ang = ang0; ang < (Math.PI * 2 - 1e-5); ang = ang + step){
      var ray1 = Basic_Constructs.ray(Basic_Constructs.point(obj.x, obj.y), Basic_Constructs.point(obj.x + Math.sin(ang), obj.y + Math.cos(ang)));
      ray1.brightness = 1;
     // ray1.isNew = true;
      if (ang == ang0){
     //   ray1.gap = true;
      }
      addRay(ray1);
    }
  }
};

////////////////////////////////////////////////////////////////////////""" BEAM OF LIGHT"""  ////////////////////////////////////////////////////////////////////
/**
 * @member Beam
 * @brief Contains all the necessary functions and parameters for drawing , creating and handling Beam of light
 */
Constructs['Beam'] = {
/**
 * @fn create
 * @brief Creates the functional object of the Construct,which contains information about its type and necessary boundary points and properties if any.
 *    
 */
  create: function(mouse) {
    return {type: 'Beam', point1: mouse, point2: mouse, p: 0.5};
  },

  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,

/**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when its
 *          mouse is moved and when mousedown event occurs, just draws the support doesnt draws the rays that are handled by shoot waiting rays function
 * @param[in] obj The object to be drawn
 */

  draw: function(obj) {
    var a_l = Math.atan2(obj.point1.x - obj.point2.x, obj.point1.y - obj.point2.y) - Math.PI / 2;
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.beginPath();
    ctx.moveTo(obj.point1.x + Math.sin(a_l) * 2, obj.point1.y + Math.cos(a_l) * 2);
    ctx.lineTo(obj.point2.x + Math.sin(a_l) * 2, obj.point2.y + Math.cos(a_l) * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(128,128,128,255)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(obj.point1.x, obj.point1.y);
    ctx.lineTo(obj.point2.x, obj.point2.y);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
  },

/**
 * @fn shoot
 * @brief shhot function for luminous objects treats the rays as a ray functional object of the class Basic_constructs and calculates from where the rays are to b eshot and adds
 those rays objects to an array of waitingRays. It doesnt draw the rays,it just adds the rays to the array 
 * @param[in] obj The object from which rays are to be shot
 */

  shoot: function(obj) {
    var n = Basic_Constructs.length_of_segment(obj) * rayDensity_light;
    var stepX = (obj.point2.x - obj.point1.x) / n;
    var stepY = (obj.point2.y - obj.point1.y) / n;
    var raypoint2_x = obj.point1.x + obj.point2.y - obj.point1.y;
    var raypoint2_y = obj.point1.y - obj.point2.x + obj.point1.x;

    for (var i = 0.5; i <= n; i++){
      var ray1 = Basic_Constructs.ray(Basic_Constructs.point(obj.point1.x + i * stepX, obj.point1.y + i * stepY), Basic_Constructs.point(raypoint2_x + i * stepX, raypoint2_y + i * stepY));
      ray1.brightness = 1;
      ray1.isNew = true;
      if (i == 0){
        ray1.gap = true;
      }
      addRay(ray1);
    }
  }
};

////////////////////////////////////////////////////////////////// REFRACTOR ///////////////////////////////////////////////////////////////////////////////////

/**
 * @member refractor
 * @brief Contains all the necessary functions and parameters for drawing
 *      refracting objects and for governing refraction of rays through it
 */
Constructs['refractor'] = {

p_name: 'Refractive index', 
p_min: 1,
p_max: 3,
p_step: 0.01,

supportSurfaceMerging: true, 

create: function(mouse) {
  return {type: 'refractor', path: [{x: mouse.x, y: mouse.y, arc: false}], notDone: true, p: 1.5};
},

/**
 * @fn c_mousedown
 * @brief Handles all the possibilities regarding the construction of
 *          of the object when the mouse is clicked and also calls
 *          the draw function accordingly
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mousedown: function(obj, mouse){// console.log("mouse_down getting called");
  if (obj.path.length > 1){
    if (obj.path.length > 3 && mouseOnPoint(mouse, obj.path[0])){
      obj.path.length--;
      obj.notDone = false;      // When user completes the polygon
      draw();
      return;
    }
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; 
    obj.path[obj.path.length - 1].arc = true; // Making arc when user drags the mouse
  }
},

/**
 * @fn c_mousemove
 * @brief Handles all the possibilities regarding the construction of
 *          of the object when the mouse is moved and also calls
 *          the draw function accordingly
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mousemove: function(obj, mouse){ //console.log("mouse_move getting called");
  if (!obj.notDone) {return;}
  if (typeof obj.path[obj.path.length - 1].arc != 'undefined'){
    if (obj.path[obj.path.length - 1].arc && Math.sqrt(Math.pow(obj.path[obj.path.length - 1].x - mouse.x, 2) + Math.pow(obj.path[obj.path.length - 1].y - mouse.y, 2)) >= 5){
      obj.path[obj.path.length] = mouse;    // drawing the arc
      draw();
    }
  }
  else{
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; // Drawing a straight line following the mouse
    draw();
  }
},

/**
 * @fn c_mouseup
 * @brief Handles all the possibilities regarding the construction of
 *          of the object when the mouse is lifted after it was clicked
 * @param[in] obj The object that is being constructed currently
 * @param[in] mouse contains the co-ordinates of the mouse pointer
 */
c_mouseup: function(obj, mouse){// console.log("mouse_up getting called");
  if (!obj.notDone) {
    isConstructing = false;
    draw();     // Object completed when the mouse was pressed
    return;
  }
  if (obj.path.length > 3 && mouseOnPoint(mouse, obj.path[0])){
    obj.path.length--;
    obj.notDone = false;
    isConstructing = false; // User copletes the polygon wheb lifting teh mouse
    draw();
    return;
  }
  if (obj.path[obj.path.length - 2] && !obj.path[obj.path.length - 2].arc && mouseOnPoint_construct(mouse, obj.path[obj.path.length - 2])){
    delete obj.path[obj.path.length - 1].arc;
  }
  else{ // Adding the point to the list for drawing
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; 
    obj.path[obj.path.length - 1].arc = false;
    obj.path[obj.path.length] = {x: mouse.x, y: mouse.y}; 

  }
  draw();
},

/**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when its
 *          refractive index is modified
 * @param[in] obj The object to be drawn
 * @param[in] aboveLight for changing the transparency when refractive
 *              refractive index is changed
 */
draw: function(obj, aboveLight) {
  //console.log("draw getting called");
  //var ctx = canvas.getContext('2d');
  var point1;
  var point2;
  var p3;
  var center;
  var r;
  var a1;
  var a2;
  var a3;
  var acw;

  if (obj.notDone){
    ctx.beginPath();
    ctx.moveTo(obj.path[0].x, obj.path[0].y);

    for (var i = 0; i < obj.path.length - 1; i++){
      if (obj.path[(i + 1)].arc && !obj.path[i].arc && i < obj.path.length - 2){
          // Starting point of an arc
        point1 = Basic_Constructs.point(obj.path[i].x, obj.path[i].y);
        point2 = Basic_Constructs.point(obj.path[(i + 2)].x, obj.path[(i + 2)].y);
        p3 = Basic_Constructs.point(obj.path[(i + 1)].x, obj.path[(i + 1)].y);
        // center is calculated by intersection of the bisectors of chords
        center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point1, p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point2, p3)));
        if (!isFinite(center.x) || !isFinite(center.y)){
          //Arc three points collinear, as line processing
          //arcInvalid=true;
          ctx.lineTo(obj.path[(i + 2)].x, obj.path[(i + 2)].y); 
        }
        else{
          r = Basic_Constructs.length(center, p3);
          a1 = Math.atan2(point1.y - center.y, point1.x - center.x);
          a2 = Math.atan2(point2.y - center.y, point2.x - center.x);
          a3 = Math.atan2(p3.y - center.y, p3.x - center.x);
          acw = (a2 < a3 && a3 < a1) || (a1 < a2 && a2 < a3) || (a3 < a1 && a1 < a2); //Point1->p3->point2 in the direction of rotation, counterclockwise true

          ctx.arc(center.x, center.y, r, a1, a2, acw);
        }
      }
      else if (!obj.path[(i + 1)].arc && !obj.path[i].arc){
        ctx.lineTo(obj.path[(i + 1)].x, obj.path[(i + 1)].y);
      }
    }
    //if(!arcInvalid)
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgb(128,128,128)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  else if (!aboveLight){
    //The object has been drawn
    ctx.beginPath();
    ctx.moveTo(obj.path[0].x, obj.path[0].y);

    for (var i = 0; i < obj.path.length; i++){
      if (obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){   // drawing the arc in case of completed polygon
        point1 = Basic_Constructs.point(obj.path[i % obj.path.length].x, obj.path[i % obj.path.length].y);
        point2 = Basic_Constructs.point(obj.path[(i + 2) % obj.path.length].x, obj.path[(i + 2) % obj.path.length].y);
        p3 = Basic_Constructs.point(obj.path[(i + 1) % obj.path.length].x, obj.path[(i + 1) % obj.path.length].y);
        center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point1, p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point2, p3)));
        //console.log([center.x,center.y]);
        if (!isFinite(center.x) || !isFinite(center.y)){
          //Arc three points collinear, as line is processing
          ctx.lineTo(obj.path[(i + 2) % obj.path.length].x, obj.path[(i + 2) % obj.path.length].y);
        }
        else{
          r = Basic_Constructs.length(center, p3);
          a1 = Math.atan2(point1.y - center.y, point1.x - center.x);
          a2 = Math.atan2(point2.y - center.y, point2.x - center.x);
          a3 = Math.atan2(p3.y - center.y, p3.x - center.x);
          acw = (a2 < a3 && a3 < a1) || (a1 < a2 && a2 < a3) || (a3 < a1 && a1 < a2); //The clockwise counterclockwise thing

          ctx.arc(center.x, center.y, r, a1, a2, acw);
        }
      }
      else if (!obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
        ctx.lineTo(obj.path[(i + 1) % obj.path.length].x, obj.path[(i + 1) % obj.path.length].y);
      }
    }
    this.fillGlass(obj.p);
  }
  ctx.lineWidth = 1;


  for (var i = 0; i < obj.path.length; i++){    // coloring the vertices
    if (typeof obj.path[i].arc != 'undefined'){
      if (obj.path[i].arc){
        ctx.fillStyle = 'rgb(255,0,255)';
        //ctx.fillStyle="indigo";
        ctx.fillRect(obj.path[i].x - 2, obj.path[i].y - 2, 3, 3);
      }
      else{
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.fillRect(obj.path[i].x - 2, obj.path[i].y - 2, 3, 3);
      }
    }
  }
},

/**
 * @fn fillGlass
 * @brief fills the object with white color and sets the transparency
 *          according to the refractive index
 * @param[in] n the refractive index of the object
 */
fillGlass: function(n){
  if (n >= 1){
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'white';
    ctx.globalAlpha = Math.log(n) / Math.log(1.5) * 0.2;
    ctx.fill('evenodd');
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
  else{
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgb(70,70,70)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

},

/**
 * @fn rayIntersection
 * @brief Computes the way in which the ray is refracted if it
 *          hits the sides of the object, also handles when edge is curved
 * @param[in] obj the object with which refraction is being considered
 * @param[in] ray the ray which is being drawn
 */
rayIntersection: function(obj, ray) {

  if (obj.notDone || obj.p <= 0)return;

  var s_lensq = Infinity;
  var s_lensq_temp;
  var s_point = null;
  var s_point_temp = null;
  //var a_rp;
  var rp_exist = [];
  var rp_lensq = [];
  var rp_temp;

  var point1;
  var point2;
  var p3;
  var center;
  var r;
  //var pathInvalid=false;

  for (var i = 0; i < obj.path.length; i++){
    s_point_temp = null;
    if (obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
        // when ith vertex is start of an arc
      point1 = Basic_Constructs.point(obj.path[i % obj.path.length].x, obj.path[i % obj.path.length].y);
      point2 = Basic_Constructs.point(obj.path[(i + 2) % obj.path.length].x, obj.path[(i + 2) % obj.path.length].y);
      p3 = Basic_Constructs.point(obj.path[(i + 1) % obj.path.length].x, obj.path[(i + 1) % obj.path.length].y);
      center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point1, p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point2, p3)));
      if (!isFinite(center.x) || !isFinite(center.y)){
        //Arc three points collinear, line
        var rp_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length]));   //Optical and object  intersection

        if (Basic_Constructs.intersection_is_on_segment(rp_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rp_temp, ray) && Basic_Constructs.length_squared(ray.point1, rp_temp) > minShotLength_squared){
          s_lensq_temp = Basic_Constructs.length_squared(ray.point1, rp_temp); 
          s_point_temp = rp_temp;
        }
      }
      else{
        
        r = Basic_Constructs.length(center, p3);
        rp_temp = Basic_Constructs.intersection_line_circle(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.circle(center, point2));   //Optical (extension cord) and intersection of the mirror
        for (var ii = 1; ii <= 2; ii++){
          rp_exist[ii] = !Basic_Constructs.intersection_is_on_segment(Basic_Constructs.intersection_line_line(Basic_Constructs.line(point1, point2), Basic_Constructs.line(p3, rp_temp[ii])), Basic_Constructs.segment(p3, rp_temp[ii])) && Basic_Constructs.intersection_is_on_ray(rp_temp[ii], ray) && Basic_Constructs.length_squared(rp_temp[ii], ray.point1) > minShotLength_squared;
          rp_lensq[ii] = Basic_Constructs.length_squared(ray.point1, rp_temp[ii]); //Light distance to the intersection I
        }
        if (rp_exist[1] && ((!rp_exist[2]) || rp_lensq[1] < rp_lensq[2]) && rp_lensq[1] > minShotLength_squared){
          s_point_temp = rp_temp[1];
          s_lensq_temp = rp_lensq[1];
        }
        if (rp_exist[2] && ((!rp_exist[1]) || rp_lensq[2] < rp_lensq[1]) && rp_lensq[2] > minShotLength_squared){
          s_point_temp = rp_temp[2];
          s_lensq_temp = rp_lensq[2];
        }
      }
    }
    else if (!obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
    // When intersecting with straight edge
      var rp_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length]));   

      if (Basic_Constructs.intersection_is_on_segment(rp_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rp_temp, ray) && Basic_Constructs.length_squared(ray.point1, rp_temp) > minShotLength_squared){
        s_lensq_temp = Basic_Constructs.length_squared(ray.point1, rp_temp); //Intersection [light] the distance
        s_point_temp = rp_temp;
      }
    }
    if (s_point_temp){
      if (s_lensq_temp < s_lensq){
        s_lensq = s_lensq_temp;
        s_point = s_point_temp;
      }
    }
  }
  if (s_point){
    return s_point;
  }

},

/**
 * @fn shot
 * @detail finds the type of interaction of the ray with the object,
 *      calculates the effective refractive index and then calls the
 *      rrefract function to draw the ray
 * @param[in] obj The object of interest
 * @param[in] ray the ray whose refraction with the object is considered
 * @param[in] rayIndex index of the ray
 */
shot: function(obj, ray, rayIndex, rp) {
  if (obj.notDone) {return;}
  var shotDataset = this.getShotDataset(obj, ray);
  var shotType = shotDataset.shotType;
  if (shotType == 1){
    //From the internal into the external
    var n1 = obj.p; //Source of refractive index of the medium (the destination media is assumed to be 1)
  }
  else if (shotType == -1){
    //Shooting from the outside
    var n1 = 1 / obj.p;
  }
  else if (shotType == 0){
    //Equivalent to not shoot (for example two interface overlap)
    var n1 = 1;
  }
  this.refract(ray, rayIndex, shotDataset.s_point, shotDataset.normal, n1);
},

/**
 * @fn getShotType
 * @brief returns theh type of interaction between the object and the ray
 * @param[in] obj the object of interest
 * @param[in] ray the ray being considerd for refraction
 * @return the type of refraction
 */
getShotType: function(obj, ray) {
  return this.getShotDataset(obj, ray).shotType;
},

/**
 * @fn getShotDataset
 * @brief computes how the ray is refracted and the point of incidence
 *          of the ray with the edges of the object
 * @param[in] obj the object of interest
 * @param[in] ray the ray being considerd for refraction
 * @return the type of refraction and details of the refracted ray
 */
getShotDataset: function(obj, ray) {
  var s_lensq = Infinity;
  var s_lensq_temp;
  var s_point = null;
  var s_point_temp = null;
  var s_point_index;

  var surfaceMultiplicity = 1; //Interface number of coincidence.

  var rp_on_ray = [];
  var rp_exist = [];
  var rp_lensq = [];
  var rp_temp;

  var rpoint2_exist = [];
  var rpoint2_lensq = [];
  var rpoint2_temp;

  var normal_x;
  var normal_x_temp;

  var normal_y;
  var normal_y_temp;

  var rdots;
  var ssq;
  var nearEdge = false;
  var nearEdge_temp = false;
  var point1;
  var point2;
  var p3;
  var center;
  var ray2 = Basic_Constructs.ray(ray.point1, Basic_Constructs.point(ray.point2.x + Math.random() * 1e-5, ray.point2.y + Math.random() * 1e-5)); //Used as a judge inside and outside light (test light)
  var ray_intersect_count = 0; //Test Ray-object intersection number (odd light coming from inside)

  for (var i = 0; i < obj.path.length; i++){
    s_point_temp = null;
    nearEdge_temp = false;
    if (obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
        // Start of an arc
      point1 = Basic_Constructs.point(obj.path[i % obj.path.length].x, obj.path[i % obj.path.length].y);
      point2 = Basic_Constructs.point(obj.path[(i + 2) % obj.path.length].x, obj.path[(i + 2) % obj.path.length].y);
      p3 = Basic_Constructs.point(obj.path[(i + 1) % obj.path.length].x, obj.path[(i + 1) % obj.path.length].y);
      center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point1, p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(point2, p3)));
      if (!isFinite(center.x) || !isFinite(center.y)){
        //Arc three points collinear, line
        rp_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length]));   

        rpoint2_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray2.point1, ray2.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length]));   
        if (Basic_Constructs.intersection_is_on_segment(rp_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rp_temp, ray) && Basic_Constructs.length_squared(ray.point1, rp_temp) > minShotLength_squared){
          //↑ Rp_temp on obj and rp_temp in ray (the ray really into obj, not Ray's extension into or down onto the obj extension line)
          //ray_intersect_count++;
          s_lensq_temp = Basic_Constructs.length_squared(ray.point1, rp_temp); //Intersection [light] the distance
          s_point_temp = rp_temp;

          rdots = (ray.point2.x - ray.point1.x) * (obj.path[(i + 2) % obj.path.length].x - obj.path[i % obj.path.length].x) + (ray.point2.y - ray.point1.y) * (obj.path[(i + 2) % obj.path.length].y - obj.path[i % obj.path.length].y); //Ray and this segment within the product
          ssq = (obj.path[(i + 2) % obj.path.length].x - obj.path[i % obj.path.length].x) * (obj.path[(i + 2) % obj.path.length].x - obj.path[i % obj.path.length].x) + (obj.path[(i + 2) % obj.path.length].y - obj.path[i % obj.path.length].y) * (obj.path[(i + 2) % obj.path.length].y - obj.path[i % obj.path.length].y); //The segment length square

          normal_x_temp = rdots * (obj.path[(i + 2) % obj.path.length].x - obj.path[i % obj.path.length].x) - ssq * (ray.point2.x - ray.point1.x);
          normal_y_temp = rdots * (obj.path[(i + 2) % obj.path.length].y - obj.path[i % obj.path.length].y) - ssq * (ray.point2.y - ray.point1.y);
        }

        if (Basic_Constructs.intersection_is_on_segment(rpoint2_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 2) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rpoint2_temp, ray2) && Basic_Constructs.length_squared(ray2.point1, rpoint2_temp) > minShotLength_squared){
          ray_intersect_count++;
        }

        //Too close to the border of judgment
        if (s_point_temp && (Basic_Constructs.length_squared(s_point_temp, obj.path[i % obj.path.length]) < minShotLength_squared || Basic_Constructs.length_squared(s_point_temp, obj.path[(i + 2) % obj.path.length]) < minShotLength_squared)){
          nearEdge_temp = true;
        }
        //ctx.lineTo(obj.path[(i+2)%obj.path.length].x,obj.path[(i+2)%obj.path.length].y); 
      }
      else{
        rp_temp = Basic_Constructs.intersection_line_circle(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.circle(center, point2));   //intersection
        rpoint2_temp = Basic_Constructs.intersection_line_circle(Basic_Constructs.line(ray2.point1, ray2.point2), Basic_Constructs.circle(center, point2));
        for (var ii = 1; ii <= 2; ii++){
          rp_on_ray[ii] = Basic_Constructs.intersection_is_on_ray(rp_temp[ii], ray);
          rp_exist[ii] = rp_on_ray[ii] && !Basic_Constructs.intersection_is_on_segment(Basic_Constructs.intersection_line_line(Basic_Constructs.line(point1, point2), Basic_Constructs.line(p3, rp_temp[ii])), Basic_Constructs.segment(p3, rp_temp[ii])) && Basic_Constructs.length_squared(rp_temp[ii], ray.point1) > minShotLength_squared;
          rp_lensq[ii] = Basic_Constructs.length_squared(ray.point1, rp_temp[ii]); //Light distance to the intersection I
          rpoint2_exist[ii] = !Basic_Constructs.intersection_is_on_segment(Basic_Constructs.intersection_line_line(Basic_Constructs.line(point1, point2), Basic_Constructs.line(p3, rpoint2_temp[ii])), Basic_Constructs.segment(p3, rpoint2_temp[ii])) && Basic_Constructs.intersection_is_on_ray(rpoint2_temp[ii], ray2) && Basic_Constructs.length_squared(rpoint2_temp[ii], ray2.point1) > minShotLength_squared;
          rpoint2_lensq[ii] = Basic_Constructs.length_squared(ray2.point1, rpoint2_temp[ii]);
        }
        if (rp_exist[1] && ((!rp_exist[2]) || rp_lensq[1] < rp_lensq[2]) && rp_lensq[1] > minShotLength_squared){
          s_point_temp = rp_temp[1];
          s_lensq_temp = rp_lensq[1];
          if (rp_on_ray[2] && rp_lensq[1] < rp_lensq[2]){
            //The light from the outside in (for the arc itself)
            normal_x_temp = s_point_temp.x - center.x;
            normal_y_temp = s_point_temp.y - center.y;
          }
          else{
            normal_x_temp = center.x - s_point_temp.x;
            normal_y_temp = center.y - s_point_temp.y;
          }
        }
        if (rp_exist[2] && ((!rp_exist[1]) || rp_lensq[2] < rp_lensq[1]) && rp_lensq[2] > minShotLength_squared){
          s_point_temp = rp_temp[2];
          s_lensq_temp = rp_lensq[2];
          if (rp_on_ray[1] && rp_lensq[2] < rp_lensq[1]){
            //The light from the outside in (for the arc itself)
            normal_x_temp = s_point_temp.x - center.x;
            normal_y_temp = s_point_temp.y - center.y;
          }
          else{
            normal_x_temp = center.x - s_point_temp.x;
            normal_y_temp = center.y - s_point_temp.y;
          }
        }
        if (rpoint2_exist[1] && rpoint2_lensq[1] > minShotLength_squared){
          ray_intersect_count++;
          //canvasPainter.draw(ray2,canvas,"white");
        }
        if (rpoint2_exist[2] && rpoint2_lensq[2] > minShotLength_squared){
          ray_intersect_count++;
        }
        //Too close to the border of judgment
        if (s_point_temp && (Basic_Constructs.length_squared(s_point_temp, point1) < minShotLength_squared || Basic_Constructs.length_squared(s_point_temp, point2) < minShotLength_squared)){
          nearEdge_temp = true;
        }

      }
    }
    else if (!obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
      rp_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length]));   //Optical and object  intersection

      rpoint2_temp = Basic_Constructs.intersection_line_line(Basic_Constructs.line(ray2.point1, ray2.point2), Basic_Constructs.line(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length]));  
      if (Basic_Constructs.intersection_is_on_segment(rp_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rp_temp, ray) && Basic_Constructs.length_squared(ray.point1, rp_temp) > minShotLength_squared){
        // Rp_temp on obj and rp_temp in ray (the ray really into obj, not Ray's extension into or down onto the obj extension line)
        //ray_intersect_count++;
        s_lensq_temp = Basic_Constructs.length_squared(ray.point1, rp_temp); //Intersection [light] the distance
        s_point_temp = rp_temp;

        rdots = (ray.point2.x - ray.point1.x) * (obj.path[(i + 1) % obj.path.length].x - obj.path[i % obj.path.length].x) + (ray.point2.y - ray.point1.y) * (obj.path[(i + 1) % obj.path.length].y - obj.path[i % obj.path.length].y); //Ray and this segment within the product
        ssq = (obj.path[(i + 1) % obj.path.length].x - obj.path[i % obj.path.length].x) * (obj.path[(i + 1) % obj.path.length].x - obj.path[i % obj.path.length].x) + (obj.path[(i + 1) % obj.path.length].y - obj.path[i % obj.path.length].y) * (obj.path[(i + 1) % obj.path.length].y - obj.path[i % obj.path.length].y); //The segment length square

        normal_x_temp = rdots * (obj.path[(i + 1) % obj.path.length].x - obj.path[i % obj.path.length].x) - ssq * (ray.point2.x - ray.point1.x);
        normal_y_temp = rdots * (obj.path[(i + 1) % obj.path.length].y - obj.path[i % obj.path.length].y) - ssq * (ray.point2.y - ray.point1.y);
      }

      if (Basic_Constructs.intersection_is_on_segment(rpoint2_temp, Basic_Constructs.segment(obj.path[i % obj.path.length], obj.path[(i + 1) % obj.path.length])) && Basic_Constructs.intersection_is_on_ray(rpoint2_temp, ray2) && Basic_Constructs.length_squared(ray2.point1, rpoint2_temp) > minShotLength_squared){
        ray_intersect_count++;
      }

      //Too close to the border of judgment
      if (s_point_temp && (Basic_Constructs.length_squared(s_point_temp, obj.path[i % obj.path.length]) < minShotLength_squared || Basic_Constructs.length_squared(s_point_temp, obj.path[(i + 1) % obj.path.length]) < minShotLength_squared)){
        nearEdge_temp = true;
      }
    }
    if (s_point_temp){
      if (s_point && Basic_Constructs.length_squared(s_point_temp, s_point) < minShotLength_squared){
        //Self-interface integration
        surfaceMultiplicity++;
      }
      else if (s_lensq_temp < s_lensq){
        s_lensq = s_lensq_temp;
        s_point = s_point_temp;
        s_point_index = i;
        normal_x = normal_x_temp;
        normal_y = normal_y_temp;
        nearEdge = nearEdge_temp;
        surfaceMultiplicity = 1;
      }
    }
  }

  if (nearEdge){
    var shotType = 2; //Shot to the boundary points
  }
  else if (surfaceMultiplicity % 2 == 0){
    var shotType = 0; //Equivalent to not shoot
  }
  else if (ray_intersect_count % 2 == 1){
    var shotType = 1; //From the internal into the external
  }
  else{
    var shotType = -1; //Shooting from the outside
  }

  return {s_point: s_point, normal: {x: normal_x, y: normal_y},shotType: shotType};
},

/**
 * @fn refract
 * @detail Handles how the ray is refracted or in ternally reflected
 *          considering the refractive indices and also controls the
 *          brightness of the ray depending on the fraction that is being
 *          reflected or refracted
 * @param[in] ray the incident ray
 * @param[in] rayIndex the index of the ray
 * @param[in] s_point The starting point of the refracted ray
 * @param[in] normal Vector along the normal
 * @param[in] n1 The realtive refractive index
 */
refract: function(ray, rayIndex, s_point, normal, n1){
  var normal_len = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
  var normal_x = normal.x / normal_len;
  var normal_y = normal.y / normal_len;
  var ray_len = Math.sqrt((ray.point2.x - ray.point1.x) * (ray.point2.x - ray.point1.x) + (ray.point2.y - ray.point1.y) * (ray.point2.y - ray.point1.y));
  var ray_x = (ray.point2.x - ray.point1.x) / ray_len;
  var ray_y = (ray.point2.y - ray.point1.y) / ray_len;
  //http://en.wikipedia.org/wiki/Snell%27s_law#Vector_form

  var cos1 = -normal_x * ray_x - normal_y * ray_y;
  //console.log(cos1)
  var sq1 = 1 - n1 * n1 * (1 - cos1 * cos1);

  if (sq1 < 0){
    //Total internal reflection
    //var a_out=a_n*2-a_r;
    ray.point1 = s_point;
    ray.point2 = Basic_Constructs.point(s_point.x + ray_x + 2 * cos1 * normal_x, s_point.y + ray_y + 2 * cos1 * normal_y);
  }
  else{
    //Refraction
    var cos2 = Math.sqrt(sq1);

    var R_s = Math.pow((n1 * cos1 - cos2) / (n1 * cos1 + cos2), 2);
    var R_p = Math.pow((n1 * cos2 - cos1) / (n1 * cos2 + cos1), 2);
    var R = 0.5 * (R_s + R_p);
    //http://en.wikipedia.org/wiki/Fresnel_equations#Definitions_and_power_equations

    //Reflected light
    var ray2 = Basic_Constructs.ray(s_point, Basic_Constructs.point(s_point.x + ray_x + 2 * cos1 * normal_x, s_point.y + ray_y + 2 * cos1 * normal_y));
    ray2.brightness = ray.brightness * R;
    ray2.gap = ray.gap;
    if (ray2.brightness > 0.01){
      //Reflected light add to the waiting area
      addRay(ray2);
    }
    else if (!ray.gap){
      var amp = Math.floor(0.01 / ray2.brightness) + 1;
      if (rayIndex % amp == 0){
        ray2.brightness = ray2.brightness * amp;
        addRay(ray2);
      }
    }
    ray.point1 = s_point;
    ray.point2 = Basic_Constructs.point(s_point.x + n1 * ray_x + (n1 * cos1 - cos2) * normal_x, s_point.y + n1 * ray_y + (n1 * cos1 - cos2) * normal_y);
    ray.brightness = ray.brightness * (1 - R);
  }
}
};
////////////////////////////////////////////////////////////////////////// CONVEX/ CONCAVE LENS /////////////////////////////////////////////////////////////////// 

  Constructs['lens'] = {

  p_name: 'Focal length', 
  p_min: -1000,
  p_max: 1000,
  p_step: 1,

  create: function(mouse) {
    return {type: 'lens', point1: mouse, point2: mouse, p: 100};
  },
  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,
  rayIntersection: Constructs['lineobj'].rayIntersection,

  draw: function(obj) {
  var len = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
  var par_x = (obj.point2.x - obj.point1.x) / len;
  var par_y = (obj.point2.y - obj.point1.y) / len;
  var per_x = par_y;
  var per_y = -par_x;

  var arrow_size_per = 5;
  var arrow_size_par = 5;
  var center_size = 2;

  ctx.strokeStyle = 'rgb(0,0,256)';
  ctx.globalAlpha = 1 / ((Math.abs(obj.p) / 100) + 1);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(obj.point1.x, obj.point1.y);
  ctx.lineTo(obj.point2.x, obj.point2.y);
  ctx.stroke();
  ctx.lineWidth = 1;

  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgb(0,0,256)';

  var center = Basic_Constructs.midpoint(obj);
  ctx.strokeStyle = 'rgb(255,255,255)';
  ctx.beginPath();
  ctx.moveTo(center.x - per_x * center_size, center.y - per_y * center_size);
  ctx.lineTo(center.x + per_x * center_size, center.y + per_y * center_size);
  ctx.stroke();

  if (obj.p > 0){
    ctx.beginPath();
    ctx.moveTo(obj.point1.x - par_x * arrow_size_par, obj.point1.y - par_y * arrow_size_par);
    ctx.lineTo(obj.point1.x + par_x * arrow_size_par + per_x * arrow_size_per, obj.point1.y + par_y * arrow_size_par + per_y * arrow_size_per);
    ctx.lineTo(obj.point1.x + par_x * arrow_size_par - per_x * arrow_size_per, obj.point1.y + par_y * arrow_size_par - per_y * arrow_size_per);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(obj.point2.x + par_x * arrow_size_par, obj.point2.y + par_y * arrow_size_par);
    ctx.lineTo(obj.point2.x - par_x * arrow_size_par + per_x * arrow_size_per, obj.point2.y - par_y * arrow_size_par + per_y * arrow_size_per);
    ctx.lineTo(obj.point2.x - par_x * arrow_size_par - per_x * arrow_size_per, obj.point2.y - par_y * arrow_size_par - per_y * arrow_size_per);
    ctx.fill();
  }
  if (obj.p < 0){
    ctx.beginPath();
    ctx.moveTo(obj.point1.x + par_x * arrow_size_par, obj.point1.y + par_y * arrow_size_par);
    ctx.lineTo(obj.point1.x - par_x * arrow_size_par + per_x * arrow_size_per, obj.point1.y - par_y * arrow_size_par + per_y * arrow_size_per);
    ctx.lineTo(obj.point1.x - par_x * arrow_size_par - per_x * arrow_size_per, obj.point1.y - par_y * arrow_size_par - per_y * arrow_size_per);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(obj.point2.x - par_x * arrow_size_par, obj.point2.y - par_y * arrow_size_par);
    ctx.lineTo(obj.point2.x + par_x * arrow_size_par + per_x * arrow_size_per, obj.point2.y + par_y * arrow_size_par + per_y * arrow_size_per);
    ctx.lineTo(obj.point2.x + par_x * arrow_size_par - per_x * arrow_size_per, obj.point2.y + par_y * arrow_size_par - per_y * arrow_size_per);
    ctx.fill();
  }

  },

  shot: function(lens, ray, rayIndex, shootPoint) {
    var lens_length = Basic_Constructs.length_of_segment(lens);
    var main_line_unitvector_x = (-lens.point1.y + lens.point2.y) / lens_length;
    var main_line_unitvector_y = (lens.point1.x - lens.point2.x) / lens_length;
    //(-l1.point1.y+l1.point2.y+l1.point1.x+l1.point2.x)*0.5,(l1.point1.x-l1.point2.x+l1.point1.y+l1.point2.y)*0.5
    var mid_point = Basic_Constructs.midpoint(lens); //Lens Center

    var twoF_point_1 = Basic_Constructs.point(mid_point.x + main_line_unitvector_x * 2 * lens.p, mid_point.y + main_line_unitvector_y * 2 * lens.p);  //Twice times the focal length of point 1
    var twoF_point_2 = Basic_Constructs.point(mid_point.x - main_line_unitvector_x * 2 * lens.p, mid_point.y - main_line_unitvector_y * 2 * lens.p);  //Twice times the focal length of point 2

    var twoF_line_near, twoF_line_far;
    if (Basic_Constructs.length_squared(ray.point1, twoF_point_1) < Basic_Constructs.length_squared(ray.point1, twoF_point_2)){
      twoF_line_near = Basic_Constructs.parallel(lens, twoF_point_1);
      twoF_line_far = Basic_Constructs.parallel(lens, twoF_point_2);
    }
    else{
      twoF_line_near = Basic_Constructs.parallel(lens, twoF_point_2);
      twoF_line_far = Basic_Constructs.parallel(lens, twoF_point_1);
    }

    if (lens.p > 0){
      ray.point2 = Basic_Constructs.intersection_line_line(twoF_line_far, Basic_Constructs.line(mid_point, Basic_Constructs.intersection_line_line(twoF_line_near, ray)));
      ray.point1 = shootPoint;
    }
    else{
      ray.point2 = Basic_Constructs.intersection_line_line(twoF_line_far, Basic_Constructs.line(shootPoint, Basic_Constructs.intersection_line_line(twoF_line_near, Basic_Constructs.line(mid_point, Basic_Constructs.intersection_line_line(twoF_line_far, ray)))));
      ray.point1 = shootPoint;
    }
  }
  };
////////////////////////////////////////////////////////////////////// MIRROR ////////////////////////////////////////////////////////////////////////////////////
  /**
 * @member mirror
 * @brief Contains all the necessary functions and parameters for drawing
 *      mirror objects and for governing reflaction of rays through it
 */

  Constructs['mirror'] = {

  create: function(mouse) {
    return {type: 'mirror', point1: mouse, point2: mouse};
  },
  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,
  rayIntersection: Constructs['lineobj'].rayIntersection,

  draw: function(obj) {
    ctx.strokeStyle = 'rgb(168,168,168)';
    ctx.beginPath();
    ctx.moveTo(obj.point1.x, obj.point1.y);
    ctx.lineTo(obj.point2.x, obj.point2.y);
    ctx.stroke();
  },

  shot: function(mirror, ray, rayIndex, pointOnMirror) {
    var rx = ray.point1.x - pointOnMirror.x;
    var ry = ray.point1.y - pointOnMirror.y;
    var mx = mirror.point2.x - mirror.point1.x;
    var my = mirror.point2.y - mirror.point1.y;
    ray.point1 = pointOnMirror;
    // JEE trigno! hopefully this is correct will see.
    ray.point2 = Basic_Constructs.point(pointOnMirror.x + rx * (my * my - mx * mx) - 2 * ry * mx * my, pointOnMirror.y + ry * (mx * mx - my * my) - 2 * rx * mx * my);
  }
  };

////////////////////////////////////////////////////////////////////  CONVEX CONCAVE MIRRORS //////////////////////////////////////////////////////////////////////
/**
 * @member idealmirror
 * @brief Contains all the necessary functions and parameters for drawing
 *      convex and concave mirror objects and for governing reflection of rays through it
 */

Constructs['idealmirror'] = {

  p_name: 'Focal length', // focal length property
  p_min: -1000,
  p_max: 1000,
  p_step: 1,

  create: function(mouse) {
    return {type: 'idealmirror', point1: mouse, point2:mouse, p: 100};
  },

  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,
  rayIntersection: Constructs['lineobj'].rayIntersection,
  

  draw: function(obj) {
    var len = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
    var par_x = (obj.point2.x - obj.point1.x) / len;
    var par_y = (obj.point2.y - obj.point1.y) / len;
    var per_x = par_y;
    var per_y = -par_x;

    var arrow_size_per = 5;
    var arrow_size_par = 5;
    var center_size = 1;
    ctx.strokeStyle = 'rgb(256,0,0)';
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(obj.point1.x, obj.point1.y);
    ctx.lineTo(obj.point2.x, obj.point2.y);
    ctx.stroke();
    ctx.lineWidth = 1;
    
    var center = Basic_Constructs.midpoint(obj);
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.beginPath();
    ctx.moveTo(center.x - per_x * center_size, center.y - per_y * center_size);
    ctx.lineTo(center.x + per_x * center_size, center.y + per_y * center_size);
    ctx.stroke();
    ctx.fillStyle = 'rgb(256,0,0)';

    if (obj.p < 0){ // different cases of concave and convex
      ctx.beginPath();
      ctx.moveTo(obj.point1.x - par_x * arrow_size_par, obj.point1.y - par_y * arrow_size_par);
      ctx.lineTo(obj.point1.x + par_x * arrow_size_par + per_x * arrow_size_per, obj.point1.y + par_y * arrow_size_par + per_y * arrow_size_per);
      ctx.lineTo(obj.point1.x + par_x * arrow_size_par - per_x * arrow_size_per, obj.point1.y + par_y * arrow_size_par - per_y * arrow_size_per);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(obj.point2.x + par_x * arrow_size_par, obj.point2.y + par_y * arrow_size_par);
      ctx.lineTo(obj.point2.x - par_x * arrow_size_par + per_x * arrow_size_per, obj.point2.y - par_y * arrow_size_par + per_y * arrow_size_per);
      ctx.lineTo(obj.point2.x - par_x * arrow_size_par - per_x * arrow_size_per, obj.point2.y - par_y * arrow_size_par - per_y * arrow_size_per);
      ctx.fill();
    }
    if (obj.p > 0){
      ctx.beginPath();
      ctx.moveTo(obj.point1.x + par_x * arrow_size_par, obj.point1.y + par_y * arrow_size_par);
      ctx.lineTo(obj.point1.x - par_x * arrow_size_par + per_x * arrow_size_per, obj.point1.y - par_y * arrow_size_par + per_y * arrow_size_per);
      ctx.lineTo(obj.point1.x - par_x * arrow_size_par - per_x * arrow_size_per, obj.point1.y - par_y * arrow_size_par - per_y * arrow_size_per);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(obj.point2.x - par_x * arrow_size_par, obj.point2.y - par_y * arrow_size_par);
      ctx.lineTo(obj.point2.x + par_x * arrow_size_par + per_x * arrow_size_per, obj.point2.y + par_y * arrow_size_par + per_y * arrow_size_per);
      ctx.lineTo(obj.point2.x + par_x * arrow_size_par - per_x * arrow_size_per, obj.point2.y + par_y * arrow_size_par - per_y * arrow_size_per);
      ctx.fill();
    }

  },

  shot: function(obj, ray, rayIndex, shootPoint) {
    Constructs['lens'].shot(obj, ray, rayIndex, Basic_Constructs.point(shootPoint.x, shootPoint.y));
    ray.point1.x = 2 * ray.point1.x - ray.point2.x;
    ray.point1.y = 2 * ray.point1.y - ray.point2.y;

    Constructs['mirror'].shot(obj, ray, rayIndex, shootPoint);
  }
};

///////////////////////////////////////////////////////////////////"""  ARC - MIRROR"""  ////////////////////////////////////////////////////////////////

/**
 * @member arcmirror
 * @brief Contains all the necessary functions and parameters for drawing
 *     circular mirror objects and for governing reflection of rays through it
 */

Constructs['arcmirror'] = {

  create: function(mouse) {
    return {type: 'arcmirror', point1: mouse};
  },

  c_mousedown: function(obj, mouse) {
    if (!obj.point2 && !obj.p3){
      draw();
      obj.point2 = mouse;
      return;
    }
    if (obj.point2 && !obj.p3 && !mouseOnPoint_construct(mouse, obj.point1)){
      obj.point2 = mouse;
      draw();
      obj.p3 = mouse;
      return;
    }
  },

  c_mousemove: function(obj, mouse){
    if (!obj.p3 && !mouseOnPoint_construct(mouse, obj.point1)){
      obj.point2 = mouse;
      obj.point1 = constructionPoint;
      draw();
      return;
    }
    if (obj.p3 && !mouseOnPoint_construct(mouse, obj.point2)){
      obj.p3 = mouse;
      draw();
      return;
    }
  },

  c_mouseup: function(obj, mouse){
    if (obj.point2 && !obj.p3 && !mouseOnPoint_construct(mouse, obj.point1)){
      obj.p3 = mouse;
      return;
    }
    if (obj.p3 && !mouseOnPoint_construct(mouse, obj.point2)){
      obj.p3 = mouse;
      draw();
      isConstructing = false;
      return;
    }
  },

  draw: function(obj) {
    ctx.fillStyle = 'rgb(255,0,255)';
    if (obj.p3 && obj.point2){
      var center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point1, obj.p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point2, obj.p3)));
      if (!isFinite(center.x) || !isFinite(center.y)){
        //Arc collinear, as a processing line
        ctx.strokeStyle = 'rgb(168,168,168)';
        ctx.beginPath();
        ctx.moveTo(obj.point1.x, obj.point1.y);
        ctx.lineTo(obj.point2.x, obj.point2.y);
        ctx.stroke();
        ctx.fillRect(obj.p3.x - 2, obj.p3.y - 2, 3, 3);
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 3, 3);
        ctx.fillRect(obj.point2.x - 2, obj.point2.y - 2, 3, 3);
      }
      else{
        var r = Basic_Constructs.length(center, obj.p3);
        var a1 = Math.atan2(obj.point1.y - center.y, obj.point1.x - center.x);
        var a2 = Math.atan2(obj.point2.y - center.y, obj.point2.x - center.x);
        var a3 = Math.atan2(obj.p3.y - center.y, obj.p3.x - center.x);
        ctx.strokeStyle = 'rgb(168,168,168)';
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, a1, a2, (a2 < a3 && a3 < a1) || (a1 < a2 && a2 < a3) || (a3 < a1 && a1 < a2));
        ctx.stroke();
        ctx.fillRect(obj.p3.x - 2, obj.p3.y - 2, 3, 3);
        ctx.fillStyle = 'rgb(128,128,128)';
        ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 3, 3);
        ctx.fillRect(obj.point2.x - 2, obj.point2.y - 2, 3, 3);
      }
    }
    else if (obj.point2){
      ctx.fillStyle = 'rgb(128,128,128)';
      ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 3, 3);
      ctx.fillRect(obj.point2.x - 2, obj.point2.y - 2, 3, 3);
    }
    else{
      ctx.fillStyle = 'rgb(128,128,128)';
      ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 3, 3);
    }
  },

  rayIntersection: function(obj, ray) {
    if (!obj.p3) {return;}
    var center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point1, obj.p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point2, obj.p3)));
    if (!isFinite(center.x) || !isFinite(center.y)){
      return Constructs['mirror'].rayIntersection(obj, ray);
    }
    else{
      var rp_temp = Basic_Constructs.intersection_line_circle(Basic_Constructs.line(ray.point1, ray.point2), Basic_Constructs.circle(center, obj.point2)); 
      var rp_exist = [];
      var rp_lensq = [];
      for (var i = 1; i <= 2; i++){
        rp_exist[i] = !Basic_Constructs.intersection_is_on_segment(Basic_Constructs.intersection_line_line(Basic_Constructs.line(obj.point1, obj.point2), Basic_Constructs.line(obj.p3, rp_temp[i])), Basic_Constructs.segment(obj.p3, rp_temp[i])) && Basic_Constructs.intersection_is_on_ray(rp_temp[i], ray) && Basic_Constructs.length_squared(rp_temp[i], ray.point1) > minShotLength_squared;
        rp_lensq[i] = Basic_Constructs.length_squared(ray.point1, rp_temp[i]); 
      }
      if (rp_exist[1] && ((!rp_exist[2]) || rp_lensq[1] < rp_lensq[2])) {return rp_temp[1];}
      if (rp_exist[2] && ((!rp_exist[1]) || rp_lensq[2] < rp_lensq[1])) {return rp_temp[2];}
    }
  },

  shot: function(obj, ray, rayIndex, rp) {
    var center = Basic_Constructs.intersection_line_line(Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point1, obj.p3)), Basic_Constructs.perpendicular_bisector(Basic_Constructs.line(obj.point2, obj.p3)));
    if (!isFinite(center.x) || !isFinite(center.y)){
      return Constructs['mirror'].shot(obj, ray, rayIndex, rp);
    }
    else{
      var rx = ray.point1.x - rp.x;
      var ry = ray.point1.y - rp.y;
      var cx = center.x - rp.x;
      var cy = center.y - rp.y;
      var c_sq = cx * cx + cy * cy;
      var r_dot_c = rx * cx + ry * cy;
      ray.point1 = rp;
      ray.point2 = Basic_Constructs.point(rp.x - c_sq * rx + 2 * r_dot_c * cx, rp.y - c_sq * ry + 2 * r_dot_c * cy);
    }
  }
};

//////////////////////////////////////////////////////////////////////  Measurement tools   //////////////////////////////////////////////////////////////////////////////

Constructs['ruler'] = {
  // function to create a functional object of ruler
 /**
 * @fn create
 * @brief Creates the functional object of the Ruler,which contains information about its type and necessary boundary points and properties if any.  
 */
  create: function(mouse) {
    return {type: 'ruler', point1: mouse, point2: mouse};
  },
  // elememntry event handler same as lineobj
  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,
  // drws ruler 
  /**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when the mousemoves or when appropriate mouseevents take place         
 * @param[in] obj The object to be drawn
 * @detail The draw function handles different cases of drawing according to the angle of the scale so as to keep the numbers in readable upfront view and not inverted view
 */
  draw: function(obj,aboveLight) {
  //var ctx = canvas.getContext('2d');
    if (aboveLight)return;
    ctx.globalCompositeOperation = 'lighter';
    var len = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
    var par_x = (obj.point2.x - obj.point1.x) / len;
    var par_y = (obj.point2.y - obj.point1.y) / len;
    var per_x = par_y;
    var per_y = -par_x;
    var ang = Math.atan2(obj.point2.y - obj.point1.y, obj.point2.x - obj.point1.x);
    //console.log(ang);
    var scale_step = 10;
    var scale_step_mid = 50;
    var scale_step_long = 100;
    var scale_len = 10;
    var scale_len_mid = 15;
    ctx.strokeStyle = 'rgb(128,128,128)';
    ctx.font = '14px Arial';
    ctx.fillStyle = 'rgb(128,128,128)';
    // we need to take care of the allinment of the tesxt on the scale
    if (ang > Math.PI * (-0.25) && ang <= Math.PI * 0.25){
      var scale_direction = -1;
      var scale_len_long = 20;
      var text_ang = ang;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
    }
    else if (ang > Math.PI * (-0.75) && ang <= Math.PI * (-0.25)){
      var scale_direction = 1;
      var scale_len_long = 15;
      var text_ang = ang - Math.PI * (-0.5);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
    }
    else if (ang > Math.PI * 0.75 || ang <= Math.PI * (-0.75)){
      var scale_direction = 1;
      var scale_len_long = 20;
      var text_ang = ang - Math.PI;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
    }
    else{
      var scale_direction = -1;
      var scale_len_long = 15;
      var text_ang = ang - Math.PI * 0.5;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
    }
    ctx.beginPath();
    ctx.moveTo(obj.point1.x, obj.point1.y);
    ctx.lineTo(obj.point2.x, obj.point2.y);
    var x, y;
    // for loop to draw the graph
    for (var i = 0; i <= len; i += scale_step){
      ctx.moveTo(obj.point1.x + i * par_x, obj.point1.y + i * par_y);
      if (i % scale_step_long == 0){
        x = obj.point1.x + i * par_x + scale_direction * scale_len_long * per_x;
        y = obj.point1.y + i * par_y + scale_direction * scale_len_long * per_y;
        ctx.lineTo(x, y);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(text_ang);
        ctx.fillText(i, 0, 0);
        ctx.restore();
      }
      else if (i % scale_step_mid == 0){
        ctx.lineTo(obj.point1.x + i * par_x + scale_direction * scale_len_mid * per_x, obj.point1.y + i * par_y + scale_direction * scale_len_mid * per_y);
      }
      else{
        ctx.lineTo(obj.point1.x + i * par_x + scale_direction * scale_len * per_x, obj.point1.y + i * par_y + scale_direction * scale_len * per_y);
      }
    }
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }
};

Constructs['protractor'] = {
  // creating functional objects for protracter
  /**
 * @fn create
 * @brief Creates the functional object of the Protractor,which contains information about its type and necessary boundary points and properties if any.  
 */
  create: function(mouse) {
    return {type: 'protractor', point1: mouse, point2: mouse};
  },
  // mousedown ,mousemove, mouseup even handles are the generic ones
  c_mousedown:Constructs['lineobj'].c_mousedown,
  c_mousemove: function(obj, mouse, ctrl, shift) {Constructs['lineobj'].c_mousemove(obj, mouse, false, shift)},
  c_mouseup: Constructs['lineobj'].c_mouseup,
  // function todraw thr protracter
  /**
 * @fn draw
 * @brief Draws the object when it is partially constucted or when the mousemoves or when appropriate mouseevents(mouse_down) take place         
 * @param[in] obj The object to be drawn
 * @detail The draw function handles different cases of drawing according to the radius of the Protracter so as to keep the numbers in readable scale not too small not too large.
 */
  draw: function(obj,aboveLight) {
    if (!aboveLight){
      ctx.globalCompositeOperation = 'lighter';
      var r = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
      var scale_width_limit = 5;

      var scale_step = 1;
      var scale_step_mid = 5;
      var scale_step_long = 10;
      var scale_len = 10;
      var scale_len_mid = 15;
      var scale_len_long = 20;

      ctx.strokeStyle = 'rgb(128,128,128)';
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = 'rgb(128,128,128)';

      if (r * scale_step * Math.PI / 180 < scale_width_limit){
        scale_step = 10;
        scale_step_mid = 30;
        scale_step_long = 90;
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.beginPath();
      ctx.arc(obj.point1.x, obj.point1.y, r, 0, Math.PI * 2, false);
      var ang, x, y;
      for (var i = 0; i < 360; i += scale_step){
        ang = i * Math.PI / 180 + Math.atan2(obj.point2.y - obj.point1.y, obj.point2.x - obj.point1.x);
        ctx.moveTo(obj.point1.x + r * Math.cos(ang), obj.point1.y + r * Math.sin(ang));
        if (i % scale_step_long == 0){
          x = obj.point1.x + (r - scale_len_long) * Math.cos(ang);
          y = obj.point1.y + (r - scale_len_long) * Math.sin(ang);
          ctx.lineTo(x, y);
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang + Math.PI * 0.5);
          ctx.fillText((i > 180) ? (360 - i) : i, 0, 0);
          ctx.restore();
        }
        else if (i % scale_step_mid == 0){
          ctx.lineTo(obj.point1.x + (r - scale_len_mid) * Math.cos(ang), obj.point1.y + (r - scale_len_mid) * Math.sin(ang));
        }
        else{
          ctx.lineTo(obj.point1.x + (r - scale_len) * Math.cos(ang), obj.point1.y + (r - scale_len) * Math.sin(ang));
        }
      }
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(obj.point1.x - 2, obj.point1.y - 2, 3, 3);
    ctx.fillStyle = 'rgb(255,0,255)';
    //ctx.fillStyle="indigo";
    ctx.fillRect(obj.point2.x - 2, obj.point2.y - 2, 3, 3);
  }
};


///////////////////////////////////////////////////////////////////////////////  SHOW-TIME  ////////////////////////////////////////////////////////////////////////

var canvas;
var ctx;
var mouse; // mouse basically cordinates
var mouse_lastmousedown; //last cordinates of mouse down
var objs = []; // the objects array
var objCount = 0; //
var isConstructing = false; //to vigilate the mouse events
var constructionPoint; //Sets the starting position of an object
var rayDensity_light = 0.1; //the raydensity thing
var mode = 'light'; 
var tools_withList = ['Light_Source_','mirror_', 'refractor_','measure_'];
var tools_inList = ['Ray', 'Point_Source', 'Beam','mirror', 'arcmirror', 'idealmirror', 'lens', 'refractor','ruler','protractor'];

/**
  * @brief event handler of window.onload, kicks in as soon as window is loaded, adds the vital event listeners
  * @method window.onload
  * @param {e} :- event
  * @return {NULL}
  * @detail initializes the innerthtml values of html elements,initializes vital parameters, adds vital eventlisteners window.onmousedown , canvas.onmuosedown , canvas.onmousemove, 
  canvas.onmousemove, canvas.onmouseup also adds the event listeners for buttons and lists of html page 
**/
window.onload = function(e) {
  init_page_headers();
  canvas = document.getElementById('canvas1');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  mouse = Basic_Constructs.point(0, 0);
  initParameters();

  window.onmousedown = function(e){ //console.log("calling selectObj from window.onmousedown");
    //selectObj(-1);
  };
 
  canvas.onmousedown = function(e){
    document.getElementById('objAttr_text').blur(); // Creting the effect of focunsing
    document.body.focus();                          // ficunsing the bosy on click 
   // console.log("calling canvas onmouse down");
    canvas_onmousedown(e);
    return false;
  };

  canvas.onmousemove = function(e){
    canvas_onmousemove(e);
  };

  canvas.onmouseup = function(e){
    canvas_onmouseup(e);
  };

  tools_withList.forEach(function(element, index){
    document.getElementById('tool_' + element).onmouseenter = function(e) {toolbtnwithlist_mouseentered(element, e);};
    document.getElementById('tool_' + element).onclick = function(e) {toolbtnwithlist_mouseentered(element, e);};
    document.getElementById('tool_' + element).onmouseleave = function(e) {toolbtnwithlist_mouseleft(element, e);};
    document.getElementById('tool_' + element + 'list').onmouseleave = function(e) {toollist_mouseleft(element, e);};
  });

  tools_inList.forEach(function(element, index){
    document.getElementById('tool_' + element).onclick = function(e) {toollistbtn_clicked(element, e);};
  });

  document.getElementById('reset').onclick = function() {initParameters();};
 
  document.getElementById('rayDensity').oninput = function(){
    rayDensity_light = Math.exp(this.value);
    draw();
  };
  document.getElementById('rayDensity').onmouseup = function(){
    rayDensity_light = Math.exp(this.value);
    draw();
  };

  document.getElementById('objAttr_range').oninput = function(){
    setAttr(document.getElementById('objAttr_range').value * 1);
  };
  
  document.getElementById('objAttr_text').onchange = function(){
    setAttr(document.getElementById('objAttr_text').value * 1);
  };
  
  document.getElementById('objAttr_text').onclick = function(e){
    this.select();
  };

  canvas.addEventListener('contextmenu', function(e) {
          e.preventDefault();
      }, false);
};
/**
  * @brief initializes the innerthtml values of html elements
  * @method init_page_headers
  * @param {NULL}
  * @return {NULL}
**/
function init_page_headers() {
  document.getElementById('tool_Ray').dataset['n'] = "Single ray"
  document.getElementById('tool_Point_Source').dataset['n'] = "Point_source"
  document.getElementById('tool_Beam').dataset['n'] = "Beam"
  document.getElementById('tool_mirror').dataset['n'] = "Mirror"
  //Mirror->Circular Arc
  document.getElementById('tool_arcmirror').dataset['n'] = "Mirror"
  //Mirror->Curve (ideal)
  document.getElementById('tool_idealmirror').dataset['n'] = "Ideal curved mirror"
  document.getElementById('tool_idealmirror').dataset['p'] = "Focal length:"
  document.getElementById('tool_refractor').dataset['n'] = "Glass"
  document.getElementById('tool_refractor').dataset['p'] = "Refractive index:"
  //Refractor->Lens (ideal)
  document.getElementById('tool_lens').dataset['n'] = "Ideal lens"
  document.getElementById('tool_lens').dataset['p'] = "Focal length:"
  document.getElementById('mode_light').value = "Rays"
  document.getElementById('reset').value = "Reset"
  document.getElementById('tool_ruler').value = "Ruler"
  document.getElementById('tool_ruler').dataset['n'] = "Ruler"
  document.getElementById('tool_protractor').value =  "Protractor"
  document.getElementById('tool_protractor').dataset['n'] =  "Protractor"
}

///////////////////////////////////////////////////////// The main draw functionality //////////////////////////////////////////////////////////////////////////////
var waitingRays = []; //the array of waiting rays
var waitingRayCount = 0; //Count of waiting rays
var positioningObj = -1; 
var selectedObj = -1; 
var AddingObjType =''; // the current object being added type

function draw(){// console.log("inside draw()");
  draw_();
}

function draw_() {
  console.log("insode draw_()");
  canvasPainter.clean_canvas(); //Clear canvas
  ctx.globalAlpha = 1;
  waitingRays = []; // restart
  shotRayCount = 0;// draw over everything 
  for (var i = 0; i < objs.length; i++){ 
    Constructs[objs[i].type].draw(objs[i]); //draw all objects interior
    if (Constructs[objs[i].type].shoot){
      Constructs[objs[i].type].shoot(objs[i]); //if objects can shoot make them shoot light
    }
  }
  shootWaitingRays();
}

function addRay(ray) {
  waitingRays[waitingRays.length] = ray;
}

var minShotLength = 1e-6; //The shortest distance in which the light acts two times (light that is less than this distance will be ignored)  basically precesion
var minShotLength_squared = minShotLength * minShotLength;
// The baap function
/**
  * @brief The core drawing helper function that handles the rays and passes control to the required objects at appropriate times to reflect and refract the array 
  * @method shootWaitingRays
  * @param {NULL} 
  * @return {NULL}
  * @detail the function shootWaitingrays() shoots the rays in the array waiting rays that are added when the object that shoot rays are drawn,it searches for the nearest object that
   the ray strikes and calls the respective function of the object to handle the ray.
**/
function shootWaitingRays(){
  alpha0=1;
  ctx.globalAlpha = 1;
  var ray1;
  var observed;
  var last_ray;
  var last_intersection;
  var s_obj;
  var s_obj_index;
  var last_s_obj_index;
  var s_point;
  var s_point_temp;
  var s_lensq;
  var s_lensq_temp;
  var observed_point;
  var observed_intersection;
  var rpd;
  var leftRayCount = waitingRays.length; // this is the number of rays to be drwan

  while (leftRayCount != 0){
    leftRayCount = 0; //Restart to calculate the amount of remaining light
    last_s_obj_index = -1;
    last_ray = null;
    last_intersection = null;
    for (var j = 0; j < waitingRays.length; j++){
      if (waitingRays[j]){
        //If waitingRays[j] exists
        //Begin to shoot waitingRays[j] (the last light of the waiting area)
        //Determine which object will hit the light after it is shot
        //O(nm)
        //The decrease in search of every "intersect with this light objects, looking for" [light] from the intersection of the object and the light [head] recent articles"
        s_obj = null; //"So far, the object of inspection [the intersection with the light] from the [light of the head] the nearest object
        s_obj_index = -1;
        s_point = null;  //The intersection of s_obj and light 
        s_lensq = Infinity; //Set the distance between "s_obj and the intersection of light" and "the head of the ray" to infinity (since no object has been checked at all, and now is looking for the minimum) 
        for (var i = 0; i < objs.length; i++){
          if (Constructs[objs[i].type].rayIntersection) {
            s_point_temp = Constructs[objs[i].type].rayIntersection(objs[i], waitingRays[j]);
            if (s_point_temp){
              s_lensq_temp = Basic_Constructs.length_squared(waitingRays[j].point1, s_point_temp); //The distance to the head of light
              if (s_lensq_temp < s_lensq && s_lensq_temp > minShotLength_squared){
                //If  [intersection light] "[objs [i] and the light intersection] and the distance between [the head light] is" specific "So far, the inspection object from the [first light] Recent object "is also short
                s_obj = objs[i]; //Update the object closest to the light [object] in the object that has been checked so far"
                s_obj_index = i;
                s_point = s_point_temp; //S_point is also updated together
                s_lensq = s_lensq_temp; //S_len is also updated together
              }
            }
          }
        }
        ctx.globalAlpha = waitingRays[j].brightness;
        //If the light does not reach any object
        if (s_lensq == Infinity){
            canvasPainter.draw(waitingRays[j], 'rgb(255,255,128)'); //the yellow color
        }
        else{// In this case, the representative of the emitted light will s_len (distance) through at s_point (position) hit s_obj (object)
            canvasPainter.draw(Basic_Constructs.segment(waitingRays[j].point1, s_point), 'rgb(255,255,128)');
        }

        if (last_s_obj_index != s_obj_index){
          waitingRays[j].gap = true;
        }
        waitingRays[j].isNew = false;
        last_ray = {point1: waitingRays[j].point1, point2: waitingRays[j].point2};
        //last_s_obj=s_obj;
        last_s_obj_index = s_obj_index;
        if (s_obj){
          Constructs[s_obj.type].shot(s_obj, waitingRays[j], j, s_point);
        }
        else{
          waitingRays[j] = null;
        }

        shotRayCount = shotRayCount + 1; 
        if (waitingRays[j]){
          leftRayCount = leftRayCount + 1;
        }
      }
    }
  }
  ctx.globalAlpha = 1.0;
 
  for (var i = 0; i < objs.length; i++){
    Constructs[objs[i].type].draw(objs[i],true); 
  }
  setTimeout(draw_, 10);
}
// error margin variables to check if mouse has moved outside the point,line or whatever!.
var clickExtent_point = 10;
var clickExtent_point_construct = 10; 
var clickExtent_line = 10;

function mouseOnPoint(mouse, point){
  return Basic_Constructs.length_squared(mouse, point) < clickExtent_point * clickExtent_point;
}

function mouseOnPoint_construct(mouse, point){
 // console.log(point);
  return Basic_Constructs.length_squared(mouse, point) < clickExtent_point_construct * clickExtent_point_construct;
}

function mouseOnSegment(mouse, segment){
  var d_per = Math.pow((mouse.x - segment.point1.x) * (segment.point1.y - segment.point2.y) + (mouse.y - segment.point1.y) * (segment.point2.x - segment.point1.x), 2) / ((segment.point1.y - segment.point2.y) * (segment.point1.y - segment.point2.y) + (segment.point2.x - segment.point1.x) * (segment.point2.x - segment.point1.x)); //Similar to the mouse perpendicular to the straight line distance
  var d_par = (segment.point2.x - segment.point1.x) * (mouse.x - segment.point1.x) + (segment.point2.y - segment.point1.y) * (mouse.y - segment.point1.y); //Similar to a mouse in a straight line projection on a location
  return d_per < clickExtent_line * clickExtent_line && d_par >= 0 && d_par <= Basic_Constructs.length_of_segment_squared(segment);
}

function mouseOnLine(mouse, line){
  var d_per = Math.pow((mouse.x - line.point1.x) * (line.point1.y - line.point2.y) + (mouse.y - line.point1.y) * (line.point2.x - line.point1.x), 2) / ((line.point1.y - line.point2.y) * (line.point1.y - line.point2.y) + (line.point2.x - line.point1.x) * (line.point2.x - line.point1.x)); //Similar to the mouse perpendicular to the straight line distance
  return d_per < clickExtent_line * clickExtent_line;
}
//////////////////////////////////////////////////// Canvas Handlers ///////////////////////////////////////////////////////////////////////////////////////////////
/**
  * @brief the helper function of the event handler canvas.onmousedown, it passes the control to the object being constructed if there exists any.
  * @method canvas_onmousemove
  * @param {e} :- event
  * @return {NULL}
  * @detail canvas_onmousedown handles the cordinates of mouse and passes them to objects after making some adjustments according to whether object is being constructed or not
**/
function canvas_onmousedown(e) {//  console.log("inside canvas_onmousedown");
  var mouse_now = Basic_Constructs.point(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); //The actual position of the mouse
  mouse_lastmousedown = mouse_now;
  mouse = mouse_now;

  if (isConstructing){
    Constructs[objs[objs.length - 1].type].c_mousedown(objs[objs.length - 1], mouse);
  }
 else{
  //console.log("isConstructing is false assigning construction point to the mouse")
  objs[objs.length] = Constructs[AddingObjType].create(mouse);
  isConstructing = true;
  constructionPoint = mouse;
  //console.log("selectObj called from canvas_onmousedown");
  selectObj(objs.length - 1);
  //console.log(mouse);
  //console.log("selectObj called from canvas_onmousedown");
  //console.log(objs[objs.length-1]);
  Constructs[objs[objs.length - 1].type].c_mousedown(objs[objs.length - 1], mouse);
 }    
}
/**
  * @brief the helper function of the event handler canvas.onmousemove, it passes the control to the object being constructed if there exists any otherwise it does nothing
  * @method canvas_onmousemove
  * @param {e} :- event
  * @return {NULL}
**/
function canvas_onmousemove(e) {//   console.log("inside canvas_onmousemove");
  var mouse2 = Basic_Constructs.point(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  if (mouse2.x == mouse.x && mouse2.y == mouse.y){// redunant mouse didnt move
    return;
  }
  mouse = mouse2;
  if (isConstructing){//if an object is being established, it will be passed directly to the action
    Constructs[objs[objs.length - 1].type].c_mousemove(objs[objs.length - 1], mouse);
    }
}
/**
  * @brief the helper function of the event handler canvas.onmousedown, it passes the control to the object being constructed if there exists any otherwise it does nothing
  * @method canvas_onmouseup
  * @param {e} :- event
  * @return {NULL}
**/
function canvas_onmouseup(e){
  if (isConstructing){//if an object is being established, it will be passed directly to the action else chill.
      Constructs[objs[objs.length - 1].type].c_mouseup(objs[objs.length - 1], mouse);
    }
}
/**
  * @brief initializes vital parameters, called when the system is reset
  * @method selectObj
  * @param {index} index of the object to be selected 
  * @return {NULL}
  * @detail first it checks the valideity of index if it sselected then it selects it and modifies the window to display ots property(if it has any) through changing elements of HTML page
**/
function selectObj(index){// console.log("inside selectObj otputting the value of index and objs and objs.length");
 // console.log(index,objs,objs.length);
  if (index < 0 || index >= objs.length){
  //  console.log("selected object set to -1");
    selectedObj = -1;
    document.getElementById('obj_settings').style.display = 'none';
    return;
  }
  selectedObj = index;// console.log("inside_selectObj(index)");// console.log("outputting the selected object number");// console.log(selectedObj);
  document.getElementById('obj_name').innerHTML = document.getElementById('tool_' + objs[index].type).dataset['n'];// reset the header
  if (Constructs[objs[index].type].p_name){// would return true if p_name exists that is object has a property
    document.getElementById('p_box').style.display = '';
    var p_temp = objs[index].p;
    document.getElementById('p_name').innerHTML = document.getElementById('tool_' + objs[index].type).dataset['p'];
    document.getElementById('objAttr_range').min = Constructs[objs[index].type].p_min;
    document.getElementById('objAttr_range').max = Constructs[objs[index].type].p_max;
    document.getElementById('objAttr_range').step = Constructs[objs[index].type].p_step;
    document.getElementById('objAttr_range').value = p_temp;
    document.getElementById('objAttr_text').value = p_temp;
    objs[index].p = p_temp;
  }
  else{
    document.getElementById('p_box').style.display = 'none';
  }
  document.getElementById('obj_settings').style.display = '';
}
/**
  * @brief setts the attribute of teh selected object to value that is passed to it as arguement
  * @method setAttr
  * @param {value} :- value of attribute   
  * @return {NULL}
**/
function setAttr(value){// console.log(value);// console.log(selectedObj);//selectedObj=0;// console.log(selectedObj);// console.log(objs[selectedObj].p) ;//= value;
  objs[selectedObj].p=value;
  document.getElementById('objAttr_text').value = value;
  document.getElementById('objAttr_range').value = value;
  draw();
}
/**
  * @brief initializes vital parameters, called when the system is reset
  * @method initParameters
  * @param {NULL} 
  * @param {NULL}  
  * @return {NULL}
  * @detail initialses important parameters(sets them to default parameters) and draws the canvas again(that is do nothing everything is reset)
**/
function initParameters(){
  isConstructing = false;
  positioningObj = -1;
  objs.length = 0;
  selectObj(-1);
  rayDensity_light = 0.1; 
  draw();
}
///////////////////////////////////////////////////////////  TOOL button  functionality  /////////////////////////////////////////////////////////////
/**
  * @brief event handler for the event when a tool is clicked.
  * @method toolbtn_clicked
  * @param {tool} tool 
  * @param {event} e 
  * @return {NULL}
  * @detail resets and updates the classnames of the Html elemensts to differentiate the current selected tool from rest the hides all the lists and sets the variable addingObjType to the 
  current object that is tool.
**/
function toolbtn_clicked(tool, e){
  console.log("inside toolbtn_clicked")
  tools_normal.forEach(function(element, index){
    document.getElementById('tool_' + element).className = 'btn btn-primary';
  });
  tools_withList.forEach(function(element, index){
    document.getElementById('tool_' + element).className = 'btn btn-primary';
  });
  tools_inList.forEach(function(element, index){
    document.getElementById('tool_' + element).className = 'toollistbtn';
  });

  hideAllLists();

  document.getElementById('tool_' + tool).className = 'btn btn-success';
  AddingObjType = tool;
}

/**
  * @brief event handler when a a mouse enters a tool button which has list.  
  * @method toolbtnwithlist_mouseentered
  * @param {tool} tool 
  * @param {event} e 
  * @return {NULL}
  * @detail gets the bounding rectangle of the tool, updates the style elements of the tool on which mouse has entered so that the list gets displayed and updates the class of the
  tool from toolbtn to toolbtnwithlisthover
**/
function toolbtnwithlist_mouseentered(tool, e){
  console.log("inside toolbtnwithlist_mouseentered");
  //console.log("tool_"+tool)
  hideAllLists();
  var rect = document.getElementById('tool_' + tool).getBoundingClientRect();
  //console.log(document.getElementById("tool_"+tool+"list"))
  document.getElementById('tool_' + tool + 'list').style.left = rect.left + 'px';
  document.getElementById('tool_' + tool + 'list').style.top = rect.bottom + 'px';
  document.getElementById('tool_' + tool + 'list').style.display = '';
  if (document.getElementById('tool_' + tool).className == 'btn btn-primary'){
    document.getElementById('tool_' + tool).className = 'btn btn-info';
  }
}

/**
  * @brief event handler when a a mouse leaves a tool button which has list, hides the list after verifying that the mouse has left a certain area around the list and resets the class of the element
  * @method toolbtnwithlist_mouseleft
  * @param {tool} tool 
  * @param {event} e 
  * @return {NULL}
  * @detail gets the bounding rectangle of the list checks , updates the mouse variable to store the value of the point at which mouse was on when the event was triggered and checks that the 
  mouse left a ceratin boundary of the area, if so closes the list and resets the class of the listtool to toolbtn
**/
function toolbtnwithlist_mouseleft(tool, e){
  console.log("inside toolbtnwithlist_mouseleft");
  //console.log("btnout")
  var rect = document.getElementById('tool_' + tool + 'list').getBoundingClientRect();
  mouse = Basic_Constructs.point(e.pageX, e.pageY);
  //console.log(rect)
  //console.log(mouse)
  if (mouse.x < rect.left || mouse.x > rect.right || mouse.y < rect.top - 5 || mouse.y > rect.bottom){
    //The mouse is not on the drop down menu
    document.getElementById('tool_' + tool + 'list').style.display = 'none';
    if (document.getElementById('tool_' + tool).className == 'btn btn-info'){
      document.getElementById('tool_' + tool).className = 'btn btn-primary';
    }
  }
}

/**
  * @brief event handler when a a mouse leaves a list, hides the list after verifying that the mouse has left a certain area around the list
  * @method toollist_mouseleft
  * @param {tool} tool 
  * @param {event} e 
  * @return {NULL}
  * @detail gets the bounding rectangle of the list checks , updates the mouse variable to store the value of the point at which mouse was on when the event was triggered and checks that the 
  mouse left a ceratin boundary of the area, if so closes the list and resets the class of the listtool to toolbtn
**/
function toollist_mouseleft(tool, e){
  console.log("inside toollist_mouseleft(tool,e)");
  //console.log("listout")
  var rect = document.getElementById('tool_' + tool).getBoundingClientRect();
  mouse = Basic_Constructs.point(e.pageX, e.pageY);
  if (mouse.x < rect.left || mouse.x > rect.right || mouse.y < rect.top || mouse.y > rect.bottom + 5) {
    document.getElementById('tool_' + tool + 'list').style.display = 'none';
    if (document.getElementById('tool_' + tool).className == 'btn btn-info'){
      document.getElementById('tool_' + tool).className = 'btn btn-primary';
    }
  }
}

/**
  * @brief event handler for the event when a tool is clicked.
  * @method toolbtn_clicked
  * @param {tool} tool 
  * @param {event} e 
  * @return {NULL}
  * @detail resets and updates the classnames of the Html elemensts to differentiate the current selected tool from rest the hides all the lists and sets the variable addingObjType to the 
  current object that is tool.
**/
function toollistbtn_clicked(tool, e){
  console.log("inside toollistbtn_clicked()");
  var selected_toolbtn; 
  var selecting_toolbtnwithlist; 
  tools_withList.forEach(function(element, index){
    if (document.getElementById('tool_' + element).className == 'btn btn-info'){
      selecting_toolbtnwithlist = element;
    }
    if (document.getElementById('tool_' + element).className == 'btn btn-success'){
      selected_toolbtn = element;
    }
  });
  //console.log([selected_toolbtn,selecting_toolbtnwithlist]);
  if (!selecting_toolbtnwithlist){
    selecting_toolbtnwithlist = selected_toolbtn; //The toollistbtn belonged to was previously pressed toolbtn
  }
  //console.log(selecting_toolbtnwithlist);
  tools_withList.forEach(function(element, index){
    document.getElementById('tool_' + element).className = 'btn btn-primary';
  });
  tools_inList.forEach(function(element, index){
    document.getElementById('tool_' + element).className = 'toollistbtn';
  });

  hideAllLists();

  document.getElementById('tool_' + selecting_toolbtnwithlist).className = 'btn btn-success';
  document.getElementById('tool_' + tool).className = 'toollistbtnselected';
  AddingObjType = tool;
}

/**
  * @brief hides the list by setting the display attribut to none and resets the class of the toollist
  * @method hideAllLists
  * @param {NULL}  
  * @return {NULL}
**/
function hideAllLists(){//  console.log("inside hideAllLists()");
  tools_withList.forEach(function(element, index){
    document.getElementById('tool_' + element + 'list').style.display = 'none';
    if (document.getElementById('tool_' + element).className == 'btn btn-info'){
      document.getElementById('tool_' + element).className = 'btn btn-primary';
    }
  });
}
/////////////////////////////////////////////////////////////////////// THE END!!!!!!!!!!!!!!!!!!!!!!!!! :) ///////////////////////////////////////////////////////////////////////////////////
