export default function Index() {
  return (
    <div className="min-h-[40vh]">
      <div className="mt-20 text-[19px] md:text-2xl text-center text-skin-base font-medium">
        <h1>You are signed out</h1>
      </div>
      <div className="mb-20 mt-20 text-[18px] md:text-m text-center text-skin-base font-medium">
        <p className="logout-text">
          You are signed out and will be redirected to homepage in 5 seconds
        </p>
      </div>
    </div>
  );
}
