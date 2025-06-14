
import { jwtDecode } from 'jwt-decode';

import { redirect } from 'react-router-dom';

interface TokenPayload {
    id: string;
    role?: string;
}

export const AuthLoader = () => {
    const frontendToken = localStorage.getItem("frontendToken");
 
    if (frontendToken) {
        try {
            const decoded: TokenPayload = jwtDecode(frontendToken);
            if (decoded?.id && decoded?.role === "user") {
               
                throw redirect(`/user/${decoded.id}`);
            }
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            console.error("User token decode error:", error);
            localStorage.removeItem("FUToken");
        }
    }
    
    // Check partner token
    if (frontendToken) {
        try {
            const decoded: TokenPayload = jwtDecode(frontendToken);
            if (decoded?.id && decoded?.role === "partner") {
             
                throw redirect(`/partner/${decoded.id}`);
            }
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            console.error("Partner token decode error:", error);
            localStorage.removeItem("PFToken");
        }
    }

    // Check affiliate token
    if (frontendToken) {
        try {
            const decoded: TokenPayload = jwtDecode(frontendToken);
            if (decoded?.id && decoded?.role === "affiliate") {
              
                throw redirect(`/affiliate/${decoded.id}`);
            }
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            console.error("Affiliate token decode error:", error);
            localStorage.removeItem("AFToken");
        }
    }

    // Check admin token
    if (frontendToken) {
        try {
            const decoded: TokenPayload = jwtDecode(frontendToken);
            if (decoded?.id && decoded?.role === "admin") {
              
                throw redirect(`/admin/${decoded.id}`);
            }
        } catch (error) {
            if (error instanceof Response) {
                throw error;
            }
            console.error("Admin token decode error:", error);
            localStorage.removeItem("ADFToken");
        }
    }

    // No valid tokens found, allow access to initial page
    return null;
}