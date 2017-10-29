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
