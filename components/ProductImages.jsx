import styled from "styled-components";
import {useState} from "react";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;

const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
    height: 40px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
  `;


export default function ProductImages({images}) {
  const [activeImage,setActiveImage] = useState(images?.[0]);
  return (
    <>
      <div className="text-center mb-5 h-auto">
        <Image className="w-full h-full object-cover shadow-lg" width={0} height={0} src={activeImage} alt=""/>
      </div>
      <div className="flex gap-3 flex-grow-0 mt-2">
        {images.map(image => (
          <ImageButton
            key={image}
            active={image===activeImage}
            onClick={() => setActiveImage(image)}>
            <Image src={image} width={40} height={0} alt=""/>
          </ImageButton>
        ))}
      </div>
    </>
  );
}