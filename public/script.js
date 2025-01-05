fetch('/api/contributions')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('contribution-grid');

    data.forEach(week => {
      week.forEach(day => {
        const div = document.createElement('div');
        div.className = 'day';
        div.style.backgroundColor = day.color || '#161b22';
        grid.appendChild(div);
      });
    });
  })
  .catch(err => console.error('Error loading contributions:', err));
