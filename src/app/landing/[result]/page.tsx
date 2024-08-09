import { LinkButton } from "@/components/LinkButton";
import { result as resultSheet } from "../data";
import { fetchDetail } from "@/app/detail/[id]/page";
import Detail from "./Detail";

async function ResultPage({ params: { result } }: { params: { result: string } }) {
  const productNumArr = resultSheet[result].productNumber;

  // 결과값 객체에서 상품 번호 배열을 받아와 패치한 데이터를 배열 형태로 저장
  const productDetailArr = await Promise.all(
    productNumArr.map(async (productNum) => {
      return await fetchDetail(productNum + "");
    }),
  );

  return (
    <div className="result flex flex-col justify-center items-center px-12 py-8 min-h-screen text-center bg-[#FFFAED]">
      <h2 className="text-center mb-5">
        이런 술이 잘 맞으실것 같아요!
        <br />
        클릭하면 상품 페이지로 이동합니다!
      </h2>
      <div className="w-full p-7 mb-6 bg-white rounded-xl">
        {productDetailArr.map((item, index) => (
          <Detail key={index} item={item} content={resultSheet[result].content[index]} />
        ))}
      </div>
      <LinkButton className="mb-2 w-full" href="/landing">
        다시 하기
      </LinkButton>
      <LinkButton className="w-full" color="disabled" href="/">
        쇼핑몰로 이동하기
      </LinkButton>
    </div>
  );
}

export default ResultPage;
