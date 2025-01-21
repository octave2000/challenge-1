import type { Response } from "express";

interface User {
  getJwtToken: () => string;
}

const sendToken = (user: User, statusCode: number, res: Response): void => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .header("Authorization", `Bearer ${token}`)
    .json({
      success: true,
      user,
      token,
    });
};

export default sendToken;
