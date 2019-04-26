import React,{ Component} from 'react';

class ContentCreate extends Component {    
    state = {
        title:'',
        desc:''
    }
    changeFormHandler(ev) {
        this.setState({[ev.target.name]:ev.target.value});        
    }
    render() {
        return(
            <article>
                <form onSubmit={function(ev){
                    ev.preventDefault();       
                    this.props.onSubmit(this.state);
                }.bind(this)}>
                    <p><input type="text" placeholder="title" name="title" value={this.state.title} onChange={this.changeFormHandler.bind(this)}>
                    </input></p>
                    <p><textarea placeholder="description" name="desc" value={this.state.desc} onChange={this.changeFormHandler.bind(this)}></textarea></p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        );
    }
}

export default ContentCreate;