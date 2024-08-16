import { Button, TextField } from "@mui/material";
import { useFirebase } from "../hooks/useFirebase";

const Login = () => {
  const { login } = useFirebase();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField name="email" type="email" label="Email" required />
      <TextField name="password" type="password" label="Password" required />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
