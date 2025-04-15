import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import imageListTuringTxt from './image_list_turing.txt';
import imageListSkinToneTxt from './image_list_skin_tone.txt';

const StyledButton = styled.button`
  width: 170px;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const centerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // 수평 방향으로 가운데 정렬
  alignItems: 'center', // 수직 방향으로 가운데 정렬
  height: '100vh', // 부모 컨테이너의 높이를 화면의 높이와 동일하게 설정
  textAlign: 'center', // 텍스트 가운데 정렬 (자식 요소가 텍스트인 경우)
};

function extractID(url) {
  const filename = url.split('/').pop(); // '067-Co2-Rw09.png'
  const idWithDashes = filename.split('.')[0]; // '067-Co2-Rw09'
  const formattedId = idWithDashes.replace(/-/g, ''); // '067Co2Rw09'
  return formattedId;
}

function App() {
  const [page, setPage] = useState('Main');
  const [name, setName] = useState('');

  const [imageIndexTuring, setimageIndexTuring] = useState(0);
  const [imageListTuring, setImageListTuring] = useState([]);

  const [imageIndexSkinTone, setimageIndexSkinTone] = useState(0);
  const [imageListSkinTone, setImageListSkinTone] = useState([]);

  useEffect(() => {
    fetch(imageListTuringTxt) // `public` 폴더 안의 `urls.txt` 파일 경로
      .then(response => response.text()) // 텍스트로 응답을 변환
      .then(text => {
        const urls = text.split('\n'); // 줄바꿈으로 URL들을 분리
        setImageListTuring(urls); // 상태 업데이트
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  useEffect(() => {
    fetch(imageListSkinToneTxt) // `public` 폴더 안의 `urls.txt` 파일 경로
      .then(response => response.text()) // 텍스트로 응답을 변환
      .then(text => {
        const urls = text.split('\n'); // 줄바꿈으로 URL들을 분리
        setImageListSkinTone(urls); // 상태 업데이트
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setPage("TestSelection");
  };

  const handleTuringButton = (response) => {
    setDoc(doc(db, `turing_test_${name}`, extractID(imageListTuring[imageIndexTuring])), {
      response: response
    })
    if (imageIndexTuring < imageListTuring.length - 1) {
      setimageIndexTuring(imageIndexTuring + 1);
    } else {
      // 모든 이미지에 대한 응답이 완료되면 결과 처리
      setPage("Finished")
    }
  };

  const handleSkinToneButton = (response) => {
    setDoc(doc(db, `skin_tone_test_${name}`, extractID(imageListSkinTone[imageIndexSkinTone])), {
      response: response
    })
    if (imageIndexSkinTone < imageListSkinTone.length - 1) {
      setimageIndexSkinTone(imageIndexSkinTone + 1);
    } else {
      // 모든 이미지에 대한 응답이 완료되면 결과 처리
      setPage("Finished")
    }
  };


  function renderPage() {
    switch (page) {
      case 'Main':
        return (
          <div style={centerStyle}>
            <form onSubmit={handleNameSubmit}>
              <label>
                <h2>참가자 이름</h2>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  /></div>
              </label> <p></p>
              <div><StyledButton type="submit">시작하기</StyledButton></div>
            </form>
            <p>
              안뇽 ^-^
              GAN 생성 피부 사진에 대한 테스트입니다. <br />
              약 10분이 소요됩니다. <br />
              고민없이 즉각적으로 골라주시길 바랍니다. <br /><br />
              Developed by : Gyeonghoon Kim
            </p>
          </div>
        );
      case 'TestSelection':
        return (
          <div style={centerStyle}>
            <StyledButton onClick={() => setPage("TuringTest")}>Turing Test</StyledButton>
            <StyledButton onClick={() => setPage("SkinToneTest")}>Skin Tone Test</StyledButton>
            <p style={{ marginRight: '30px', marginLeft: '30px' }}>
              Turing Test는 실제인지, 생성된 가짜 사진인지를 맞추시면 됩니다.  <br />
              Skin Tone Test는 어느 Fitzpatrick Scale의 사진인지 골라주시면 됩니다. <br />
              각 180장, 120장입니다 <br />
              고민하지 말고 바로 골라주세요! <br />
            </p>
          </div>
        );
      case 'Finished':
        return (
          <div style={centerStyle}>
            테스트를 완료했습니다.<br></br>감사합니다❤️ <br></br>
            <StyledButton onClick={() => setPage("TestSelection")} style={{ width: '250px' }}>다음 테스트 하기</StyledButton>
          </div>
        )
      case 'TuringTest':
        return (
          <div style={centerStyle}>
            <img src={imageListTuring[imageIndexTuring]} alt="current" />
            <StyledButton onClick={() => handleTuringButton('real')} style={{ width: '250px', marginBottom: 0 }}>Real</StyledButton>
            <StyledButton onClick={() => handleTuringButton('fake')} style={{ width: '250px' }}>Fake</StyledButton>
          </div>
        );
      case 'SkinToneTest':
        return (
          <div style={centerStyle}>
            <img src={imageListSkinTone[imageIndexSkinTone]} alt="current" />
            <StyledButton onClick={() => handleSkinToneButton('1-2')} style={{ width: '250px', marginBottom: 0 }}>FS 1-2</StyledButton>
            <StyledButton onClick={() => handleSkinToneButton('3-4')} style={{ width: '250px', marginBottom: 0 }}>FS 3-4</StyledButton>
            <StyledButton onClick={() => handleSkinToneButton('5-6')} style={{ width: '250px' }}>FS 5-6</StyledButton>
          </div>
        )
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
