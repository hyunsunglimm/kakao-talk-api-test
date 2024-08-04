"use client";

import { FormEvent, useState } from "react";

type SendToMessageFormProps = {
  accessToken: string | undefined;
};

export default function SendToMessageForm({
  accessToken,
}: SendToMessageFormProps) {
  const [enteredText, setEnteredText] = useState("");

  const sendToMe = async (e: FormEvent) => {
    e.preventDefault();

    const url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
    const data = {
      template_object: JSON.stringify({
        object_type: "text",
        text: enteredText,
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
        alert("메시지 전송 성공: " + JSON.stringify(result));
      } else {
        alert("메시지 전송 실패: " + JSON.stringify(result));
      }
    } catch (error) {
      alert("Fetch error: " + JSON.stringify(error));
    } finally {
      setEnteredText("");
    }
  };

  return (
    <form
      onSubmit={sendToMe}
      className="border rounded-md p-4 flex flex-col gap-4 w-80"
    >
      <input
        className="border p-4 rounded-md"
        placeholder="나에게 보낼 텍스트를 작성해주세요"
        onChange={(e) => setEnteredText(e.target.value)}
        value={enteredText}
        required
      />
      <button className="border p-4 rounded-md">메시지 보내기</button>
    </form>
  );
}
