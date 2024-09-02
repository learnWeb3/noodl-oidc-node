const Noodl = require("@noodl/noodl-sdk");
const { useEffect } = require("react");
const { useAuth } = require("react-oidc-context");

function SetCurrentUser({
    children,
    currentUser = () => { },
}) {
    const auth = useAuth();

    useEffect(() => {
        currentUser(auth?.isAuthenticated ? auth?.user?.profile?.sub : "");
    }, [auth]);

    return children;
}

const SetCurrentUserNode = Noodl.defineReactNode({
    name: "Set Current User",
    category: "Tutorial",
    getReactComponent() {
        return SetCurrentUser;
    },
    inputProps: {

    },
    outputProps: {
        currentUser: { type: "data", displayName: "Current User" },
    },
});

module.exports = { SetCurrentUserNode };
