import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Stack,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import SearchBar from "./SearchBar";
import { useSignIn } from "../utils/GlobalSignInState";

import { logo } from "../utils/constants";

import { Supabase } from "../config/Supabase";

// --------------------------------------------------------------------------------------------------------------------

export type NavbarProps = {};

const Navbar: FC<NavbarProps> = (props) => {
  const { ...other } = props;

  const { isSignIn, setIsSignIn } = useSignIn();

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      if(localStorage.getItem("sb-jnzgpxiezxwmetjcgvil-auth-token") !== null) setIsSignIn(true)
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [isSignIn]);

  const handleSignUp = async () => {
    let { error } = await Supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: username,
        },
        emailRedirectTo: "http://localhost:3000",
      },
    });

    if (!error) {
      setUsername("");
      setEmail("");
      setPassword("");
      alert("We have provided a varification mail to your mail box");
      setSignUpOpen(false);
    }
  };

  const handleDSignIn = async () => {
    let { error } = await Supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!error) {
      setEmail("");
      setPassword("");
      setIsSignIn(true);
      setSignInOpen(false);
    }
  };

  const handleSignOut = async () => {
    let { error } = await Supabase.auth.signOut();

    if (!error) {
      setIsSignIn(false);
      setSignOutOpen(false);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
      {...other}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
      <Box>
        {isSignIn ? (
          <button className="signOut-btn" onClick={() => setSignOutOpen(true)}>
            SignOut
          </button>
        ) : (
          <div>
            <button className="signUp-btn" onClick={() => setSignUpOpen(true)}>
              SignUp
            </button>
            <button className="signUp-btn" onClick={() => setSignInOpen(true)}>
              SignIn
            </button>
          </div>
        )}
      </Box>
      <Dialog open={signUpOpen} onClose={() => setSignUpOpen(false)}>
        <DialogTitle className="green">SignUp</DialogTitle>
        <DialogContent className="auth-dialog">
          You can signUp with your email
          <TextField
            type="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <button className="signUp-btn" onClick={handleSignUp}>
            SignUp
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={signInOpen} onClose={() => setSignInOpen(false)}>
        <DialogTitle className="green">SignIn</DialogTitle>
        <DialogContent className="auth-dialog">
          You can signIn with your email and password
          <TextField
            type="text"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <button className="signUp-btn" onClick={handleDSignIn}>
            SignIn
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={signOutOpen} onClose={() => setSignOutOpen(false)}>
        <DialogTitle className="red">SignOut</DialogTitle>
        <DialogContent>
          Are you sure you want to signOut?{" "}
          <button className="signOut-btn" onClick={handleSignOut}>
            SignOut
          </button>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Navbar;
