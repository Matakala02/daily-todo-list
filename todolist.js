
  // Get references
  const todoCheckboxes = document.querySelectorAll('.todo input[type="checkbox"]');
  const priorityCheckboxes = document.querySelectorAll('.priority input[type="checkbox"]');
  const notes = document.querySelector('#notes');
  const reminder = document.querySelector('#reminder');
  const dateInput = document.querySelector('input[type="date"]');
  const saveBtn = document.getElementById('saveBtn');

  // Save everything when button is clicked
  saveBtn.addEventListener('click', () => {
    // Save To-Do checkbox states
    todoCheckboxes.forEach((checkbox, index) => {
      localStorage.setItem(`todo-${index}`, checkbox.checked);
    });

    // Save Priority checkbox states
    priorityCheckboxes.forEach((checkbox, index) => {
      localStorage.setItem(`priority-${index}`, checkbox.checked);
    });

    // Save Notes and Reminder
    localStorage.setItem('notes', notes.value);
    localStorage.setItem('reminder', reminder.value);

    // Save Date (optional)
    if (dateInput) {
      localStorage.setItem('selectedDate', dateInput.value);
    }

    alert("Saved successfully!");
  });

  // Load saved data on page load
  window.onload = () => {
    todoCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = localStorage.getItem(`todo-${index}`) === 'true';
    });

    priorityCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = localStorage.getItem(`priority-${index}`) === 'true';
    });

    notes.value = localStorage.getItem('notes') || '';
    reminder.value = localStorage.getItem('reminder') || '';
    if (dateInput) {
      dateInput.value = localStorage.getItem('selectedDate') || '';
    }
  };
  const downloadBtn = document.getElementById('downloadBtn');

  downloadBtn.addEventListener('click', () => {
    const date = document.querySelector('input[type="date"]').value;
    const notes = document.getElementById('notes').value;
    const reminder = document.getElementById('reminder').value;

    let content = `Date: ${date || 'Not set'}\n\n`;

    content += `TO-DO:\n`;
    document.querySelectorAll('.todo input[type="text"]').forEach((input, i) => {
      const checked = document.querySelectorAll('.todo input[type="checkbox"]')[i].checked;
      content += `[${checked ? 'X' : ' '}] ${input.value}\n`;
    });

    content += `\nPRIORITY:\n`;
    document.querySelectorAll('.priority input[type="text"]').forEach((input, i) => {
      const checked = document.querySelectorAll('.priority input[type="checkbox"]')[i].checked;
      content += `[${checked ? 'X' : ' '}] ${input.value}\n`;
    });

    content += `\nNOTES:\n${notes}\n`;
    content += `\nREMINDER:\n${reminder}\n`;

    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Todo-${date || 'Today'}.txt`;
    a.click();

    URL.revokeObjectURL(url); // Clean up
  });