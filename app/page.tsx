import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <div>
      <div className="border-b border-neutral-300">
        <Navbar />
      </div>
      <div className="h-screen bg-neutral-50">
        <div className="flex items-center justify-center p-10 flex-col">
          <h1 className="text-5xl text-neutral-900 font-bold text-center">
            Welcome To Expense Tracker App
          </h1>
          <p>Get all your expeses audited here.</p>
        </div>
      </div>
    </div>
  );
}
