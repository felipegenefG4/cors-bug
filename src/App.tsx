import { createRef, useEffect, useState } from "react";
// @ts-ignore
import Pdf from "react-to-pdf";

const IMAGE_URL =
  "https://g4-skills-production.s3.sa-east-1.amazonaws.com/g4-skills-companies-logo/1666889020042-img.jpg";
// "https://cors-anywhere.herokuapp.com/https://g4-skills-production.s3.sa-east-1.amazonaws.com/g4-skills-companies-logo/1666889020042-img.jpg";

// const IMAGE_URL = "https://i.imgur.com/AX0TY0i.png";

function App() {
  const ref = createRef();

  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(IMAGE_URL);
      console.log(response.body);
      const blob = await response.blob();
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        // @ts-ignore
        setImageBase64(fileReader.result);
      };
      fileReader.readAsDataURL(blob);
    }

    fetchImage();
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {imageBase64}
      <Pdf
        targetRef={ref}
        options={{
          orientation: "landscape",
        }}
      >
        {({ toPdf }: any) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      {/* <div className="absolute left-10 top-10 ml-[-9999px]"> */}
      <div
        // @ts-ignore
        ref={ref}
        className="w-[1920px] h-[1080px] flex flex-col gap-4 rounded bg-gray-200 p-4"
      >
        <h1 className="text-lg">Seu certificado!</h1>
        <div
          style={{ backgroundImage: `url(${imageBase64})` }}
          className={`w-[125px] bg-cover h-[40px] border border-red-400`}
        />
      </div>
      {/* </div> */}
    </div>
  );
}
export default App;
