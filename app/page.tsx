"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChartNoAxesCombined,
  Eye,
  EyeOff,
  Headset,
  LockKeyhole,
  Mail,
  Package,
  UsersRound,
} from "lucide-react";

type AuthMode = "login" | "register" | "reset";

const modules = [
  { name: "Product management", Icon: Package },
  { name: "Human Resource Management", Icon: UsersRound },
  { name: "Customer management", Icon: Headset },
  { name: "Sales management", Icon: ChartNoAxesCombined },
];

export default function Home() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notice, setNotice] = useState("");

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setNotice("");
    setPasswordVisible(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mode === "register" && formData.get("password") !== formData.get("confirmPassword")) {
      setNotice("Those passwords do not match. Please try again.");
      return;
    }

    const messages: Record<AuthMode, string> = {
      login: "Your sign-in form is ready. Connect Supabase Auth to enable access.",
      register: "Your account form is ready. Connect Supabase Auth to create your account.",
      reset: "Your reset form is ready. Connect Supabase Auth to send a recovery link.",
    };
    setNotice(messages[mode]);
  }

  const isLogin = mode === "login";
  const isRegister = mode === "register";

  return (
    <main className="auth-shell">
      <section className="brand-panel" aria-label="Hope ERP overview">
        <header className="brand-header">
          <a className="brand-mark" href="#home" aria-label="Hope, Inc. home">
            <span className="brand-symbol"><Boxes size={19} strokeWidth={2.1} /></span>
            <span>hope<span className="brand-period">.</span></span>
          </a>
          <span className="brand-edition">BUSINESS OS <span>·</span> 2025</span>
        </header>

        <div className="brand-content">
          <div className="eyebrow"><span className="eyebrow-dot" /> ONE WORKSPACE, EVERY TEAM</div>
          <h1>Good work<br />moves <em>everyone.</em></h1>
          <p className="brand-copy">A clearer view of your business starts here. Bring your people, customers, products, and plans together.</p>

          <div className="module-list" aria-label="Included systems">
            {modules.map(({ name, Icon }, index) => (
              <div className="module-item" key={name}>
                <span className="module-icon"><Icon size={17} strokeWidth={1.8} /></span>
                <span>{name}</span>
                <span className="module-index">0{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="workspace-preview" aria-label="Example workspace overview">
            <div className="preview-topline">
              <div>
                <span className="preview-kicker">TEAM OVERVIEW</span>
                <p className="preview-title">Your workspace</p>
              </div>
              <span className="preview-avatar" aria-hidden="true">H</span>
            </div>
            <div className="preview-stats">
              <div className="preview-stat">
                <span>Open orders</span>
                <strong>128 <small>+12%</small></strong>
                <div className="sparkline sparkline-one" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
              <div className="preview-stat">
                <span>Team online</span>
                <strong>24 <small className="stat-neutral">of 31</small></strong>
                <div className="team-dots" aria-hidden="true"><i /><i /><i /><i /><b>+20</b></div>
              </div>
            </div>
            <div className="preview-footer"><span><i /> All systems operational</span><ArrowUpRight size={15} /></div>
          </div>
        </div>

        <footer className="brand-footer">
          <span>© 2025 Hope, Inc.</span>
          <div><a href="#privacy">Privacy</a><a href="#help">Help center</a></div>
        </footer>
      </section>

      <section className="form-panel" aria-label="Account access">
        <div className="mobile-brand brand-mark" aria-label="Hope, Inc.">
          <span className="brand-symbol"><Boxes size={19} strokeWidth={2.1} /></span>
          <span>hope<span className="brand-period">.</span></span>
        </div>

        <div className="form-wrap">
          <div className="form-heading">
            <span className="form-kicker">HOPE, INC. WORKSPACE</span>
            <h2>{isLogin ? "Welcome back" : isRegister ? "Create your account" : "Reset your password"}</h2>
            <p>{isLogin ? "Sign in to pick up where your team left off." : isRegister ? "Get your team working together in one place." : "We’ll help you get back into your workspace."}</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Account options">
            <button className={isLogin ? "auth-tab is-active" : "auth-tab"} type="button" role="tab" aria-selected={isLogin} onClick={() => changeMode("login")}>Sign in</button>
            <button className={isRegister ? "auth-tab is-active" : "auth-tab"} type="button" role="tab" aria-selected={isRegister} onClick={() => changeMode("register")}>Create account</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} key={mode}>
            {isRegister && (
              <label className="field-label" htmlFor="fullName">
                Full name
                <input id="fullName" name="fullName" type="text" placeholder="Your name" autoComplete="name" required />
              </label>
            )}

            <label className="field-label" htmlFor="email">
              Work email
              <span className="input-wrap"><Mail size={17} aria-hidden="true" /><input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></span>
            </label>

            {mode !== "reset" && (
              <label className="field-label" htmlFor="password">
                Password
                <span className="input-wrap"><LockKeyhole size={17} aria-hidden="true" /><input id="password" name="password" type={passwordVisible ? "text" : "password"} placeholder={isRegister ? "At least 8 characters" : "Enter your password"} autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required /><button className="icon-button" type="button" aria-label={passwordVisible ? "Hide password" : "Show password"} onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}</button></span>
              </label>
            )}

            {isRegister && (
              <label className="field-label" htmlFor="confirmPassword">
                Confirm password
                <span className="input-wrap"><LockKeyhole size={17} aria-hidden="true" /><input id="confirmPassword" name="confirmPassword" type={passwordVisible ? "text" : "password"} placeholder="Re-enter your password" autoComplete="new-password" minLength={8} required /></span>
              </label>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-option"><input type="checkbox" name="remember" /> <span>Remember me</span></label>
                <button className="text-action" type="button" onClick={() => changeMode("reset")}>Forgot password?</button>
              </div>
            )}

            {notice && <p className="form-notice" role="status">{notice}</p>}

            <button className="submit-button" type="submit">
              <span>{isLogin ? "Sign in to workspace" : isRegister ? "Create account" : "Send reset link"}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {mode === "reset" ? (
            <p className="form-switch">Remembered it? <button type="button" onClick={() => changeMode("login")}>Back to sign in</button></p>
          ) : isLogin ? (
            <p className="form-switch">New to Hope? <button type="button" onClick={() => changeMode("register")}>Create an account</button></p>
          ) : (
            <p className="form-switch">Already have an account? <button type="button" onClick={() => changeMode("login")}>Sign in</button></p>
          )}

          {isRegister && <p className="terms-copy">By creating an account, you agree to Hope, Inc.’s terms and privacy policy.</p>}
        </div>

        <footer className="form-footer"><span>Secure access for your organization</span><span className="secure-mark"><LockKeyhole size={13} /> ENCRYPTED</span></footer>
      </section>
    </main>
  );
}