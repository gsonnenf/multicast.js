multicastDelegate.js
============

This code allows you to use C# style multicast delegates within Javascript. This is useful for events that map to multiple callbacks. Using multicast delegates is a great way to do manual dependency injection for a loosely coupled framework.

Using MulticastDelegate looks something like the following:

    //Adding methods:
    myEventGenerator.onSomeEvent += function ( x , y) { console.log ( x + " and " + y " are great!"); }
    myEventGenerator.onSomeEvent += someGreatClosure;
    myEventGenerator.onSomeEvent += SomeNotSoGoodClosure;

    //Executing:
    myEventGenerator.onSomeEvent( 1, 3 ); // Calls the top 3 methods with parameter 1,3


    // Subtracting methods
    myEventGenerator.onSomeEvent -= SomeNotSoGoodClosure;

    // Adding a multicast delegate to your object:

    function SomeEventGenerator()
    {
      //Adds this.onEvent and this.onEvent2
      MulticastDelegate(this, "onEvent"); 
      MulticastDelegate(this, "onEvent2" );
    }

There you have it, neat C# style assignment for multicast delegates. This should work on all browsers. It may give you a bug in debug mode if you pause the code and get .toString prints between assignment. Operator overload hacking in JS usually has one problem or another. I have a few ideas about how to fix this later.