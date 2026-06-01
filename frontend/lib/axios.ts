import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

// ─────────────────────────────────────────────
// TOKEN HELPERS
// ─────────────────────────────────────────────

export const setAccessToken = (token: string | null) => {
    if (typeof window === "undefined") return;
    if (token) {
        localStorage.setItem("jwtToken", token);
        document.cookie = `jwtToken=${token}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
    } else {
        localStorage.removeItem("jwtToken");
        document.cookie = "jwtToken=; path=/; max-age=0";
    }
};

export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("jwtToken");
};

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

export const setUserRole = (role: string | null) => {
    if (typeof window === "undefined") return;
    if (role) {
        document.cookie = `userRole=${role}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
    } else {
        document.cookie = "userRole=; path=/; max-age=0";
    }
};

export const getUserRole = (): string | null => {
    if (typeof window === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)userRole=([^;]*)/);
    return match ? match[1] : null;
};

export const clearAuth = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);
};

// ─────────────────────────────────────────────
// REQUEST INTERCEPTOR — lampirkan access token
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// REFRESH TOKEN MUTEX
// Mencegah race condition: hanya 1 refresh yang berjalan sekaligus.
// Semua request 401 lain akan menunggu (antri) hingga refresh selesai.
// ─────────────────────────────────────────────

let isRefreshing = false;
let refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token!);
    });
    refreshQueue = [];
};

// ─────────────────────────────────────────────
// RESPONSE INTERCEPTOR — auto-refresh saat 401
// ─────────────────────────────────────────────

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // Bukan 401 atau sudah pernah di-retry → lempar error langsung
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        // Tidak ada refresh token di localStorage
        // → "Keep me logged in" tidak dicentang, sesi berakhir → redirect ke login
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            clearAuth();
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }

        // Refresh sedang berjalan oleh request lain → antri dan tunggu hasilnya
        if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            })
                .then((newAccessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        // Jalankan refresh (hanya 1 request yang boleh masuk ke blok ini)
        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
                { refreshToken }
            );

            const {
                accessToken,
                refreshToken: newRefreshToken,
            } = refreshResponse.data;

            setAccessToken(accessToken);
            if (newRefreshToken) {
                setRefreshToken(newRefreshToken);
            }

            // Beritahu semua request yang sedang menunggu di antrian
            processQueue(null, accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            // Refresh gagal → beritahu semua antrian, lalu logout
            processQueue(refreshError, null);
            clearAuth();
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;