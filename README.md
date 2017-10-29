# Physics-Visualization
This project contains simulations for different optical and the mechanical phenomenons and configurations. As of now the project mainly consists of two major portions of Physics- Mechanics and Optics.

## How to Run 

First clone the reppository, for this follow the guidelines -

### Cloning the Repository
Open terminal and type the following command
``` 
git clone https://github.com/RSudarsanan/Physics-Visualization.git
```

### Running in the browser

After the repository is cloned , go to homepage in the repository and open index.html in the browser, the homepage of the project will be displayed offering two portions - Optics and Mechanics with the links to go on the respective pages

# Simulation Instructions

## Optics Part

The optics page opens with an empty workspace with toolbar having buttons for adding various components in the workspace and to control their properties. the toolbar has buttons for adding light sources, mirrors, refractors and measurement tools.

### Light Sources

It is a dropdown menu with the buttons for single ray, parallel beam and point source

#### Single Ray

Allows to draw a single ray. After clicking this button the user has to click at the starting point of the ray and then on another point through which the ray has to pass. Once the mouse is lifted the ray will get fixed.

#### Parallel Beam

Allows to draw a parallel beam whose length of spread, direction and the starting place can be marked. After selecting this option the user has to click at the point from where the beam starts to emanate rays and then as the user moves the mouse the beam is displayed and ppropriately the user has to click at another point to specify the other end of the line from which the rays emanate. The slider for the ray density can be used to modify the beam density.

#### Point Source

Allows to insert a point source of light in the system. After selecting this option the user has to click at the point where the user wants to add the point source on the screen and then the point source is displayed. The user can control the density of the rays originating from the point by adjusting the slider for the ray density

### Refractors

It is a dropdown menu with the buttons to add plane and curved mirrors to the system

#### Plane Mirror

For adding a plane mirror to the system the user after selecting this option has to click at one of the end points of the mirror and then at the other end point of the mirror and then the mirror gets fixed at the specified place.

#### Circular Mirror

For adding a mirror which is in the shape of an arc. The user has to click at one of the end points of the arc of the required mirror and then at the other end of the arc and then finally click at any point on the arc. Then an arc passing through these three points with the first two as the end-points gets fixed in the work space

#### Convex/Concave Mirror

For adding the concave mirror with very small curvature and apperture on which the paraxial ray approximation can be made and the mirror formua can be used to desrcibe its properties. After selecting this option the user has to click at the starting and the end points of this mirror and the focal length can be adjusted from the slider which appears below the toolbar. By the changing the focal length the mirror can be to behave as concave or convex. The user can also directly type the focal lenght in the box below the slider

### Refractors

For adding objects which allow refraction of light rays through them. It is a dropdown menu with buttons for adding an object with a particular shape and refractive index or a lens

#### Polygin Refractor

Allows to add a closed curve which then behaves as an object with the refractive index as specified. After selecting this option the user has to click at the verices of the object in a cycle manner if the object is a polygon. For drawing curved edges, the user has to click at the starting point of the arc and then at any point on the arc and then without lifting the mouse the user has to drag till the end point of the arc and after lifting the mouse at the end-point of the arc, the curved edge gets fixed in the workspace. The user has to click at the starting after he has clicked at all the other vertices for completing the closed curve. the refractive index of the object can be changed by using the slider below the toolbar

#### Ideal lens

Allows to add ideal lens with the required focal length in the system. After selecting this option, the user has to click at the starting and the end-points and then can adjyst its focal length to make it work as a convex or concave lens

### Measurement

It allows the user to add measuring tools to the system like a ruler or a protractor

#### Ruler

The user has to click at the starting and the endpoints of the ruler and then a ruler gets added to the system

#### Protractor

After selecting this option the user has toclick at the center point where the protrctors' center has to placed and then at the circumference where the 0 degrees marking has to placed. Then the protractor gets added to the system

### Reset

On clicking this button the all the objects added in the system gets removed and a fresh workspace gets displayed.

