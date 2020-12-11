import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify';
import { listTasks } from './graphql/queries';
import { createTask as createTaskMutation, updateTask as updateTaskMutation, deleteTask as deleteTaskMutation } from './graphql/mutations';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";
import Button from 'react-bootstrap/Button';

// use bootstrap to style buttons
const initialFormState = { name: '', category: '', description: '', due: '', complete: false }


function App() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [goalStatus, setGoalStatus] = useState(initialFormState.complete)
    const options = [
      { value: 'General', label: 'General' },
      { value: 'Bill', label: 'Bill' },
      { value: 'Work', label: 'Work' },
      { value: 'School', label: 'School' },
      { value: 'Workout', label: 'Workout' },
      { value: 'Shopping/Need to buy', label: 'Shopping/Need to buy' },
      { value: 'Around the house', label: 'Around the house' },
      { value: 'Appointment', label: 'Appointment' }
    ]

    useEffect(() => {
        fetchTasks();
      }, []);
    
      async function markComplete(task){
        const completeObj = {
          id: task.id,
          name: task.name,
          category: task.category,
          description: task.description,
          due: task.due,
          complete: true 
        }

        try {
        setGoalStatus(true)
        const apiData = await API.graphql({ query: updateTaskMutation, variables: { input: completeObj }});
        }
        catch (error) {
          console.log(error)
        }
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
      <header className="App-header" id="next_goal">
        <h1>Next Goal</h1>
                  <input onChange={e => setFormData({ ...formData, 'name': e.target.value})} placeholder="Goal name" value={formData.name}/><br/>
                  <Select onChange={e => setFormData({ ...formData, 'category': e[0].value}) } options={options} value={formData.category} /><br/>
                  <input onChange={e => setFormData({ ...formData, 'description': e.target.value})} placeholder="Goal description" value={formData.description}/><br/>
                  <input onChange={e => setFormData({ ...formData, 'due': e.target.value})} placeholder="Due" value={formData.due}/><br/>
                  <button onClick={createTask}>Create Goal</button>
      </header>
      <div style={{marginBottom: 80}} >
        {
            tasks.map(task => (
              <div key={task.id || task.name} style={{display: task.complete === false ? 'block' : 'none'}} className="goallist">
                <h2>{task.name}</h2>
                <i>{task.category}</i>
                <p>{task.description}</p>
                <p style={{display: formData.due !== "" ? 'block': 'none'}}>
                  {task.due}
                </p>
                <button onClick={() => markComplete(task)} className= "btn btn-block btn-primary fas fa-thumbs-up">Goal completed!</button><br/><br/>
                <Button type="button" variant="primary" className="btn btn-warning">Primary</Button>
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
