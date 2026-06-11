import { useState, useEffect } from "react";
import { getMe } from "@/services/auth.service";
import type { ProfileResponse } from "@/types/auth";

type ProfileData = ProfileResponse["data"];

interface UseProfileReturn {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMe();
      setProfile(data);
    } catch (err: unknown) {
      console.error("Failed to fetch profile:", err);
      setError("Gagal memuat data profil.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, isLoading, error, refetch: fetchProfile };
}
