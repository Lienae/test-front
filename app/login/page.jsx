"use client";
import { useEffect } from "react";
import "../styles/AnimatedForm.css";

export default function Home() {
  useEffect(() => {
    const switchers = [...document.querySelectorAll(".switcher")];
    switchers.forEach((item) => {
      item.addEventListener("click", function () {
        switchers.forEach((btn) =>
          btn.parentElement.classList.remove("is-active")
        );
        this.parentElement.classList.add("is-active");
      });
    });
  }, []);

  // ✅ 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    const id = document.getElementById("login-id").value;
    const password = document.getElementById("login-password").value;

    const formData = new URLSearchParams();
    formData.append("id", id);
    formData.append("pwd", password);

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      const result = await response.text();
      if (response.ok) {
        console.log("✅ 로그인 성공:", result);
        localStorage.setItem("nickname", result); // 닉네임 저장
        window.location.href = "/dashboard"; // 이동
      } else {
        console.log("❌ 로그인 실패:", result);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // ✅ 회원가입
  const handleSignup = async (e) => {
    e.preventDefault();
    const nickname = document.getElementById("signup-nickname").value;
    const id = document.getElementById("signup-id").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-password-confirm").value;

    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          userPassword: password,
          name: nickname,
        }),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Maple</h1>
      <div className="forms">
        {/* 로그인 */}
        <div className="form-wrapper is-active">
          <button type="button" className="switcher switcher-login">
            Login <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLogin}>
            <fieldset>
              <legend>ID와 비밀번호를 입력하세요.</legend>
              <div className="input-block">
                <label htmlFor="login-id">ID</label>
                <input id="login-id" type="text" required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" required />
              </div>
            </fieldset>
            <button type="submit" className="submit-button btn-login">
              Login
            </button>
          </form>
        </div>

        {/* 회원가입 */}
        <div className="form-wrapper">
          <button type="button" className="switcher switcher-signup">
            Sign Up <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handleSignup}>
            <fieldset>
              <legend>닉네임, ID, 비밀번호를 입력하세요.</legend>
              <div className="input-block">
                <label htmlFor="signup-nickname">Nickname</label>
                <input id="signup-nickname" type="text" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-id">ID</label>
                <input id="signup-id" type="text" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">Confirm Password</label>
                <input id="signup-password-confirm" type="password" required />
              </div>
            </fieldset>
            <button type="submit" className="submit-button btn-signup">
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
