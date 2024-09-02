const Noodl = require("@noodl/noodl-sdk");
const { useEffect } = require("react");
const { useAuth } = require("react-oidc-context");

function SetAccessToken({
    children,
    accessToken = () => { },
}) {
    const auth = useAuth();

    useEffect(() => {
        accessToken(auth?.isAuthenticated ? auth.user?.access_token : "");
    }, [auth]);

    return children;
}

const SetAccessTokenNode = Noodl.defineReactNode({
    name: "Set Access Token",
    category: "Tutorial",
    getReactComponent() {
        return SetAccessToken;
    },
    inputProps: {

    },
    outputProps: {
        accessToken: { type: "data", displayName: "Access token" },
    },
});

module.exports = { SetAccessTokenNode };
