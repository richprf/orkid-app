import { auth, signOut } from "@/auth";
import Image from "next/image";
import React from "react";

const Nvbar = async () => {
  const session = await auth();
  console.log("session", session);
  const user = session?.user;
  return (
    <div className="flex justify-between">
      <div>
        {user?.image && (
          <Image src={user?.image} width={50} height={50} alt="user" />
        )}

        {user?.name}
      </div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Signiot</button>
        </form>
      </div>
    </div>
  );
};

export default Nvbar;
