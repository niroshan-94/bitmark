import React, { useState } from 'react'

class Greetings extends React.Component {
    state = {
      iteration: 1,
      title : "",
      content :""
    };
    nextIter() {
      let iter = this.state.iteration==100? 1 :this.state.iteration+1;
      this.setState({ iteration: iter });
    }

    async callAPI(){
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.iteration}`);
            const data = await res.json();
            this.setState({ title: data.title });
            this.setState({ content: data.body });
        } catch (err) {
            console.log(err);
        }
    };
    render() {
        return(
            <div>
                <span>{this.state.iteration}</span>
                <h2>{this.state.title}</h2>
                <p>{this.state.content}</p>
                <button onClick={() => this.callAPI()}>Update</button>
                <button onClick={() => this.nextIter()}>Set Next Iteration</button>
            </div>
        )
    }
  }


function Home() {
  return (
    <div>
    <Greetings />
    </div>
  )
}

export default Home


