"use client";

export default function SendToMessageButton() {
  const sendToMe = () => {
    const { Kakao } = window;

    Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "text",
          text: "기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
          link: {
            mobile_web_url: process.env.NEXT_PUBLIC_BASE_URL,
            web_url: process.env.NEXT_PUBLIC_BASE_URL,
          },
        },
      },
    })
      .then((res: any) => {
        alert("success: " + JSON.stringify(res));
      })
      .catch((err: any) => {
        alert("error: " + JSON.stringify(err));
      });
  };

  return (
    <button className="border p-4 rounded-md" onClick={sendToMe}>
      메시지 보내기
    </button>
  );
}
