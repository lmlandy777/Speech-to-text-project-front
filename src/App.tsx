import React, { useState } from 'react';
import { SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import './index.css';
import './App.css';

function App() {
  const [recognizedText, setRecognizedText] = useState('');
  const [key, setKey] = useState('');
  const [language, setLanguage] = useState("zh-CN");

  const languages: { [key: string]: string } = {
    "中文": "zh-CN",
    "英语": "en-US",
    "法语": "fr-FR",
    "日语": "ja-JP"
  };

  const startRecognition = () => {
    const speechConfig = SpeechConfig.fromSubscription(key, "eastasia");
    speechConfig.speechRecognitionLanguage = language;

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(result => {
      setRecognizedText(result.text);
    }, error => {
      console.error("发生错误:", error);
      setRecognizedText("识别错误: " + (error as unknown as Error).message);
    });
  };

  return (
    <div className="app">
      <div className="language-selector">
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {Object.keys(languages).map(lang => (
            <option key={lang} value={languages[lang]}>{lang}</option>
          ))}
        </select>
      </div>
      <div className="recognition-button">
        <button onClick={startRecognition}>开始识别</button>
      </div>
      <div className="api-key-input">
        <input
          type="text"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="身份密钥"
        />
      </div>
      <div className="text-output">
        <textarea value={recognizedText} readOnly />
      </div>
    </div>
  );
}

export default App;
