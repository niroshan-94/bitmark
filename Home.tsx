import React, { useState } from 'react'
import aaaa from './api/security'
import type { NextApiRequest, NextApiResponse } from 'next'

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

type Data = {
    isList: boolean,
    success: boolean,
    results: object
}

function Home() {
    const callAPI = async () => {
        try {
            const res = await fetch('https://localhost/cisi.security/api/Authentication/SignIn', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": "791292",
                    "password": "Potato#1",
                    "clientID": "CISI/2157",
                    "scope": "api impersonate"
                  }),
              });
            const data = await res.json();
            console.log(data);
            console.log(await aaaa(new URL('https://localhost/cisi.security/api/Authentication/SignIn'),{
                "username": "791292",
                "password": "Potato#1",
                "clientID": "CISI/2157",
                "scope": "api impersonate"
              }))
        } catch (err) {
            console.log(err);
        }
    };
  return (
    <div>
        <button onClick={callAPI}>Update</button>
    <Greetings />
    <Signin />
    </div>
  )
}

export default Home

class Signin extends React.Component {
    state = {
      iteration: 1,
      pass : "",
      userName :"",
      accessToken :"",
      error :""
    };
    nextIter() {
      let iter = this.state.iteration==100? 1 :this.state.iteration+1;
      this.setState({ iteration: iter });
    }

    async callAPI(){
        try {
            const res = await fetch('https://localhost/cisi.security/api/Authentication/SignIn', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": `${this.state.userName}`,
                    "password": `${this.state.pass}`,
                    "clientID": "CISI/2157",
                    "scope": "api impersonate"
                  }),
              });
            const data = await res.json();
            const res1 = await fetch('https://localhost/cisi.security/api/Authentication/Token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "authToken": `${data.results.authToken}`,
                    "clientID": "CISI/2157",
                    "clientSecret": "70355fbe961b37e5e66c3081573f3a3b20543a521513a4ff4c41bd99669990f7"
                  }),
              });
            const data1 = await res1.json();
            this.setState({ accessToken: data1.results.accessToken });
        } catch (err) {
            console.log(err);
        }
    };

    setValue(content = "te") {
        this.setState({ userName: content });
    }

    setValue1(content = "serf") {
        this.setState({ pass: content });
    }


    render() {
        return(
            <div>
                <input
                type="text"
                onKeyUp={e => this.setValue(e.currentTarget.value) }
                />
                <input
                type="password"
                onKeyUp={e =>this.setValue1(e.currentTarget.value) }
                />
                <button onClick={() => this.callAPI()}>login</button>
                <span>{this.state.accessToken}</span>
            </div>
        )
    }
  }

