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

  draw: function(obj, canvas) {
  var len = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
  var par_x = (obj.point2.x - obj.point1.x) / len;
  var par_y = (obj.point2.y - obj.point1.y) / len;
  var per_x = par_y;
  var per_y = -par_x;

  var arrow_size_per = 5;
  var arrow_size_par = 5;
  var center_size = 2;

  ctx.strokeStyle = 'rgb(128,128,128)';
  ctx.globalAlpha = 1 / ((Math.abs(obj.p) / 100) + 1);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(obj.point1.x, obj.point1.y);
  ctx.lineTo(obj.point2.x, obj.point2.y);
  ctx.stroke();
  ctx.lineWidth = 1;

  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgb(128,128,128)';

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
  
  Constructs['mirror'] = {

  create: function(mouse) {
    return {type: 'mirror', point1: mouse, point2: mouse};
  },
  c_mousedown: Constructs['lineobj'].c_mousedown,
  c_mousemove: Constructs['lineobj'].c_mousemove,
  c_mouseup: Constructs['lineobj'].c_mouseup,
 // clicked: Constructs['lineobj'].clicked,
 // dragging: Constructs['lineobj'].dragging,
  rayIntersection: Constructs['lineobj'].rayIntersection,

  draw: function(obj, canvas) {
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

  draw: function(obj, canvas) {
  var len = Math.sqrt((obj.point2.x - obj.point1.x) * (obj.point2.x - obj.point1.x) + (obj.point2.y - obj.point1.y) * (obj.point2.y - obj.point1.y));
  var par_x = (obj.point2.x - obj.point1.x) / len;
  var par_y = (obj.point2.y - obj.point1.y) / len;
  var per_x = par_y;
  var per_y = -par_x;

  var arrow_size_per = 5;
  var arrow_size_par = 5;
  var center_size = 1;
  ctx.strokeStyle = 'rgb(168,168,168)';
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
  ctx.fillStyle = 'rgb(128,128,128)';

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

  draw: function(obj, canvas) {
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
