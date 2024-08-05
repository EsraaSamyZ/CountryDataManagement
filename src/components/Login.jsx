import { loginUser } from "../redux/auth/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./base/Input";
import Button from "./base/Button";
import Loading from "./Loading";

const Login = () => {
  const [email, setEmail] = useState("Afnaniread@gmail.com");
  const [password, setPassword] = useState("!123Test4560");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex flex-col justify-center space-y-12 md:w-2/5 m-auto border p-10 rounded-xl">
      <div className="space-y-4">
        <Input
          label="البريد الإلكتروني"
          type="text"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="كلمة السر"
          type="password"
          placeholder="أدخل كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button 
      placeholder="تسجيل الدخول" 
      btnStyle="primary" 
      onClick={handleLogin}
      />
      {loading && <Loading loading={loading}/>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Login;
