import Login from "./form/login-form";
import Register from "./form/register-form";
import AuthMobileTabs from "./elements/auth-mobile-tabs";

export default function Index() {
  return (
    <>
      <div
        className="mt-[30px] text-[19px] md:text-2xl text-center text-skin-base font-medium"
        id="main_content"
      >
        <h1>SIGN IN OR CREATE ACCOUNT</h1>
      </div>
      {/* Login & Registration for Desktop View as Form */}
      <div className="login-page hidden md:grid container mx-auto mb-[60px] bg-white mt-5 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-4">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <Login />
        </div>
        <div className="space-y-6 lg:col-start-3 lg:col-span-2">
          <Register />
        </div>
      </div>
      {/* Login & Registration for Mobile View as Tab */}
      <div className="grid md:hidden">
        <AuthMobileTabs />
      </div>
    </>
  );
}
