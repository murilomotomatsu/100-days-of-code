import { useState } from 'react';
import './Calendar.css';



/* Calendar component */
const Calendar100Days = () => {
  const [completedDays, setCompletedDays] = useState([2]);

  /* Links from github  */
  const projectLinks = {
    1: "https://github.com/murilomotomatsu/100-days-of-code/commit/d0660148bd8201b996ba759db53c06cce694cc13",
    2: "https://github.com/murilomotomatsu/100-days-of-code/commit/d0660148bd8201b996ba759db53c06cce694cc13",
  };

  /* Open project link */
  const openCodeDay = (day) => {
    if (completedDays.some(completedDay => completedDay >= day)) {
      const projectLink = projectLinks[day]; 
      if (projectLink) {
        window.open(projectLink, "_blank");
      }
    }
  };

  /* Mark as completed */
  const days = () => {
    const totalDays = Math.max(...completedDays, 0); 
    let days = [];
    for (let i = 1; i <= 100; i++) {
      days.push(
        <div 
          key={i} 
          className={`day ${i <= totalDays ? 'completed' : ''}`}
          onClick={() => openCodeDay(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  /* Div calendar */
  return (
    <div className="calendar">
      {days()}
    </div>
  );
};

export default Calendar100Days;
