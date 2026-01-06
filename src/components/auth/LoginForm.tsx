import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  phoneOrEmail: string;
}

const LoginForm: React.FC = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setInputValue(data.phoneOrEmail);
    
    // Show OTP input for mobile (simulated)
    if (/^\d{10}$/.test(data.phoneOrEmail)) {
      setShowOtp(true);
    } else {
      // For email, login directly
      await login(data);
    }
  };

  const handleOtpSubmit = async () => {
    await login({ phoneOrEmail: inputValue, otp: "123456" });
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-submit when all digits are filled
    if (newOtp.every(digit => digit !== "") && index === 5) {
      handleOtpSubmit();
    }
  };

  if (showOtp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-ev-dark">Enter OTP</h1>
            <p className="text-gray-600 mt-2">
              Sent to {inputValue}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-ev-green focus:ring-2 focus:ring-ev-green/20 transition"
                />
              ))}
            </div>

            <button
              onClick={handleOtpSubmit}
              disabled={loading}
              className="w-full bg-ev-green text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP (Demo: 123456)"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive OTP?{" "}
              <button className="text-ev-blue hover:underline">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ev-dark">ChargeEv</h1>
          <p className="text-gray-600 mt-2">Charge your EV seamlessly</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="phoneOrEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number or Email
            </label>
            <input
              id="phoneOrEmail"
              type="text"
              {...register("phoneOrEmail")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ev-green focus:border-transparent transition"
              placeholder="Enter 10-digit phone or email"
            />
            {errors.phoneOrEmail && (
              <p className="mt-2 text-sm text-red-600">{errors.phoneOrEmail.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ev-green text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
