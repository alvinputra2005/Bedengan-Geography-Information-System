export function getUserRole(user) {
    return user?.role?.name ?? null;
}

export function hasRequiredRole(user, roles = []) {
    if (!user) {
        return false;
    }

    if (roles.length === 0) {
        return true;
    }

    return roles.includes(getUserRole(user));
}

export function getDefaultPrivateRoute(user) {
    return getUserRole(user) === 'admin' ? '/admin' : '/dashboard';
}
