import React from 'react';

export default class Example3 extends React.Component {
  state = {
    text: '',
  };

  handlChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onclick = () => {
    const textbox = {
      inText: this.state.text,
    };
    fetch('http://localhost:3001/text', {
      method: 'post', //통신방법
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(textbox), //textbox라는 객체를 보냄
    })
      .then((res) => res.json()) // response를 받아 text state에 저장.
      .then((json) => {
        console.log(json);
        this.setState({
          text: json.text,
        });
      });
  };

  render() {
    return (
      <div>
        <h3>아이디 입력</h3>
        <input name="text" onChange={this.handlChange}></input>
        <button onClick={this.onclick}>전송</button>
      </div>
    );
  }
}
