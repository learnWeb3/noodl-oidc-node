const Noodl = require("@noodl/noodl-sdk");
const { useAuth } = require("react-oidc-context");

const Logout = ({ children, onClick }) => {

    const auth = useAuth();
    return (
        <div style={{ border: 'none', width: '100%', height: '100%' }} onClick={() => {
            auth.signoutRedirect()
            onClick()
        }}>{children}</div>
    );
};

const LogoutNode = Noodl.defineReactNode({
    name: "Logout action",
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