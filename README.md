#jQuery defaultText Plubin
=========================
jQuery plugin that handles default values for text inputs using a *data-* attribute.

##Usage
=========================
**Please** don't use this to replace labels. For accessibility I recommend using this as an enhancement for JavaScript enabled users, not as the default treatment. 

There are three primary uses for this plugin:

1. To offer helpful, but non-essential text, especially useful in tight spaces.
2. To persist default text if a user clears out a field where the value was the default text. 
3. It can be a progressive enhancement in tight spaces, by allowing you to delete labels.

A nice side effect is the ability to toggle CSS classes for default text, changed text and currently editing text.

To use it, simply set the attribute *data-default-text*. Here is an example of #1 above:
    
    <label for="zip">Your Zip Code</label>
    <input type="text" value="" name="fname" data-default-text="12345 or 12345-6789" />

In this case we've simply added a helpful hint to make the form easier to complete.

Here is an example of #2. for redundancy I put the text in the *value* attribute as well, meaning users without JavaScript will see the text up until they delete/edit it:

    <input type="text" value="Please enter your first name" name="fname" data-default-text="Please enter your first name" />

Without the plugin, once the user deletes the text once, they have an empty textbox. The plugin simply keeps the default text in play until it has been changed.

And here is an example of #3. We start the same code as above:
    
    <label for="zip">Your Zip Code</label>
    <input type="text" value="" name="fname" data-default-text="Please enter your zip code" />

And then in our JavaScript we hide the labels ( if JavaScript is disabled, the user sees the label):

    <script type="text/javascript">
      $('label').hide();
         $('[data-default-text]').defaultText({
           defaultClass: 'default',
           activeClass: 'active',
           changedClass: 'changed'
         });
    </script>


##Options
=========================
**attr**: The attribute to use for default text.

**defaultClass**: The CSS class to apply to form inputs that are empty or contain the default text

**changedClass**: The CSS class to apply to form inputs that are not empty and not the default text

**activeClass**:  The CSS class to apply when a form input has focus

**callback**: A callback function can be supplied as the only or as the second argument:

    $(this).toggleText({...options...}, callback);
    //OR
    $(this).toggleText(callback);

##Full Usage Example
=========================
    <script type="text/javascript">
      $('.toggle').on('click', function(event){
        $(this).toggleText({
          attr: '',               //not necessary to pass empty string, just here to show usage
          defaultText: 'Hello',
          toggleText: 'Goodbye',
          toggleClass: 'toggled',
          force: 'default'        //this would force the text for this element to always be default, or "Hello"
        }, function(){
          //do something
        });
      });
    </script>

##More Detail
=========================
The simple case is a link that expands/collapses content. Generally this is all handled in JavaScript:

    <style type="text/css">
      .list { display: none; }
    </style>
    <div>
      <a href="#" class="toggle">Show Scores</a>
      <ul class="list scores">
        <li>Kentucky 47, Iowa 43</li>
        <li>Wisconsin 12, Alabama 74</li>
      </ul>
    </div>

    <script type="text/javascript">
      $('.toggle').on('click', function(event) {
        var changeTextTo = $(this).text() === 'Show Scores' ? 'Hide Scores' : 'Show Scores';
        $(this).text(changeTextTo).next('.list').toggle();
        event.preventDefault();
      });
    </script>

There's nothing terribly wrong with that, although we are setting content (text) inside our JavaScript. But consider the same example  with multiple a.toggle elements needing slightly different text:

    <style type="text/css">
      .list { display: none; }
      div { margin: 15px 0; }
    </style>
    <div>
      <a href="#" class="toggle scores">Show Scores</a>  <!-- needs to toggle to Hide Scores -->
      <ul class="list scores">
        <li>Kentucky 47, Iowa 43</li>
        <li>Wisconsin 12, Alabama 74</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle stats">Show Stats</a>  <!-- needs to toggle to Hide Stats -->
      <ul class="list stats">
        <li>Roger Doe 14pts, 5 rebounds</li>
        <li>Don Was 37 pts, 8 rebounds, 2 assists</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle records">Show Records</a>  <!-- needs to toggle to Hide Records -->
      <ul class="list records">
        <li>Kentucky 4-1-1</li>
        <li>Wisconsin 1-5-0</li>
        <li>Texas 2-3</li>
      </ul>
    </div>

Now a simple operation becomes more of a pain. 

    <script type="text/javascript">
      $('div').on('click', '.toggle', function(event) {
        var changeTextTo;
        if ($(this).is('.scores')) {
          changeTextTo = $(this).text() === 'Show Scores' ? 'Hide Scores' : 'Show Scores';
        } else if ($(this).is('.stats')) {
          changeTextTo = $(this).text() === 'Show Stats' ? 'Hide Stats' : 'Show Stats';
        } else if ($(this).is('records')) {
          changeTextTo = $(this).text() === 'Show Records' ? 'Hide Records' : 'Show Records';
        }
        $(this).text(changeTextTo).next('.list').toggle();
        event.preventDefault();
      });
    </script>

