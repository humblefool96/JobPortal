import React from 'react';
import './App.css';
import Jobs from './Jobs'

const mockJobs = [
  {title: 'SDE1', company: 'Google'},
  {title: 'SDE1', company: 'Apple'},
  {title: 'SDE1', company: 'facebook'}
]

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCb(json);
  // console.log({json});
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
