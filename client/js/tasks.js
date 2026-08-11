redirectIfNotAuth();

async function loadTasks() {
  const status = document.getElementById('filterStatus')?.value || '';
  const priority = document.getElementById('filterPriority')?.value || '';
  
  let url = '/tasks?page=1&limit=20';
  if (status) url += `&status=${status}`;
  if (priority) url += `&priority=${priority}`;

  try {
    const res = await api(url);
    const tasks = res.data?.rows || [];  // ← FIX: access .tasks
    const list = document.getElementById('tasksList');
    list.innerHTML = '';

    if (tasks.length === 0) {
      list.innerHTML = '<p>No tasks found.</p>';
      return;
    }

    tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      card.addEventListener('click', () => {
        window.location.href = `task-detail.html?id=${task.id}`;
      });
      card.innerHTML = `
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.description || '')}</p>
        <div class="task-meta">
          <span class="badge badge-${task.status}">${task.status}</span>
          <span class="badge badge-${task.priority}">${task.priority}</span>
          <span>Due: ${task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}</span>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    alert(err.message);
  }
}

async function loadSharedTasks() {
  try {
    const res = await api('/tasks/shared-with-me');
    const collabRows = res.data || [];
    const list = document.getElementById('sharedTasksList');
    list.innerHTML = '';

    if (collabRows.length === 0) {
      list.innerHTML = '<p>No shared tasks yet.</p>';
      return;
    }

    collabRows.forEach(row => {
      const task = row.Task || row.task;
      if (!task) return;

      const card = document.createElement('div');
      card.className = 'task-card';
      card.addEventListener('click', () => {
        window.location.href = `task-detail.html?id=${task.id}`;
      });
      card.innerHTML = `
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.description || '')}</p>
        <div class="task-meta">
          <span class="badge badge-${task.status}">${task.status}</span>
          <span class="badge badge-${task.priority}">${task.priority}</span>
          <span>Due: ${task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}</span>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    document.getElementById('sharedTasksList').innerHTML = '<p>Could not load shared tasks.</p>';
  }
}

function openModal() {
  document.getElementById('modal').classList.add('active');
}
function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

// const createForm = document.getElementById('createTaskForm');
// if (createForm) {
//   createForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const body = {
//       title: document.getElementById('title').value,
//       description: document.getElementById('description').value,
//       status: document.getElementById('status').value,
//       priority: document.getElementById('priority').value,
//       due_date: document.getElementById('due_date').value || null,
//       reminder_at: document.getElementById('reminder_at').value || null,
//     };

//     try {
//       await api('/tasks', { method: 'POST', body: JSON.stringify(body) });
//       closeModal();
//       createForm.reset();
//       loadTasks();
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

const createForm = document.getElementById('createTaskForm');
if (createForm) {
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dueDateVal = document.getElementById('due_date').value;
    const reminderVal = document.getElementById('reminder_at').value;
    
    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      priority: document.getElementById('priority').value,
      due_date: dueDateVal ? new Date(dueDateVal).toISOString() : null,
      reminder_at: reminderVal ? new Date(reminderVal).toISOString() : null,
    };

    try {
      await api('/tasks', { method: 'POST', body: JSON.stringify(body) });
      closeModal();
      createForm.reset();
      loadTasks();
    } catch (err) {
      alert(err.message);
    }
  });
}


document.getElementById('btnFilter')?.addEventListener('click', loadTasks);
document.getElementById('btnOpenModal')?.addEventListener('click', openModal);
document.getElementById('btnCloseModal')?.addEventListener('click', closeModal);
document.getElementById('btnLogout')?.addEventListener('click', logout);

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load tasks on page load
loadTasks();
loadSharedTasks();