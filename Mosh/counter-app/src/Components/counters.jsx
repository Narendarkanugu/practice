import React, { Component } from 'react';  
import Counter  from './counter';     


class Counters extends Component {
    state = { 
        Counters: [
            { id:1, value:4 },
            { id:2, value:0 },
            { id:3, value:0 },
            { id:4, value:0 }
        ]
     }


     handleDelete =  counterId  => {
        const Counters =  this.state.Counters.filter(c => c.id !== counterId);
        this.setState({Counters});
    }
 
    render() { 
        return ( 
            <div>
                {this.state.Counters.map(counter => 
                <Counter 
                    key={counter.id} 
                    onDelete={this.handleDelete} 
                    value={counter.value} 
                    id={counter.id} 
                />  
                )}
            </div>
         );
    }
}
 
export default Counters;