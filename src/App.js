import './App.css';
import { useEffect, useState, useRef } from 'react';
import { TextArea, Button, Icon, Popup } from 'semantic-ui-react';

function App() {
  const [text, setText] = useState("");
  const [normalizedText, setNormalizedText] = useState("");

  const [kanaHalf, setKanaHalf] = useState(true);
  const [line, setLine] = useState(false);
  const [spaceFull, setSpaceFull] = useState(true);
  const [spaceHalf, setSpaceHalf] = useState(false);
  const [breakToSpace, setBreakToSpace] = useState(true);

  const [count, setCount] = useState(0);
  const [originTextCount, setOriginTextCount] = useState(0);

  const [kanaHalfColor, setKanaHalfColor] = useState("green")
  const [lineColor, setLineColor] = useState("gray")
  const [spaceFullColor, setSpaceFullColor] = useState("green")
  const [spaceHalfColor, setSpaceHalfColor] = useState("gray")
  const [breakToSpaceColor, setBreakToSpaceColor] = useState("green")

  const textAreaElement = useRef(null)


  const handleTextareaChange = (e) => {
    if(e.target.value !== null){
      setText(e.target.value)
    }
  }

  const settingChenge = (e) => {
    console.log(e.target.value)
    if(e.target.value === "kanaHalf"){
      setKanaHalf(!kanaHalf);
    }
    if(e.target.value === "line"){
      setLine(!line);
    }
    if(e.target.value === "spaceFull"){
      setSpaceFull(!spaceFull);
    }
    if(e.target.value === "spaceHalf"){
      setSpaceHalf(!spaceHalf);
    }
    if(e.target.value === "breakToSpace"){
      setBreakToSpace(!breakToSpace);
    }
  //updateValueの内容をもう一度やっている。綺麗なコードにしたい
    let tmpText = text
    if (kanaHalf === true){
      tmpText = katakanaConverter(tmpText);
    }
    if (line === true){
      tmpText = tmpText.replace(/\r\n|\n|\r/g,"");
    }
    if (spaceHalf === true){
      tmpText = tmpText.replace(/ /g,"");
    }
    if (spaceFull === true){
      tmpText = tmpText.replace(/　/g,"");
    }
    if (breakToSpace === true){
      tmpText = tmpText.replace(/\r\n|\n|\r/g," ");
    }
    setNormalizedText(tmpText);
  }

  const katakanaConverter = (str) => {
    let katakanaObj = {
      "ｱ": "ア", "ｲ": "イ", "ｳ": "ウ", "ｴ": "エ", "ｵ": "オ",
      "ｶ": "カ", "ｷ": "キ", "ｸ": "ク", "ｹ": "ケ", "ｺ": "コ",
      "ｻ": "サ", "ｼ": "シ", "ｽ": "ス", "ｾ": "セ", "ｿ": "ソ",
      "ﾀ": "タ", "ﾁ": "チ", "ﾂ": "ツ", "ﾃ": "テ", "ﾄ": "ト",
      "ﾅ": "ナ", "ﾆ": "ニ", "ﾇ": "ヌ", "ﾈ": "ネ", "ﾉ": "ノ",
      "ﾊ": "ハ", "ﾋ": "ヒ", "ﾌ": "フ", "ﾍ": "ヘ", "ﾎ": "ホ",
      "ﾏ": "マ", "ﾐ": "ミ", "ﾑ": "ム", "ﾒ": "メ", "ﾓ": "モ",
      "ﾔ": "ヤ", "ﾕ": "ユ", "ﾖ": "ヨ",
      "ﾗ": "ラ", "ﾘ": "リ", "ﾙ": "ル", "ﾚ": "レ", "ﾛ": "ロ",
      "ﾜ": "ワ", "ｦ": "ヲ", "ﾝ": "ン",
      "ｶﾞ": "ガ", "ｷﾞ": "ギ", "ｸﾞ": "グ", "ｹﾞ": "ゲ", "ｺﾞ": "ゴ",
      "ｻﾞ": "ザ", "ｼﾞ": "ジ", "ｽﾞ": "ズ", "ｾﾞ": "ゼ", "ｿﾞ": "ゾ",
      "ﾀﾞ": "ダ", "ﾁﾞ": "ヂ", "ﾂﾞ": "ヅ", "ﾃﾞ": "デ", "ﾄﾞ": "ド",
      "ﾊﾞ": "バ", "ﾋﾞ": "ビ", "ﾌﾞ": "ブ", "ﾍﾞ": "ベ", "ﾎﾞ": "ボ",
      "ﾊﾟ": "パ", "ﾋﾟ": "ピ", "ﾌﾟ": "プ", "ﾍﾟ": "ペ", "ﾎﾟ": "ポ",
      "ｳﾞ": "ヴ", "ﾜﾞ": "ヷ", "ｦﾞ": "ヺ",
      "ｧ": "ァ", "ｨ": "ィ", "ｩ": "ゥ", "ｪ": "ェ", "ｫ": "ォ",
      "ｯ": "ッ", "ｬ": "ャ", "ｭ": "ュ", "ｮ": "ョ",
      "｡": "。", "､": "、", "ｰ": "ー", "｢": "「", "｣": "」", "･": "・",
      "ﾞ":"゛","ﾟ":"゜"
    };

    let pattern = new RegExp("(" + Object.keys(katakanaObj).join("|") + ")", "g");
    return str.replace(pattern, (match) => {
      return katakanaObj[match];
    });
  };

  useEffect(()=>{
    let tmpText = text
    if (kanaHalf === true){
      tmpText = katakanaConverter(tmpText);
    }
    if (line === true){
      tmpText = tmpText.replace(/\r\n|\n|\r/g,"");
    }
    if (spaceHalf === true){
      tmpText = tmpText.replace(/ /g,"");
    }
    if (spaceFull === true){
      tmpText = tmpText.replace(/　/g,"");
    }
    if (breakToSpace === true){
      tmpText = tmpText.replace(/\r\n|\n|\r/g," ");
    }
    setCount(tmpText.length)
    setOriginTextCount(text.length)
    setNormalizedText(tmpText);
  },[kanaHalf, line, spaceHalf, spaceFull, breakToSpace, text])

  useEffect(()=>{
    kanaHalf ? setKanaHalfColor('green') : setKanaHalfColor('gray');
    line ? setLineColor('green') : setLineColor('gray');
    spaceFull ? setSpaceFullColor('green') : setSpaceFullColor('gray');
    spaceHalf ? setSpaceHalfColor('green') : setSpaceHalfColor('gray');
    breakToSpace ? setBreakToSpaceColor('green') : setBreakToSpaceColor('gray');
  },[kanaHalf, line, spaceHalf, spaceFull, breakToSpace])
  
  useEffect(()=>{
    textAreaElement.current.focus()
  },[])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(normalizedText)
  }
  
  // 権限の関係でchrome拡張でコピーするのはこれではできないっぽい？
  // function copyText() {
  //   let text = document.getElementById("normalizedText");
  //   document.execCommand(text.value);
  // }
  return (
    <body>
      <div className="App">
        <TextArea ref={textAreaElement} placeholder="ここに入力" onChange={handleTextareaChange}></TextArea>
        <div>文字数：{originTextCount}</div>
        <div id="result">
          <h1 style={{display: "inline", fontSize: "1.5em"}}>結果</h1>
          <Popup
            content='Copied!'
            on='click'
            pinned
            size='mini'
            trigger={<Icon style={{margin: "0em 0.7em"}} name="copy" size='large' onClick={copyToClipboard} />}
          />
          <div id="normalizedText">{normalizedText}</div>
        </div>
        <br/>
        <div>文字数：{count}</div>
        <div id="buttons">
            <Button size="tiny" color={kanaHalfColor} name="setting" value="kanaHalf" checked={kanaHalf} onClick={settingChenge}>半角カナ→全角カナ</Button>

            <Button size="tiny" color={lineColor} name="setting" value="line" checked={line} onClick={settingChenge}>改行削除</Button>

            <Button size="tiny" color={spaceFullColor} name="setting" value="spaceFull" checked={spaceFull} onClick={settingChenge}>全角スペース削除</Button>

            <Button size="tiny" color={spaceHalfColor} name="setting" value="spaceHalf" checked={spaceHalf} onClick={settingChenge}>半角スペース削除</Button>

            <Button size="tiny" color={breakToSpaceColor} name="setting" value="breakToSpace" checked={breakToSpace} onClick={settingChenge}>改行→半角スペース</Button>
        </div>
      </div>
    </body>
  );
}

export default App;
