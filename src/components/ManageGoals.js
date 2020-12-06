import { API } from 'aws-amplify';
import { listTasks } from './graphql/queries';
import { createTask as createTaskMutation, deleteTask as deleteTaskMutation } from './graphql/mutations';
import React, { useState, useEffect } from 'react';

const initialFormState = { name: '', category: '', description: '', due: '', complete: false }

function ManageGoals() {
    // const [tasks, setTasks] = useState([]);
    // const [formData, setFormData] = useState(initialFormState);

    // useEffect(() => {
    //     fetchTasks();
    //   }, []);
    
    //   async function fetchTasks() {
    //     const apiData = await API.graphql({ query: listTasks });
    //     console.log(apiData)
    //     // setNotes(apiData.data.listNotes.items);
    //   }
    
    //   async function createTask() {
    //     if (!formData.name || !formData.category) return;
    //     await API.graphql({ query: createTaskMutation, variables: { input: formData } });
    //     setTasks([ ...tasks, formData ]);
    //     setFormData(initialFormState);
    //   }
    
    //   async function deleteTask({ id }) {
    //     const newTasksArray = tasks.filter(task => task.id !== id);
    //     setTasks(newTasksArray);
    //     await API.graphql({ query: deleteTaskMutation, variables: { input: { id } }});
    //   }

    //     return(
    //         <div>
    //             <h1>Next Goal</h1>
    //             <input onChange={e => setFormData({ ...formData, 'name': e.target.value})} placeholder="Goal name" value={formData.name}/>
    //             <input onChange={e => setFormData({ ...formData, 'category': e.target.value})} placeholder="Category" value={formData.category}/>
    //             <input onChange={e => setFormData({ ...formData, 'description': e.target.value})} placeholder="Goal description" value={formData.description}/>
    //             <input onChange={e => setFormData({ ...formData, 'due': e.target.value})} placeholder="Due" value={formData.due}/>
    //             <button onClick={createTask}>Create Goal</button>
    //         </div>  
    //     )
}



export default ManageGoals