import React, { Component } from 'react'


class NewTask extends Component {
    state = {
        category: "",
        description: "",
        due_by: "",
        complete: false
    }

    render(){
        return(
            <div>
                This is where you create a new task.
            </div>
        )
    }

}

export default NewTask