That's getting ugly. And anytime a new *a.toggle* is added you're back to your JavaScript to hard code some text values. Using *toggleText* we move the content back to the HTML using a *data-* attribute: *data-toggle-text*:

    <style type="text/css">
      .list { display: none; }
      div { margin: 15px 0; }
    </style>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Scores|Hide Scores">Show Scores</a>
      <ul class="list scores">
        <li>Kentucky 47, Iowa 43</li>
        <li>Wisconsin 12, Alabama 74</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Stats|Hide Stats">Show Stats</a>
      <ul class="list stats">
        <li>Roger Doe 14pts, 5 rebounds</li>
        <li>Don Was 37 pts, 8 rebounds, 2 assists</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Records|Hide Records">Show Records</a>
      <ul class="list records">
        <li>Kentucky 4-1-1</li>
        <li>Wisconsin 1-5-0</li>
        <li>Texas 2-3</li>
      </ul>
    </div>

And in the JS:

    <script type="text/javascript">
      $('.toggle').on('click', function(event) {
        $(this).toggleText().next('ul').toggle();
        event.preventDefault();
      });
    </script>

By default, *toggleText* looks for the *data-toggle-text* attribute, expecting a pipe-delimited list of two values:

    data-toggle-text="Hello|Goodbye"

The first value should also be the default text already inside of this element, the second value is the toggled text to show on click. The JavaScript is now kept out of the content business and sticks to behavior.

You don't have to use the *data-toggle-test* attribute however. You can pass in *defaultText* and *toggleText* options that will serve the same purpose (they also override the *data-toggle-text* attribute if set):

    <div>
      <a href="#" class="toggle">Show</a>
      <ul class="list scores">
        <li>Kentucky 47, Iowa 43</li>
        <li>Wisconsin 12, Alabama 74</li>
      </ul>
    </div>

    <script type="text/javascript">
      $('.toggle').on('click', function(event) {
        $(this).toggleText({ defaultText: 'Show', toggleText: 'Hide'}).next('.list');
        event.preventDefault();
      });
    </script>

###Using the *force* option
=========================
Expanding on the example above, suppose we want all the sections plus a top level link for Show All | Hide All:

    <style type="text/css">
      .list { display: none; }
      div { margin: 15px 0; }
    </style>
    <a href="#" class="toggle-all" data-toggle-text="Show All|Hide All">Show All</a>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Scores|Hide Scores">Show Scores</a>
      <ul class="list scores">
        <li>Kentucky 47, Iowa 43</li>
        <li>Wisconsin 12, Alabama 74</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Stats|Hide Stats">Show Stats</a>
      <ul class="list stats">
        <li>Roger Doe 14pts, 5 rebounds</li>
        <li>Don Was 37 pts, 8 rebounds, 2 assists</li>
      </ul>
    </div>
    <div>
      <a href="#" class="toggle" data-toggle-text="Show Records|Hide Records">Show Records</a>
      <ul class="list records">
        <li>Kentucky 4-1-1</li>
        <li>Wisconsin 1-5-0</li>
        <li>Texas 2-3</li>
      </ul>
    </div>

We still use the *a.toggle* click handler as we did above, but the Show All needs to do more. Clicking *a.toggle-all* should:

* Toggle its text between *Show All* and *Hide All*
* Toggle all *a.toggle* to match, i.e., if a.toggle-all text is Show All, all a.toggle should be Show <text>
* All ul.list should be shown

Here's how we can do that with the code above:

    <script type="text/javascript">
      //our callback function; $this will be our jQuery object
      var toggleSections = function($this) {
        return function() {
          //use our toggleClass option to get state
          if ($this.hasClass('toggled')) {
            $('.list').show();
            //use the *force* option to turn all a.toggle text to the toggled text
            $('.toggle').toggleText({ force: 'toggle'});
          } else {
            $('.list').hide();
            //use the *force* option to turn all a.toggle text to the default text
            $('.toggle').toggleText({ force: 'default'});
          }
        };
      };

      //click handler
      $('body').on('click', 'a', function(event){
        var $this = $(event.target);

        //handles the a.toggle clicks
        if ($this.is('.toggle')) {
          $(this).toggleText().next('ul').toggle();

        //handles the a.toggle-all
        } else if ($this.is('.toggle-all')) {
          //toggle the text for this element and set a class, then use the callback to handle all the a.toggle
          $(this).toggleText({ toggleClass : 'toggled'}, toggleSections($(this)));
        }
        event.preventDefault();
      });
    </script>

The advantage of *force* is that is uses the default and toggle states already in the *data-toggle-text* attribute, so any changes in the markup are immediately handled. And while the callback function still requires some work, since the text is different for each a.toggle, you'd need to use $.each to set them individually, whereas toggleText lets you set them simplyREA