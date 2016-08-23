module.exports = function(RED) {
		
	
    function wnrTriggersNode(config) {
        RED.nodes.createNode(this,config);
		
        var node = this;
		var globalContext = this.context().global;
		var outmsg = {
						payload : "",
						topic : ""
					};
		var key = config.trigger;
		var myTrigger = globalContext.Schedules; 
		
        this.on('input', function(msg) {
			if (globalContext.Schedules==config.onmatch){
				outmsg.payload = config.onpayload;
				outmsg.topic   = config.ontopic;
				node.status({
					fill: 'green', 
					shape: 'dot', 
					text: 'match found: ' +key + ": " +myTrigger
				});
				node.send(outmsg);
		        
			}
            else if (globalContext.Schedules==config.offmatch){
				outmsg.payload = config.offpayload;
				outmsg.topic   = config.offtopic;
				node.status({
					fill: 'blue', 
					shape: 'dot', 
					text: 'match found: ' +key + ": " +myTrigger
				});				
				node.send(outmsg);
			}
			else{
				node.status({
					fill: 'red', 
					shape: 'dot', 
					text: 'match not found: ' +key + ": " +myTrigger + ": " +config.onmatch
				});
			}
			
        });
		
		
	}
    RED.nodes.registerType("wnrTriggers",wnrTriggersNode);
}


