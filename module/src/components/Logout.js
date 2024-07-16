const Noodl = require("@noodl/noodl-sdk");
const { useAuth } = require("react-oidc-context");

const Logout = ({ children, onClick }) => {

    const auth = useAuth();
    return (
        <div style={{ border: 'none' }} onClick={() => {
            auth.revokeTokens();
            void auth.removeUser()
            onClick()
        }}>{children}</div>
    );
};

const LogoutNode = Noodl.defineReactNode({
    name: "Logout",
    category: "Tutorial",
    getReactComponent() {
        return Logout;
    },
    inputProps: {

        // backgroundColor: { type: "color", default: "white" },
        // marginBottom: {
        //     type: { name: "number", units: ["px"], defaultUnit: "px" },
        //     default: 10,
        // },
    },
    outputProps: {
        onClick: { type: "signal", displayName: "Click" },
    },
});

module.exports = { LogoutNode };