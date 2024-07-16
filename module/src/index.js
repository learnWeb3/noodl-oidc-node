const Noodl = require('@noodl/noodl-sdk');
const { AuthenticatedNode } = require('./components/Authenticated');
const { LogoutNode } = require('./components/Logout');



Noodl.defineModule({
	reactNodes: [
		AuthenticatedNode,
		LogoutNode
	],
	nodes: [

	],
	setup() {
		//this is called once on startup
	}
});