## Mechanics Part 

Mechanics interface opens with a canvas representing the world ( environment ) and side toolbar with several tools in forms of buttons embedded in it.

### Controls 

Controls of the system are basically on the right side of the screen which is a sliding toolbar , It consists of following buttons with their respective jobs -

#### World Status

It consists of two buttons -

* pause - used to pause the world , it will stop all the simulations until run button is pressed , it is useful to add bodies with initial inertia . 
* run - resumes the system , all bodies start moving at their initial inertia

####  Add Body 

It is dropdown menu which contains several options to define the properties of the body and contains the button to add body to the world. 

* xCoordinate - specifies the X - coordinate of the body 
* yCoordiante - specifies the Y - coordinate of the body 
* xImpulse - synomymous for giving initial x component of the velocity
* yImpulse - synonymous for giving initial y component of the velocity 
* size - take input size in form of radius of the circumscribing circle of the body 
* sides - takes the number of sides of the body. 1 or 2 stands for circle 
* density - for setting the density of the body 
* friction - defines coefficient of friction associated with the surface of the body 
* frictionStatic - defines static friciton of the body 
* frictionAir - used to define the friction in the air 
* restitution - defines coefficient of restitution used for collisions.
* chamfer - used to chamfer the body around corners.

```
addBody - after defining the characteristics of the body above , this button can be used to finally add the body to the world.
```

####  Springs

It shows the dropdown menu which contains options to add bodies with springs attached to them 

* pointA - used to define the first end of the spring 
* pointB - takes the coordinates of second end of the spring 
* BodyA - takes the id of the body to which first end has to be attached, if kept -1, it fixes the spring to the pointA, if it is 0, 1, 2 or 3, it attaches the first end of the spring to walls or ground, if it is greater then or equal to 4, it attaches to the respective defined object in the world
* BodyB - similar to BodyA except for it defines the second end of the spring
* damping - takes the damping for the spring
* stiffness - takes stiffness of the spring as input 

```
addSpring - finally this button adds the spring into the world with above defined properties
```

#### Rods

It has the dropdown menu containing the options to add a r od between two objects or between a fixed point in the world and any object

* pointA - used to define the first end of the rod
* pointB - takes the coordinates of second end of the rod
* BodyA - takes the id of the body to which first end has to be attached, if kept -1, it fixes the spring to the pointA, if it is 0, 1, 2 or 3, it attaches the first end of the spring to walls or ground, if it is greater then or equal to 4, it attaches to the respective defined object in the world
* BodyB - similar to BodyA except for it defines the second end of the rod

```
AddRods - finally this button adds the rod to the world with the above defined properties
```

#### World

It has the button to clear or reset the world

* clear - used to remove all the added objects in the world and reset the world

#### Gravity

It has the options to change the direction and the magnitude of gravity acting in the world

* scale - It allows to specify the ratio or factor by wich the specified magnitude of the gracity has to be reduced
* x - takes the component of the aceleration of gravity in the horizontal direction taking right side as positive
* y - takes the component of the aceleration of gravity in the vertical direction taking upward direction as positive

#### Render

It has different options for visualisation of the physical properties like the velocity vector, points of contact or collision, orientation of the object and also has options to display the id of the objects used in specifing the objects for connecting with springs or rods

* showPositions - Marks the center point of each object
* showVelocity - Displays the velocity vector of the objects as a snall blue aroow sarting from the center of the object
* showCollisions - Displays the points of contact or collisions between objects
* showAxes - Displays the directions of the edges from the center for each of the objects
* showAngleIndicator - Draws a horizontal line from the center to the right edge when initially added to the object and hence used to find the angle of rotation of the objects with respect to the orienatation in which added to the world
* showIds - Dispays the IDs of the objects as they are stored in the world. Used in specifing the ID of the object when creating a spring or a rod attched to that object
* showInternalEdges - Displays the internal edges also when complex objects are designed
