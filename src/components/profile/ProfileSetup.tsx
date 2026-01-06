import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/validation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProfileFormData {
  fullName: string;
  carType: string;
}

const CAR_TYPES = ["Tata", "MG", "Citron", "Mahindra", "Maruti Suzuki"];

const ProfileSetup: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      carType: user?.carType || "",
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    updateProfile(data as any);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ev-dark">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Tell us about yourself</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ev-green focus:border-transparent transition"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-2">
              Car Type
            </label>
            <select
              id="carType"
              {...register("carType")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ev-green focus:border-transparent transition appearance-none bg-white"
            >
              <option value="">Select your car type</option>
              {CAR_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.carType && (
              <p className="mt-2 text-sm text-red-600">{errors.carType.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ev-green text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
