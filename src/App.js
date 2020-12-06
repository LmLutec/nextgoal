import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listTasks } from './graphql/queries';
import { createTask as createTaskMutation, deleteTask as deleteTaskMutation } from './graphql/mutations';
import React, { useState, useEffect } from 'react';

const initialFormState = { name: '', category: '', description: '', due: '', complete: false }


function App() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [goalStatus, setGoalStatus] = useState(initialFormState.complete)

    useEffect(() => {
        fetchTasks();
      }, []);
    
      function markComplete(){
        setGoalStatus(true)
      }


      async function fetchTasks() {
        const apiData = await API.graphql({ query: listTasks });
        console.log(apiData)
        setTasks(apiData.data.listTasks.items);
      }
    
      async function createTask() {
        if (!formData.name || !formData.category) return;
        await API.graphql({ query: createTaskMutation, variables: { input: formData } });
        setTasks([ ...tasks, formData ]);
        setFormData(initialFormState);
      }
    
      async function deleteTask({ id }) {
        const newTasksArray = tasks.filter(task => task.id !== id);
        setTasks(newTasksArray);
        await API.graphql({ query: deleteTaskMutation, variables: { input: { id } }});
      }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Next Goal</h1>
                 <input onChange={e => setFormData({ ...formData, 'name': e.target.value})} placeholder="Goal name" value={formData.name}/><br/>
                 <input onChange={e => setFormData({ ...formData, 'category': e.target.value})} placeholder="Category" value={formData.category}/><br/>
                 <input onChange={e => setFormData({ ...formData, 'description': e.target.value})} placeholder="Goal description" value={formData.description}/><br/>
                 <input onChange={e => setFormData({ ...formData, 'due': e.target.value})} placeholder="Due" value={formData.due}/><br/>
                 <button onClick={createTask}>Create Goal</button>
      </header>
      <div style={{marginBottom: 30}}>
        {
          tasks.map(task => (
            <div key={task.id || task.name}>
              <h2>{task.name}</h2>
              <p>{task.description}</p>
              <p style={{display: formData.due != "" ? 'block': 'none'}}>
                {task.due}
              </p>
              <button onClick={() => markComplete()}>Goal completed!</button>
              <button onClick={() => deleteTask(task)}>Delete Goal</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
