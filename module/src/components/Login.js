const Noodl = require("@noodl/noodl-sdk");
const { useAuth } = require("react-oidc-context");

const Login = ({ children, onClick }) => {

    const auth = useAuth();
    return (
        <div style={{ border: 'none', width: '100%', height: '100%' }} onClick={() => {
            auth.signinRedirect();

        }}>{children}</div>
    );
};

const LoginNode = Noodl.defineReactNode({
    name: "Login action",
    category: "Tutorial",
    getReactComponent() {
        return Login;
    },
    inputProps: {
    },
    outputProps: {
    },
});

module.exports = { LoginNode };