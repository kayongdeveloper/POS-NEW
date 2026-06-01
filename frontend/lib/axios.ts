import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";



export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true

});


/**
 * GET ACCESS TOKEN
 */

export const setAccessToken = (token: string | null) => {
    if (typeof window === 'undefined') return;
    if (token) {
        localStorage.setItem('jwtToken', token);
        // Simpan ke cookie agar bisa dibaca oleh Next.js middleware (server-side)
        document.cookie = `jwtToken=${token}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`; // 7 hari
    } else {
        localStorage.removeItem('jwtToken');
        // Hapus cookie
        document.cookie = 'jwtToken=; path=/; max-age=0';
    }
}

/**
 * GET ACCESS TOKEN
 */

export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("jwtToken");
};

/**
 * SET REFRESH TOKEN
 */
export const setRefreshToken = (token: string | null) => {
    if (typeof window === "undefined") return;

    if (token) {
        localStorage.setItem("refreshToken", token);
    } else {
        localStorage.removeItem("refreshToken");
    }
};

export const getRefreshToken = (): string | null => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("refreshToken");
};

/**
 * SET / CLEAR USER ROLE (cookie untuk dibaca middleware)
 */
export const setUserRole = (role: string | null) => {
    if (typeof window === 'undefined') return;
    if (role) {
        document.cookie = `userRole=${role}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
    } else {
        document.cookie = 'userRole=; path=/; max-age=0';
    }
};

export const getUserRole = (): string | null => {
    if (typeof window === 'undefined') return null;
    const match = document.cookie.match(/(?:^|;\s*)userRole=([^;]*)/);
    return match ? match[1] : null;
};

/**
 * CLEAR AUTH
 */
export const clearAuth = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);
};

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();

                if (!refreshToken) {
                    throw new Error("Refresh token not found");
                }

                /**
                 * Sesuaikan endpoint refresh backend
                 */
                const refreshResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {
                        refreshToken,
                    }
                );

                /**
                 * Jika backend return:
                 * {
                 *   accessToken,
                 *   refreshToken
                 * }
                 */
                const {
                    accessToken,
                    refreshToken: newRefreshToken,
                } = refreshResponse.data;

                setAccessToken(accessToken);

                if (newRefreshToken) {
                    setRefreshToken(newRefreshToken);
                }

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                clearAuth();

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;