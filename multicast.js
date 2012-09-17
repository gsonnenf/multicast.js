function MulticastDelegate( context, name ) {

    var delegate = function() { delegate.execute.apply( delegate, arguments ); };

     delegate.callbackList = [];
 	delegate.context = context;

 	delegate.addCallback = addCallback;
 	delegate.removeCallback = removeCallback;
 	delegate.execute = execute;
 	delegate.toString = toString;

 	
 	if (name)
 	{
 		delegate.context.__defineGetter__(name, getter.bind(delegate) );
 		delegate.context.__defineSetter__(name, setter.bind(delegate) );
 	}
 	else 
 	{
 		//need to find a good hack for assignment here.
 	}
    return delegate;   
	
	function addCallback(fn) { this.callbackList.push(fn); }
  
    function removeCallback(fn) 
    {
        var index;
        index = this.callbackList.indexOf(fn);
        if (index > -1) { this.callbackList.splice(index, 1); }
    }
    
    function execute() 
    {
        var callbackList = this.callbackList, len = callbackList.length, i; 
        for (i = 0; i < len; ++i) { callbackList[i].apply(this.context, arguments); }    
    }
    
    function getter() { return this; }
    
    function setter( fn ) 
    { 
    	console.log(fn);
    	if (fn == 1) this.addCallback(this.callbackReference);
    	else if (fn == -1) this.removeCallback(this.callbackReference);
    	else throw "You may only use the += and -= operators with multicast delegate."
    }
     
    function toString() { 
    	var delegator = this; 	
    	// do not debug in the middle of this code.
    	if (!Function.prototype.toStringBackup) Function.prototype.toStringBackup = Function.prototype.toString;
    	Function.prototype.toString = function () {
    		delegator.callbackReference = this;
    		Function.prototype.toString = Function.prototype.toStringBackup;
    		return 1;    		
    	}     	   	
    	return 0; 
    }
 
}
    
function TestWidget() { 	
	
	MulticastDelegate(this, "onEvent"); 
	MulticastDelegate(this, "onEvent2" );
	
	//does not work yet
	this.onEvent3 = MulticastDelegate(this);
    
	//some test code for scope.
	var scope = "Your method has bad scope";
    func = function (a) { "onEvent scope test: " + alert(scope);}
    scope = "Your closure is working properly.";
}
scope = "your method has bad scope."


var myWidget = new TestWidget();

myWidget.onEvent += func;
myWidget.onEvent += function(txt) { alert("onEvent msg2:" + txt);  };
myWidget.onEvent("success?");

myWidget.onEvent2 += function(txt) { alert("onEvent2a: " + txt);  };
myWidget.onEvent2 += function(txt) { alert("onEvent2b: " + txt);  };
myWidget.onEvent2("success?");

myWidget.onEvent3 += function(txt) {alert("onevent3: probably not working yet");}
	