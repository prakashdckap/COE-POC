import constants from "../../helper/constant";
import ImageTag from "../../theme-files/image";
import Link from "../../theme-files/link";
import InputEmail from "../../theme-files/input-email";
import InputPassword from "../../theme-files/input-password";
import InputText from "../../theme-files/input-text";
import useRegister from "../../helper/hooks/customer/use-register";
import LoadingSpinner from "../../helper/loading-spinner";

const { theme, HEADLESS_SOLUTION_THEME } = constants;
const themeName = theme[HEADLESS_SOLUTION_THEME];

export default function Register() {
  const { userRegistration, loading, handleInputChange } = useRegister();
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register</h2>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={userRegistration} className="space-y-6">
                <InputText
                  id="firstname"
                  name="firstname"
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  First Name
                </InputText>

                <InputText
                  id="lastname"
                  name="lastname"
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  Last Name
                </InputText>

                <InputEmail
                  id="email"
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  Email Address
                </InputEmail>

                <InputPassword
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  Password
                </InputPassword>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "Register"}
                </button>

                <span className="flex">
                  If you have an account &nbsp;
                  <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login here
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <ImageTag
          className="absolute inset-0 h-full w-full object-cover"
          type={HEADLESS_SOLUTION_THEME}
          src={`/${themeName}/login-image.jpg`}
          alt="Alt Text For Image"
        /> 
      </div>
    </div>
  );
}
