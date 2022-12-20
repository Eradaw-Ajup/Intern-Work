import React from 'react';
import PolicySelect from './Components/policy_select.js'



class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id:0,
            name:""
        }
        this.savePolicy = this.savePolicy.bind(this);
    }
    savePolicy(item){
        this.state = item;
        this.setState({});
    }
    render () {
        return (
           <div style = {{border: '50px  solid rgba(0, 0, 0, 0)'}}>
           <PolicySelect
            savePolicy = {this.savePolicy}
           />
           </div>
        );
    }

}

export default App;
