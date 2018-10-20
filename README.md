# Code Wizard Castle
## An Introduction to Code Magic (programming)
### Begin your journey into the world of Code Magic a new Apprentice Code Wizard. Learn to harness the powers of Code Magic.

# Access the tutorial at https://make.sc/code-wizard-tutorial

## Directions
In this tutorial you will build up your comfort working with the basic building blocks of programming.

Starting from an empty canvas, you will soon be creating and customizing your own wizard and castle, and giving your wizard magical powers to interact with the world around you.

You'll start out by using existing code, then learning to modify parts of the code, and finally you will start to write your own code from scratch.

### Step 0 - File Organization
First, locate each of the following files:
- index.html
- sketch.js
- wizardClass.js
- spellFunctions.js
- drawFunctions.js
- helperFunctions.js

The `index.html` page is the webpage that you see when you run the program. Inside of it are some `script` tags that load all of the other `.js` (JavaScript) files. The main reason for having multiple files is to keep the code organized.

The `sketch.js` file is loaded last because it uses code from the other files to control the overall program. You will start by making edits in this file, and then later make updates inside some of the other `.js` files as well.

### Step 1 - Create Your Canvas
Go to `sketch.js`. Inside you should see this starter code:

```
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("lightgray");
}
```

When you run the program you should see that right now it just has a colored square on the page.

`createCanvas()` creates the canvas with the given width and height values, and `background()` fills the entire canvas with the color given.

The `setup()` function only runs one time at the start of the program. The `draw()` function is a loop that runs forver for as long as you are running the program. (These two functions are provided by the `p5.js` JavaScript library, which has been designed to make creating art and designs with code more accessible.)

### Step 2 - Color Your Wizard
Now that you've explored the difference between the two main functions that will control the program, let's start adding some magic! But first, we'll need a wizard!

In programming, variables are how you save and refer to existing objects or values.

- Add `var wizard, pet, magicScroll, broom;
` to the *very top* of `sketch.js`, above `function setup()`

You've just declared 4 global variables that will be available for all of your code to access.

Next up, make and save a `Wizard` to the `wizard` variable, and then call the `drawWizard()` function to make it appear.

- Inside of `setup()`, on a new line, add `wizard = new Wizard();`
- Inside of `draw()`, on a new line, add `drawWizard();`

Run your program and you should now see a shadowy wizard form! Now, time for some custom colors.

- On a new line at the end of `setup()`, paste in the following, which will assign colors to several properties on `wizard`:
```
wizard.wandColor = color(200);  // grayscale, 0 for black, 255 for white
wizard.hatColor = color("teal"); // named colors
wizard.robeColor = color(100, 50, 200); // RGB (red, green, blue), 0-255
wizard.skinColor = color("#9e81f4"); // hexcode colors
```
These are the 4 main ways to select colors with the `color()` function. (You can search for "color picker" online to find tools that will help you get the RGB or hexcode values you need.)

- Now paste in a few more line to give your `wizard` a name, and customize the color (feel free to use any style you prefer):
```
wizard.magicalName = "Wizard";
wizard.magicalNameColor = color("#e8b255");
```

Check - you should now have a custom and colorful wizard in the middle of your otherwise empty canvas.

### Step 3 - Fill Your Castle

- Inside of `draw()`, add `drawCastle();` on a new line

Did you put it before or after `drawWizard()`? Try switching the order to see what happens.

Order matters! If you call `drawCastle()` last, your `wizard` looks like he is stuck in the floor, because the floor tile lines were drawn *after* the `wizard`.

- Put the two functions in the correct order so that the `wizard` is on top.

You now have a nice 4-room castle, nice! But remember that we still have 3 global variables for other objects we want to add to our code: `pet`, `magicScroll`, and `broom`.

So far, you've seen how to update values on an object using the `object.property = value` format. Now let's practice creating and assigning object values another way.

- At the end of the `setup()` function, add:
```
pet = {
  x: 100,
  y: 350,
  type: "cat",
  color: color("black"),
}
```
- Inside of `draw()`, add `drawPet();`
- Again, you can change the color
- Change the pet's location by adjusting the `x` and `y` values.

Notice that location `0, 0` is in the *upper left* corner, not the bottom left. So bigger `y` values are lower on the canvas.

