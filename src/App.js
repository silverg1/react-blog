import { useState } from 'react';
import './App.scss';

function App() {
  let [items, setItems] = useState([
    {title: '등산화 추천', likeNum: 0},
    {title: '돈까스 맛집', likeNum: 0},
    {title: '리액트 공부중', likeNum: 0},
  ]);
  let [modalState, setModalState] = useState({
    view: false, title: '글제목', content: '글내용', id: -1
  })
  let [inputValue, setInputValue] = useState('');

  const addItem = () => {
    let copyItems = [...items];
    let newItem = {title: inputValue, likeNum: 0};
    copyItems.unshift(newItem);
    setItems(copyItems);
    setInputValue('');
  }
    
  return (
    <div className="App">
      <div className="nav">리액트로 만들어본 블로그</div>
      <div className="list">
        {items.map((item, idx) => {
          return (
            <>
            <div className="item" key={idx} onClick={() => {
              let copy = {...modalState};
              if(copy.view === true && copy.id !== idx) copy.view = true;
              else copy.view = !copy.view;
              copy.id = idx;
              copy.title = item.title;
              setModalState(copy);
            }}>
              <h5>{item.title} <span className="like" onClick={(e) => {
                e.stopPropagation();
                let copyItems = [...items];
                copyItems[idx].likeNum++;
                setItems(copyItems);
              }}>💜{item.likeNum}</span></h5>
              <p>6월 11일 발행</p>
              <button className="delete" onClick={(e) => {
                e.stopPropagation();
                let copyItems = [...items];
                copyItems.splice(idx, 1);
                setItems(copyItems);
              }}>삭제</button>
            </div>
            </>
          );
        })}
      </div>
      <div className="btm">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          // onKeyUp={addItem}
        />
        <button onClick={addItem}>글 발행</button>
      </div>
      { modalState.view && <Modal modal={modalState}/> }
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h5>{props.modal.title}</h5>
      <p>{props.modal.content}</p>
    </div>
  );
}

export default App;
