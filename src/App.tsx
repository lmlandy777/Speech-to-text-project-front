import { useState } from 'react';
import { SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';

function App() {
  const [recognizedText, setRecognizedText] = useState('');
  const [key, setKey] = useState('');
  const [lang, setLang] = useState("zh-CN"); // 默认中文

  const languages: { [key: string]: string } = {
    "中文": "zh-CN",
    "英语": "en-US"
  };

  const startRecognition = () => {
    const speechConfig = SpeechConfig.fromSubscription(key, "eastasia");
    speechConfig.speechRecognitionLanguage = languages[lang];

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(result => {
      setRecognizedText(result.text);
    }, error => {
      console.error("发生错误:", error);
      setRecognizedText("识别错误: " + (error as unknown as Error).message);
    });
  }


  return (
    <div>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="中文">中文</option>
        <option value="英语">英语</option>
      </select>
      <button onClick={startRecognition}>开始识别</button>
      <input
        value={key}
        onChange={e => setKey(e.target.value)}
        placeholder="Enter your speech key"
      />
      <textarea value={recognizedText} readOnly={true} />
    </div>
  );
}

export default App;