import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {

    const response = await axios.post("http://localhost:3000/api/v1/login", {
      email,
      password,
    });

    const token = response.data.token;

    const res = NextResponse.json({ success: true });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Login failed" },
      { status: 400 }
    );
  }
}
