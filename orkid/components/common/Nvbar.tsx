"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Nvbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-2">
        {user?.image && (
          <Image src={user.image} width={50} height={50} alt="user" className="rounded-full" />
        )}
        <span>{user?.name}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}