- For help getting the exact coordinates, you can add the following helper code to the `draw()` function: `reveal(mouseLocation(), "mouseInfo");`
Now you should see the coordinates that your mouse is at on the top left corner above the canvase.

- If you don't want a `"cat"`, you can also try a `"frog"`, or `"ghost"`

Let's add information for the last two global variables:
- Inside of `setup()`, add:
```
magicScroll = {
  x: 300,
  y: 50,
}

broom = {
  x: 350,
  y: 350,
}
```
- Inside of `draw()`, add `drawScroll();` and `drawPet();`
- Adjust the values so that the `magicScroll` is on the desk in the study, and the broom is by the fireplace in the kitchen.

### Step 4 - Adding Movement
Right now your castle is pretty static, with no movement other than your wizard looking around. Let's bring things to life!

First let's give your `wizard` the ability to walk around, by adding another property `walkSpeed` and then calling a helper function that will update the position for you.
- Inside of `setup()`, add `wizard.walkSpeed = 0.5;`
- Inside of `draw()`, add `wizard.updatePosition();`

Now you should see your `wizard` walking towards wherever your mouse is.

But let's give you a little more control - instead of the `wizard` walking all of the time, let's change it to only update position when we have pressed the `SHIFT` key on the keyboard. To accomplish this, you'll add your first custom function!

- At the end of `sketch.js`, *after* the end of the `draw()` function, add:
```
function updateWizardPostion() {
  if (keyIsDown(SHIFT)) {
    wizard.updatePosition();
  }
}
```
This function has a small `if` statement that checks if the `SHIFT` key is currently being pressed, and if the answer is yes, or `true`, then it will call `wizard.updatePosition();`

- Back up in `draw()`, remove `wizard.updatePosition();` and replace it with a call to your new function: `updateWizardPostion();`

Now, your `wizard` should only walk towards the mouse when you are pressing the `SHIFT` button.

Let's get your pet moving now too.

Just like we gave the `wizard` a `walkSpeed` we need to give one to the `pet`:
- Add a new property to the `pet` object:
```
pet = {
  x: 100,
  ...
  walkSpeed: 0.5,
}
```

Are you ready for your next function and an even bigger `if` statement?
- At the end of `sketch.js`, add:
```
function updatePetPosition() {
  if (pet.x > width) {
    pet.walkSpeed = pet.walkSpeed * -1;
  } else if (pet.x < 0) {
    pet.walkSpeed = pet.walkSpeed * -1;
  } else {
    // leave walkSpeed the same
  }

  pet.x = pet.x + pet.walkSpeed;
}
```
- Inside of `draw()`, add `updatePetPosition();`

Take a few minutes to examine the new function here. At the top is a 3-part `if else` statement.

The first `if` checks if the `pet` has walked past the right edge of the canvas (the variable `width` is automatically assigned to match the size of the canvas from `createCanvas`).

The second `else if` checks if the `pet` has gone off the left side of the canvas.

In either of those cases, `pet.walkSpeed` is multiplied by `-1` in order to reverse the direction the `pet` is walking.

Lastly, the `else` statement is for any time the `pet` is not of the edge, and should not alter `walkSpeed`. Here this is noted with a comment using `//`.

Positive speed walks to the right, negative to left, as the `pet.x` value is updated in the last line of the function.

Let's add one more touch of motion to warm up this castle - a nice roaring fire in the kitchen! To add this effect, you'll make a tiny change to an existing function inside of the `drawFunctions.js` file.

- Find the `drawKitchen()` function, and locate the `// draw fire` section, which looks like this:
```
// draw fire
var fireX = x + 15;
var fireY = y + 95;
fill("orange");

while (fireX < 40) {
  var flameHeight = 0;

  triangle(fireX, fireY, fireX + 10, fireY, fireX + 5, fireY - flameHeight);
  fireX += 7;
}
```
So far this code is using some *local* variables, `fireX`, `fireY`, and `flameHeight`. Local variables are defined, assigned, and used within a single code block, so these variables are not visible or available for use outside of the `drawKitchen()` function.

The part that we want to change is `flameHeight`. Right now it's set to `0`, which is why we don't see any fire.
- Change the value to `10` and see how the fire appears under the cauldron: `var flameHeight = 10;`

