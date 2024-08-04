import { auth, signIn, signOut } from "@/auth";
import SendToMessageButton from "@/components/SendToMessageButton";

export default async function Home() {
  const session = await auth();

  return (
    <section className="flex flex-col justify-center items-center h-screen gap-8">
      <p className="text-2xl font-bold">
        {session ? `${session.user?.name}님 환영합니다.` : "로그인 해주세요."}
      </p>
      <div className="flex gap-8">
        <form
          action={async () => {
            "use server";
            await signIn("kakao");
          }}
        >
          <button type="submit" className="border p-4 rounded-md">
            카카오 로그인
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" className="border p-4 rounded-md">
            로그아웃
          </button>
        </form>
        <SendToMessageButton />
      </div>
    </section>
  );
}
