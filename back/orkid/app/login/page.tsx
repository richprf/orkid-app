import { signIn, auth } from "@/auth";
import AddCategory from "@/components/home/AddCategory";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <>
      <AddCategory />
    </>
  ) : (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-xs text-center">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
      Sign in to Orkid
    </h1>

    <div className="flex flex-col gap-4">
      <div>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
     
            Sign in with Google
          </button>
        </form>
      </div>

      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
   
          Sign in with GitHub
        </button>
      </form>
    </div>
  </div>
</div>


  );
}