Another thing to notice is that the flames are created using a `while` loop. As long as the conditional statement `fireX < 40` is `true`, the contents of the loop are repeated. Notice that the value of `fireX` is updated each time it reaches the end of the loop. Eventually, `fireX` will increase until it is more than `40`, and the condition will be `false` and the loop is ended.

Since the code that assigns `flameHeight` is called again each time the loop starts, we can use it to change the value each time for a more lively fire effect. We can use a great helper function called `random()`.

- Replace `var flameHeight = 10;` with `var flameHeight = random(10,15);` and watch the flames come to life.

The two values passed to `random()` are the low and high numbers that you want it to randomly select from. So in this case the smallest a flame could be is `10`, and the biggest is `15`. Try out other values to create a bigger or smaller fire effect.


### Step 5 - Interacting with Objects
It's time to add some interaction by giving your `wizard` some spells to cast.

Let's have your `wizard` cast a spell when you click the mouse.
- At the end of `sketch.js`, add:
```
function mousePressed() {
  wizard.castSpell();
}
```
This function is automatically called when you click the mouse on the canvas.

If you look in `wizardClass.js` at the `castSpell()` function, you can see that it will use the spell assigned to `.currentSpell`. If you try the program now you won't see any change because we haven't given the `wizard` a `.currentSpell` yet.

We'll add several different spells to use, so let's next add a function that will control which one to use based on which room the `wizard` is in.

- At the end of `sketch.js`, add:
```
function updateCurrentSpell() {
  if (false) {
    wizard.currentSpell = changeOutfitSpell;

  } else {
    wizard.currentSpell = noSpell;
  }
}
```
- Inside of `draw()`, add `updateCurrentSpell();`

Because the `if` condition is currently set to `false` it will always use the final `else` statement and assign `.currentSpell` to `noSpell`. If you look in `spellFunctions.js`, you'll see that `noSpell` doesn't do anything other than have the `wizard` say `Hmmmm...`. This is exactly what we want, so that there's always a backup assigned in case none of the other `if` conditions are true.

If you change `false` to `true`, then it will always assign the `changeOutfitSpell`. If you look closely, you may see that in `updateCurrentSpell` we aren't using `()` at the end of the function names - this is intentional!

In JavaScript, the way that you *call* or *perform* a function is by adding `()` to the end (with or without arguments). But in this situation, we just want to *refer* to the function. If you look at the `castSpell()` function in `wizardClass.js` again, you can see that it first checks if `currentSpell` has a value, and if so, then it calls the function with `()`:

```
castSpell() {
  if (this.currentSpell) {
    this.currentSpell();
  }
}
```

Getting back to the `updateCurrentSpell()` function, we don't want to hardcode `true` or `false`, we want to use some code that will be `true` or `false` depending on which area of the castle the `wizard` is in, so that we cast a different spell in each room. We'll do this by adding helper functions that `return` a boolean value (`true` or `false`).

- At the end of `sketch.js`, add:
```
function inBedroom() {
  if (wizard.x < width/2 && wizard.y < height/2) {
    return true;
  } else {
    return false;
  }
}
```
Now the condition of the `if` statement is a bit more complex, so let's break it down. The first part is checking if the wizard is in the left half of the canvas, by checking if `wizard.x` is less than (`<`) half the canvas (`width/2`). If the first part is `true`, the `&&` AND operator tells it to also check if the wizard is in the top half of the canvas by checking if `wizard.y` is less than (`<`) half the canvas height (`height/2`). When both of these conditions are `true`, the entire `if` is `true`. If either one is `false`, the whole thing is `false`.

- Inside of `updateCurrentSpell()`, change the first `if` condition to call the new helper: `if (inBedroom()) {`

Try it out, and see that when `wizard` is in the bedroom area that it uses `changeOutfitSpell()` but still uses `noSpell()` everywhere else. Right now only `wizard.wandColor` is changing.

- Go into `spellFunctions.js`, and modify `changeOutfitSpell()` so that it assigns all of the other color properties to a new color using the helper `randomColor();`

Awesome, right?!

Next up, you'll need to create the 3 missing helper functions - `inStudy()`, `inKitchen()`, and `inGreatRoom()` - that we'll need to assign 3 more spells for each room - `readScrollSpell()`, `levitateBroomSpell()`, and `transformPetSpell()`.

