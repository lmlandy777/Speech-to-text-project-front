import { useState } from 'react';
import { SpeechConfig, AudioConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';

function App() {

  const [recognizedText, setRecognizedText] = useState('');
  const [key, setKey] = useState('');

  const startRecognition = () => {
    const speechConfig = SpeechConfig.fromSubscription(key, "eastasia");

    // 添加语言设置为中文
    speechConfig.speechRecognitionLanguage = "zh-CN"; 
    
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);
    
    recognizer.recognizeOnceAsync(result => {
      setRecognizedText(result.text);
    });
  }

  return (
    <div>
      <input 
        value={key}
        onChange={e => setKey(e.target.value)} 
        placeholder="Enter your speech key"  
      />

      <button onClick={startRecognition}>Start Recognition</button>

      <textarea 
        value={recognizedText}
        readOnly={true}
      />
    </div>
  )
}

export default App;