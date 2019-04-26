import React,{ Component} from 'react';
import NaviMenu from "./components/NaviMenu";
import Content from "./components/Content";
import Subject from "./components/Subject";
import ContentCreate from "./components/ContentCreate";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    
    //초기화
    
    this.state = {
      mode:'read',
      selected_content_id:3,
      subject:{title: 'WEB', sub:'World wide web!'},
      contents : [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaSCript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  last_content_id = 3;

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContentComponent() {
    if(this.state.mode === 'read') {
      return <Content data = {this.getReadContent()}></Content>
    } else if(this.state.mode === 'welcome') {
      return <Content data = {{
        title : 'Welcome',
        desc : 'Hello React!!'
      }}></Content>
    } else if(this.state.mode === 'create') {
      return <ContentCreate onSubmit={function(formData){
        console.log(formData);
        this.last_content_id = this.last_content_id + 1;
        formData.id = this.last_content_id;
        
        var newContent = Object.assign([], this.state.contents); //복제
        newContent.push(formData);
        console.log(newContent);
        this.setState({contents:newContent,
          selected_content_id:this.last_content_id,
          mode:'read'
        });
 
      }.bind(this)}></ContentCreate>
    }
  }

  getControlComponent() {
    return [
      <a key="1" href="/create" onClick={function(ev){
        ev.preventDefault();
        this.setState({mode:'create'});
      }.bind(this)}>create</a>,
      <a key="2" href="/update" onClick={function(ev){
        ev.preventDefault();
        this.setState({mode:'update'});        
      }.bind(this)}>update</a>,
      <input key="3"type="button" href="/delete" onClick={function(){
        var newContents = this.state.contents.filter(function(el){
          if(el.id !== this.state.selected_content_id){
            return el;
          }
        }.bind(this));
        this.setState({
          contents:newContents,
          mode:'welcome'
      });
      }.bind(this)} value="delete"></input>
    ];
  }
  
  render() {
    console.log('App render');
    var content = this.getReadContent();
    console.log(content);
    return (
      <div className="App">
        <Subject onClick={function(){
          this.setState({
            mode:'welcome'
          });
        }.bind(this)} title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <NaviMenu onSelect={function(id){
          console.log('App', id)
          this.setState({
            selected_content_id : id,
            mode : 'read'
          });
        }.bind(this)} data={this.state.contents}></NaviMenu>
        {this.getControlComponent()}
        {this.getContentComponent()}
      </div>
    );
  }
}

export default App;
