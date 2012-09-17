MulticastDelegate.js
============

This code allows you to use C# style multicast delegates within Javascript. This is useful for events that map to multiple callbacks. Using multicast delegates is a great way to do manual dependency injection for a loosely coupled framework.

This code has had very little testing and is an experiment. Use at your own risk.

Using MulticastDelegate looks something like the following:

    //Adding methods:
    myEventGenerator.onSomeEvent += function ( x , y) { console.log ( x + " and " + y " are great!"); }
    myEventGenerator.onSomeEvent += someGreatClosure;
    myEventGenerator.onSomeEvent += SomeNotSoGoodClosure;

    //Removing methods
    myEventGenerator.onSomeEvent -= SomeNotSoGoodClosure;
    
    //Executing:
    // Calls the first and second method added above with arguments 1,3. Does not call the third as it has been removed.
    myEventGenerator.onSomeEvent( 1, 3 ); 


    

    // Adding a multicast delegate to your object:

    function SomeEventGenerator()
    {
      //Adds this.onEvent and this.onEvent2
      MulticastDelegate(this, "onEvent"); 
      MulticastDelegate(this, "onEvent2" );
    }

There you have it, neat C# style assignment for multicast delegates. This should work on all browsers. It may give you a bug in debug mode if you pause the code and get .toString prints between assignment. Operator overload hacking in JS usually has one problem or another. I have a few ideas about how to fix this later.