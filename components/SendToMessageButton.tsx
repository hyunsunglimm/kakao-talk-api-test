"use client";

type SendToMessageButtonProps = {
  accessToken: string | undefined;
};

export default function SendToMessageButton({
  accessToken,
}: SendToMessageButtonProps) {
  const sendToMe = async () => {
    const url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
    const data = {
      template_object: JSON.stringify({
        object_type: "text",
        text: "텍스트 영역입니다. 최대 200자 표시 가능합니다.",
        link: {
          web_url: process.env.NEXT_PUBLIC_BASE_URL,
          mobile_web_url: process.env.NEXT_PUBLIC_BASE_URL,
        },
        button_title: "바로 확인",
      }),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
        body: new URLSearchParams(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Success:", result);
        alert("메시지 전송 성공: " + JSON.stringify(result));
      } else {
        console.error("Error:", result);
        alert("메시지 전송 실패: " + JSON.stringify(result));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Fetch error: " + JSON.stringify(error));
    }
  };

  return (
    <button className="border p-4 rounded-md" onClick={sendToMe}>
      메시지 보내기
    </button>
  );
}
