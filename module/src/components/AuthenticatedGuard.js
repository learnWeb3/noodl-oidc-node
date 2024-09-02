const Noodl = require("@noodl/noodl-sdk");
const { useEffect, useState } = require("react");
const { useAuth } = require("react-oidc-context");
const jsonpath = require("jsonpath");
const { jwtDecode } = require('jwt-decode');

function AuthenticatedGuard({
    children,
    role_claim_json_path = "roles",
    required_roles = "",
    hasResourceAccess = () => { },
}) {
    const auth = useAuth();
    const [decoded, setDecoded] = useState(null);
    const [hasAccess, setHasAccess] = useState(false)
    const [requiredRoles, setRequiredRoles] = useState([]);

    useEffect(() => {
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

    return children
}


const AuthenticatedGuardNode = Noodl.defineReactNode({
    name: "AuthenticatedGuard",
    category: "Tutorial",
    getReactComponent() {
        return AuthenticatedGuard;
    },
    inputProps: {
        role_claim_json_path: {
            type: 'string',
            default: "resource_access.test.roles",
            displayName: 'Role Claim JSON Path'
        },
        required_roles: {
            type: 'string',
            default: "admin",
            displayName: 'Required roles (comma separated string)'
        }

    },
    outputProps: {
        hasResourceAccess: { type: "data", displayName: "Has Resource access" },
    },
});

module.exports = { AuthenticatedGuardNode };
