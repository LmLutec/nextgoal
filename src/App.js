import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listTasks } from './graphql/queries';
import { createTask as createTaskMutation, updateTask as updateTaskMutation, deleteTask as deleteTaskMutation } from './graphql/mutations';
import React, { useState, useEffect } from 'react';

const initialFormState = { name: '', category: '', description: '', due: '', complete: false }


function App() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [goalStatus, setGoalStatus] = useState(initialFormState.complete)

    useEffect(() => {
        fetchTasks();
      }, []);


      // mutation UpdateTask(
      //   $input: UpdateTaskInput!
      //   $condition: ModelTaskConditionInput
      // ) {
      //   updateTask(input: $input, condition: $condition) {
      //     id
      //     name
      //     category
      //     description
      //     due
      //     complete
      //     createdAt
      //     updatedAt
      //   }
      // }
    
      function markComplete(task){
        const newTasksArray = tasks.filter(task => task.id !== id);
        setGoalStatus(true)
        setTasks(newTasksArray)
        const apiData = await API.graphql({ query: updateTaskMutation});
        console.log(apiData)
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
            <div key={task.id || task.name} style={{display: task.complete === false ? 'block' : 'none'}}>
              <h2>{task.name}</h2>
              <p>{task.description}</p>
              <p style={{display: formData.due != "" ? 'block': 'none'}}>
                {task.due}
              </p>
              <button onClick={() => markComplete(task)}>Goal completed!</button><br/>
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
