const Noodl = require("@noodl/noodl-sdk");
const { useEffect, useState } = require("react");
const { AuthProvider, useAuth } = require("react-oidc-context");
const jsonpath = require("jsonpath");
const { jwtDecode } = require('jwt-decode');

function AuthenticatedGuard({
    children,
    role_claim_json_path = "roles",
    required_roles = "",
    currentUser = () => { },
    hasResourceAccess = () => { },
}) {
    const auth = useAuth();
    const [decoded, setDecoded] = useState(null);
    const [hasAccess, setHasAccess] = useState(false)
    const [requiredRoles, setRequiredRoles] = useState([]);

    useEffect(() => {
        currentUser(auth.isAuthenticated ? auth?.user?.profile?.sub : "");

        if (auth?.isAuthenticated && auth.user?.access_token) {
            const accessToken = auth.user.access_token;
            setDecoded(jwtDecode(accessToken));
            setRequiredRoles(required_roles.split(",").filter((e) => e));
        }
    }, [auth]);

    // useEffect(() => {
    //     console.log(decoded)
    // }, [decoded])


    // useEffect(() => {
    //     console.log(requiredRoles)
    // }, [requiredRoles])


    useEffect(() => {
        // console.log(`Has Access: ${hasAccess}`)
        hasResourceAccess(hasAccess)
    }, [hasAccess])

    useEffect(() => {
        if (decoded && requiredRoles?.length > 0) {
            try {
                const currentRoles = jsonpath.query(decoded, role_claim_json_path)?.[0] || [];
                if (!currentRoles?.length) {
                    return;
                }
                const decodedRolesMap = currentRoles.reduce((map, role) => {
                    map[role] = true;
                    return map;
                }, {});
                for (const role of requiredRoles) {
                    if (decodedRolesMap[role]) {
                        setHasAccess(true);
                        return;
                    }
                }
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        } else if (decoded && !requiredRoles?.length) {
            setHasAccess(true);
            return;
        }
    }, [requiredRoles, decoded]);

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth?.isAuthenticated) {

        return children;
    } else {
        return auth.signinRedirect();
    }
}

const AuthenticatedProvider = ({
    children,
    authority = "http://localhost:9000/realms/test",
    client_id = "test",
    redirect_uri = "http://localhost:8574/test",

}) => {
    const onSigninCallback = (_user) => {
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    return (
        <AuthProvider
            authority={authority}
            client_id={client_id}
            redirect_uri={redirect_uri}
            onSigninCallback={onSigninCallback}
        >

            {children}

        </AuthProvider>
    );
};

const AuthenticatedProviderNode = Noodl.defineReactNode({
    name: "Oidc Authentication Provider",
    category: "Tutorial",
    getReactComponent() {
        return AuthenticatedProvider;
    },
    inputProps: {
        authority: {
            type: "string",
            default: "http://localhost:9000/realms/test",
            displayName: "Authority",
        },
        client_id: { type: "string", default: "test", displayName: "Cliend ID" },
        redirect_uri: {
            type: "string",
            default: "http://localhost:8574",
            displayName: "Redirect URI",
        },
        audience: { type: "string", default: "test", displayName: "Audience" },
        role_claim_json_path: {
            type: "string",
            default: "roles",
            displayName: "Role Claim",
        },
        required_roles: {
            type: "string",
            default: "",
            displayName: "Required Roles",
        },
    },
    outputProps: {
        currentUser: { type: "data", displayName: "Current User" },
        hasResourceAccess: { type: "data", displayName: "Has Resource access" },
    },
});

module.exports = { AuthenticatedProviderNode };
