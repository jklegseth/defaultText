#jQuery defaultText Plugin
=========================
jQuery plugin that handles default values for text inputs using a *data-* attribute.

##Usage
=========================
**Please** don't use this to replace labels. For accessibility I recommend using this as an enhancement for JavaScript enabled users, not as the default treatment. 

There are three primary uses for this plugin:

1. To offer helpful, but non-essential text.
2. To persist default text if a user clears out a field where the value was the default text. 
3. It can be a progressive enhancement in tight spaces, by allowing you to delete labels.

A nice side effect is the ability to toggle CSS classes for default text, changed text and currently editing text.

To use it, simply set the attribute *data-default-text*. Here is an example of #1 above:
    
    <label for="zip">Your Zip Code</label>
    <input type="text" value="" name="fname" data-default-text="12345 or 12345-6789" />

In this case we've simply added a helpful hint to make the form easier to complete. "12345 or 12345-6789" will persist if the user leaves the field empty but is removed when the user clicks into the field.

Here is an example of #2. For redundancy I put the text in the *value* attribute as well, meaning users without JavaScript will see the text when they load the page.

    <input type="text" value="Please enter your first name" name="fname" data-default-text="Please enter your first name" />

Without the plugin, once the user deletes the text once, they have an empty textbox. The plugin simply keeps the default text in play until it has been changed.

And here is an example of #3. We start the same code as above:
    
    <label for="zip">Your Zip Code</label>
    <input type="text" value="" name="fname" data-default-text="Please enter your zip code" />

And then in our JavaScript we hide the labels (if JavaScript is disabled, the user sees the label):

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