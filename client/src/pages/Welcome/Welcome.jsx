import React, { useState } from "react";
import styles from "./Welcome.module.css";
import Button from "../../components/common/Button/Button";
import { GoogleIcon, WhiteLogo, MainLogo } from "../../utils/icons";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login with:", { email, password, rememberMe });
  };

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
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
              Welcome to
              <br />
              <span className={styles.brandName}>Ques.AI</span>
            </h2>
          </div>

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
            >
              Login
            </Button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <Button
              fullWidth
              bgColor="white"
              textColor="#333"
              strokeColor="#ccc"
              icon={<GoogleIcon width={16} height={16} />}
              onClick={() => console.log("Continue with Google")}
              type="button"
            >
              Continue with Google
            </Button>
          </form>

          <div className={styles.signupPrompt}>
            Don't have an account?{" "}
            <a href="#" className={styles.signupLink}>
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