In the study your `wizard` will cast a spell to help read the `magicScroll`:
- Inside of `spellFunctions.js`, add:
```
function readScrollSpell() {
  wizard.say("Presto inko!");
  magicScroll.inkVisibility = 255;
}
```
- Inside `sketch.js` create a new `inKitchen()` helper.

Using `inBedroom()` as your example, you can create the missing function and modify the the `if` conditions to correctly compare the `wizard` `x` and `y` values with the room location. In addition to using `<` (less than), you may also need to use `>` (greater than). Be sure to combine two conditions to ensure the `wizard` is in the correct corner of the castle.

- Add a new `else if` condition in the middle of `updateCurrentSpell()`:
```
if (inBedroom()) {
  wizard.currentSpell = changeOutfitSpell;

} else if (inStudy()) {
  wizard.currentSpell = readScrollSpell;

} else {
  wizard.currentSpell = noSpell;
}
```

When you cast your new spell in the Study, you should see a magical message appear and then disappear on the scroll. The `readScrollSpell` resets `magicScroll.inkVisibility` back to the maximum value of `255` (same as the 0 to 255 range for colors). If you look in `drawFunctions.js` at the `drawScroll()` function, you'll see that it uses 3 other properties that you can adjust: `.message`, `color`, and `disappearSpeed`.

- In `setup()`, you can add and customize the extra properties:
```
magicScroll = {
  x: 380,
  y: 50,
  message: "Hello World",
  color: color("orange"),
  disappearSpeed: 1,
}
```

In the kitchen, your `wizard` will call `levitateBroomSpell()` - why sweep when you can use magic, right?
- In `spellFunctions.js`, add:
```
function levitateBroomSpell() {
  wizard.say("Levi broomi!");
  broom.levitate = !broom.levitate;
}
```
This spell uses the `!` (bang) to toggle the boolean `true` / `false` value of `broom.levitate`. So if `broom.levitate` is currently `true`, it will be assigned to `false`, and vice versa.

- Create your `inKitchen()` helper function
- Add a new `else if` inside of `updateCurrentSpell()` and assign `wizard.currentSpell` to `levitateBroomSpell` when `
inKitchen()` is `true`

Now your `wizard` has the power to levitate and move the `broom` with the mouse.

Lastly, in the Great Room, your `wizard` will practice transforming your `pet`.
- In `spellFunctions.js`, add:
```
function transformPetSpell() {
  wizard.say("Switcha petta!");

  var petTypes = [
    "cat",
    "frog",
    "ghost"
  ]

  var newType = random(petTypes);
  var newColor = randomColor();

  pet.type = newType;
  pet.color = newColor;
}
```

Previously you used `random` to select a number value from a range, but it can also be used to randomly select an item from a list - an `Array` object. `Array`s are created by putting values inside of square brackets `[]`. `petTypes` is an array of the possible `pet` types.

- Create your `inGreatRoom()` helper
- Add a new `else if` inside of `updateCurrentSpell()` to use `transformPetSpell` when `inGreatRoom()` is `true`

### Step 6 - Celebrate!
Congratulations, you've done it! You've completed the first steps on your Code Wizard journey.

In this tutorial, you've worked with many of the fundamental building blocks of programming:
- variables
- objects
- functions
- conditional logic
- if statements
- loops

You are well on your way to becoming a Master Code Wizard. Best of luck in your future code adventures!

## Bonus Challenges
### Easier
- Make the `pet` change directions *before* it runs in the edge of the canvas so it doesn't look like it's walking into the walls.
- Further customize the appearance of your castle by modifying functions in `drawFunctions.js`

### Harder
- Add a new `pet` type by adding it to the array in `transformPetSpell()`, creating a new `drawName()` function for it, and modifying the `if` statement in `drawPet()` to call your new function
- You may have noticed that if you levitate the broom and then leave the kitchen area that the broom stays levitated while you cast other spells. Modify `updateCurrentSpell()` so that whenever `broom.levitate` is `true` the `.currentSpell` stays assigned to `levitateBroomSpell()` so that you can drop the `broom` even if you move between rooms.

## Other Resources
- p5.js Library Reference: https://p5js.org/reference/
- Video tutorial playlist by The Coding Train: https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA
