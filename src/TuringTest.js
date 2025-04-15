import React, { useEffect, useState } from 'react';
import imageListTxt from './image list.txt';

// firebase.js에서 db를 import
import { db } from './firebase';
// firestore의 메서드 import
import { doc, setDoc } from 'firebase/firestore';

function TuringTest() {
  const [imageIndex, setImageIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  const [test, setTest] = useState()

  async function addtest() {
    setDoc(doc(db, "test1", "test2"), {
      name: "JeongYeon"
    });
  } 

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    fetch(imageListTxt) // `public` 폴더 안의 `urls.txt` 파일 경로
      .then(response => response.text()) // 텍스트로 응답을 변환
      .then(text => {
        const urls = text.split('\n'); // 줄바꿈으로 URL들을 분리
        setImageList(urls); // 상태 업데이트
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  
  const handleResponse = (response) => {
    setResponses([...responses, response]);
    if (imageIndex < imageList.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      // 모든 이미지에 대한 응답이 완료되면 결과 처리
      // 예: CSV 파일로 저장
    }
  };

  return (
      <div>
        <img src={imageList[imageIndex]} alt="current" />
        <div>
          <button onClick={() => handleResponse('real')}>Real</button>
          <button onClick={() => handleResponse('fake')}>Fake</button>
        </div>
      </div>
  );
}

export default TuringTest;
