import type { Request, Response } from 'express'; 
import { AuthService } from '../service/authService.js'; 
import { ZodError } from 'zod'; 

const authService = new AuthService(); 

export class AuthController {


  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await authService.login(req.body);
      
      res.status(200).json({ 
        message: 'Login Berhasil', 
        status: 'success', 
        ...result 
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Validasi gagal", 
          errors: error.issues.map(err => ({ 
            field: err.path[0], 
            message: err.message 
          })) 
        });
        return;
      }
      res.status(401).json({ message: error.message || "Terjadi kesalahan server" });
    }
  };



  getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      
      if (!req.user) {
        res.status(401).json({ status: "fail", message: "Tidak ada otorisasi" });
        return;
      }

    
      const userProfile = await authService.getProfile(req.user.userId);

      res.status(200).json({
        status: "success",
        message: "Akses diterima",
        data: userProfile
      });
    } catch (error: any) {
      res.status(404).json({
        status: "fail",
        message: error.message || "Gagal mengambil data profil"
      });
    }
  };


}
