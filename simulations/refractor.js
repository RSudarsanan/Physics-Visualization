////////////////////////////////////////////////////////////////// REFRACTOR ///////////////////////////////////////////////////////////////////////////////////

Constructs['refractor'] = {

p_name: 'Refractive index', 
p_min: 1,
p_max: 3,
p_step: 0.01,

supportSurfaceMerging: true, 

create: function(mouse) {
  return {type: 'refractor', path: [{x: mouse.x, y: mouse.y, arc: false}], notDone: true, p: 1.5};
},

c_mousedown: function(obj, mouse){// console.log("mouse_down getting called");
  if (obj.path.length > 1){
    if (obj.path.length > 3 && mouseOnPoint(mouse, obj.path[0])){
      obj.path.length--;
      obj.notDone = false;
      draw();
      return;
    }
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; 
    obj.path[obj.path.length - 1].arc = true;
  }
},

c_mousemove: function(obj, mouse){ //console.log("mouse_move getting called");
  if (!obj.notDone) {return;}
  if (typeof obj.path[obj.path.length - 1].arc != 'undefined'){
    if (obj.path[obj.path.length - 1].arc && Math.sqrt(Math.pow(obj.path[obj.path.length - 1].x - mouse.x, 2) + Math.pow(obj.path[obj.path.length - 1].y - mouse.y, 2)) >= 5){
      obj.path[obj.path.length] = mouse;
      draw();
    }
  }
  else{
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; 
    draw();
  }
},

c_mouseup: function(obj, mouse){// console.log("mouse_up getting called");
  if (!obj.notDone) {
    isConstructing = false;
    draw();
    return;
  }
  if (obj.path.length > 3 && mouseOnPoint(mouse, obj.path[0])){
    obj.path.length--;
    obj.notDone = false;
    isConstructing = false;
    draw();
    return;
  }
  if (obj.path[obj.path.length - 2] && !obj.path[obj.path.length - 2].arc && mouseOnPoint_construct(mouse, obj.path[obj.path.length - 2])){
    delete obj.path[obj.path.length - 1].arc;
  }
  else{
    obj.path[obj.path.length - 1] = {x: mouse.x, y: mouse.y}; 
    obj.path[obj.path.length - 1].arc = false;
    obj.path[obj.path.length] = {x: mouse.x, y: mouse.y}; 

  }
  draw();
},

draw: function(obj, canvas, aboveLight) {
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
        point1 = Basic_Constructs.point(obj.path[i].x, obj.path[i].y);
        point2 = Basic_Constructs.point(obj.path[(i + 2)].x, obj.path[(i + 2)].y);
        p3 = Basic_Constructs.point(obj.path[(i + 1)].x, obj.path[(i + 1)].y);
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
      if (obj.path[(i + 1) % obj.path.length].arc && !obj.path[i % obj.path.length].arc){
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


  for (var i = 0; i < obj.path.length; i++){
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

shot: function(obj, ray, rayIndex, rp, surfaceMerging_objs) {
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

  for (var i = 0; i < surfaceMerging_objs.length; i++){
    shotType = Constructs[surfaceMerging_objs[i].type].getShotType(surfaceMerging_objs[i], ray);
    if (shotType == 1){
      n1 *= surfaceMerging_objs[i].p;
    }
    else if (shotType == -1){
      n1 /= surfaceMerging_objs[i].p;
    }
  }

  this.refract(ray, rayIndex, shotDataset.s_point, shotDataset.normal, n1);
},

getShotType: function(obj, ray) {
  return this.getShotDataset(obj, ray).shotType;
},


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
