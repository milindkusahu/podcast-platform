import React, { useState } from "react";
import styles from "./Welcome.module.css";
import Button from "../../components/Button/Button";
import { GoogleIcon, WhiteLogo, MainLogo } from "../../utils/icons";
import { useAuth } from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import backgroundWaves from "../../assets/background-waves.svg";
import SEO from "../../components/SEO/SEO";

const Welcome = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { login, signup, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password, rememberMe });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password });

      setIsLoginForm(true);

      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setEmail("");
    setPassword("");
    setName("");
    setRememberMe(false);
  };

  return (
    <div className={styles.container}>
      <SEO
        title="Ques.AI | AI-Powered Podcast Distribution!"
        description="Transform your podcasting journey with Ques.AI. Supercharge your distribution using our advanced AI assistant and make your podcast more than just a hobby."
        keywords="podcast assistant, AI podcast, podcast distribution, content creation, podcast growth"
        ogType="website"
      />

      <Toaster position="bottom-center" />

      {/* Left Panel */}
      <div
        className={styles.leftPanel}
        style={{ backgroundImage: `url(${backgroundWaves})` }}
      >
        <div className={styles.logoContainer}>
          <WhiteLogo width={290} height={70} className={styles.logo} />
        </div>
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>
            Your podcast
            <br />
            will no longer
            <br />
            be just a hobby.
          </h1>
          <p className={styles.subheading}>
            Supercharge Your Distribution
            <br />
            using our AI assistant!
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.loginContainer}>
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeLogo}>
              <MainLogo width={80} height={80} />
            </div>
            <h2 className={styles.welcomeText}>
              {isLoginForm ? "Welcome to" : "Join us"}
              <br />
              <span className={styles.brandName}>Ques.AI</span>
            </h2>
          </div>

          {isLoginForm ? (
            // Login Form
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>Remember me</span>
                </label>
                <a href="#" className={styles.forgotPassword}>
                  Forgot password?
                </a>
              </div>

              <Button
                fullWidth
                bgColor="var(--primary-color)"
                textColor="white"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className={styles.divider}>
                <span className={styles.dividerText}>or</span>
              </div>

              <Button
                fullWidth
                bgColor="white"
                textColor="#3C3C3C"
                strokeColor="#ccc"
                icon={<GoogleIcon width={30} height={30} />}
                onClick={() => console.log("Continue with Google")}
                type="button"
                disabled={loading}
                className={styles.googleBtn}
              >
                Continue with Google
              </Button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <Button
                fullWidth
                bgColor="var(--primary-color)"
                textColor="white"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className={styles.divider}>
                <span className={styles.dividerText}>or</span>
              </div>

              <Button
                fullWidth
                bgColor="white"
                textColor="#333"
                strokeColor="#ccc"
                icon={<GoogleIcon width={30} height={30} />}
                onClick={() => console.log("Continue with Google")}
                type="button"
                disabled={loading}
                className={styles.googleBtn}
              >
                Sign up with Google
              </Button>
            </form>
          )}

          <div className={styles.signupPrompt}>
            {isLoginForm
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href="#"
              className={styles.signupLink}
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}
            >
              {isLoginForm ? "Create Account" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
