import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Errores lanzados con { status, message }
    if (err.status && err.message) {
        return res.status(err.status).json({ message: err.message });
    }

    // Errores inesperados (DB caída, etc.) — no exponer stack trace al cliente
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Error interno del servidor" });
}