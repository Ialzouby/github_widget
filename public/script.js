fetch('/api/contributions')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('contribution-grid');

    data.forEach(week => {
      week.forEach(day => {
        const div = document.createElement('div');
        div.className = 'day';
        
        // Set the background color based on the day data
        div.style.backgroundColor = day.color || '#161b22';
        
        // Set the date and contribution count as data attributes
        div.setAttribute('data-date', day.date); // Assuming day.date is the date
        div.setAttribute('data-contributionCount', day.contributionCount); // Assuming day.contributionCount holds the count
        
        // Append the day div to the grid
        grid.appendChild(div);
      });
    });
  })
  .catch(err => console.error('Error loading contributions:', err));
