"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../config/firebase";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { createSession } from "@/actions/auth-actions";


interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        await createSession(data.email);
      } else {
        if (data.password !== data.confirmPassword) {
          console.error("Passwords do not match");
          return;
        }
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in/up:", error);
    }
  };

  const signInWithProvider = async (
    provider: typeof googleAuthProvider | typeof facebookAuthProvider
  ) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result || !result.user) {
        throw new Error("Sign in failed");
      }
      await createSession(result.user.uid)
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with provider:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        className="bg-slate-50"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" className="font-bold text-blue-900">
          {isLogin ? "Welcome Back 😊" : "Sign Up"}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          method="POST"
        >
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          {!isLogin && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword", { required: true })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? "Confirm Password is required" : ""
              }
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => signInWithProvider(googleAuthProvider)}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => signInWithProvider(facebookAuthProvider)}
            sx={{ mt: 1 }}
          >
            <FacebookOutlinedIcon />
            Login with Facebook
          </Button>
        </Box>
        <Box mt={2}>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an Account" : "Already have an account? Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
