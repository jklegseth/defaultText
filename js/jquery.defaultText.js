/*
 * jQuery DefaultText Plugin 1.0
 * www.klegseth.com
 * Copyright 2012, Junior Klegseth (klegseth.com)
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function($) {
  "use strict";
  $.fn.defaultText = function(options) {
    /*---------------------------
     Default options
    ----------------------------*/
    var defaults = {  
      attr: "data-default-text",  //the attribute to use the input's default text
      defaultClass: "",           //this class will be added to the element when its val === default, removed when changed
      changedClass: "",            //this class will be added to the element when its val !== default, removed if return to default
      activeClass: ""             //set when the input is focused
    }; 
      
    //Extend
    options = $.extend({}, defaults, options); 

    return this.each(function() {      
      /*---------------------------
       Global Variables
      ----------------------------*/
      var $this = $(this),
          defaultText;

       /*---------------------------
       Get/set values
      ----------------------------*/
      //store the default text
      defaultText = $this.attr(options.attr);

      /*---------------------------
       Our logic
      ----------------------------*/
      //get our current val()
      var currentValue = function() {
        return $this.val() && $.trim($this.val());
      };

      //returns a boolean for empty or === default text
      var isDefaultOrEmpty = function() { 
        return currentValue().length === 0 || currentValue() === $this.attr(options.attr);
      };

      //utility that clears default text on focus, but only if default
      var doEditMode = function() {
        $this.addClass(options.activeClass);
        if (isDefaultOrEmpty()) { 
          $this.val('');
        }
      };

      //our main worker, checks states, adds text or not, and applies CSS classes
      var doDefaultText = function() {
        //if default or empty, restore default text and add css class, if any
        if (isDefaultOrEmpty()) {
          $this.val(defaultText).removeClass(options.changedClass + ' ' + options.activeClass).addClass(options.defaultClass);
        } else {
          $this.removeClass(options.defaultClass + ' ' + options.activeClass).addClass(options.changedClass);
        }
      };

      doDefaultText();

      /*---------------------------
       Event handlers
      ----------------------------*/
      $this.on('focus.defaultText', doEditMode);
      $this.on('blur.defaultText', doDefaultText);

    });
  };
})(jQuery);