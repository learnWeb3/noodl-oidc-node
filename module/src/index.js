const Noodl = require('@noodl/noodl-sdk');
const { AuthenticatedProviderNode } = require('./components/AuthenticatedProvider');
const { LogoutNode } = require('./components/Logout');
const { SetCurrentUserNode } = require('./components/SetCurrentUser');
const { SetAccessTokenNode } = require('./components/SetAccessToken');
const { LoginNode } = require('./components/Login');
const { AuthenticatedGuardNode } = require('./components/AuthenticatedGuard');



Noodl.defineModule({
	reactNodes: [
		AuthenticatedProviderNode,
		AuthenticatedGuardNode,
		SetCurrentUserNode,
		SetAccessTokenNode,
		LogoutNode,
		LoginNode
	],
	nodes: [

	],
	setup() {
		//this is called once on startup
	}
});