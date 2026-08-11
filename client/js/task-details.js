const params = new URLSearchParams(window.location.search);
const taskId = params.get('id');

async function initTaskDetail() {
  if (!taskId) return window.location.href = 'dashboard.html';

  // Load task
  try {
    const res = await api(`/tasks/${taskId}`);
    const task = res.data;
    document.getElementById('taskInfo').innerHTML = `
      <h1>${escapeHtml(task.title)}</h1>
      <p>${escapeHtml(task.description || '')}</p>
      <div class="task-meta">
        <span class="badge badge-${task.status}">${task.status}</span>
        <span class="badge badge-${task.priority}">${task.priority}</span>
        <span>Due: ${task.due_date ? new Date(task.due_date).toLocaleString() : '—'}</span>
      </div>
    `;
  } catch (err) {
    alert(err.message);
    return;
  }

  loadCollaborators();
  loadMessages();
  initChat(taskId);
}

// async function loadCollaborators() {
//   try {
//     const res = await api(`/tasks/${taskId}/collaborators`);
//     const list = document.getElementById('collaborators');
//     const collabs = res.data || [];
//     if (collabs.length === 0) {
//       list.innerHTML = '<p style="color:#666;font-size:14px;">No collaborators yet.</p>';
//       return;
//     }
//     list.innerHTML = collabs.map(c => `
//       <div style="display:flex;justify-content:space-between;padding:8px;background:#f9f9f9;border-radius:6px;margin-bottom:6px;">
//         <span>${escapeHtml(c.user?.name || c.user_id)}</span>
//         <button onclick="removeCollab('${c.user_id}')" style="width:auto;background:#dc2626;padding:4px 8px;font-size:12px;">Remove</button>
//       </div>
//     `).join('');
//   } catch (err) {
//     console.error(err);
//   }
// }


async function loadCollaborators() {
  try {
    const res = await api(`/tasks/${taskId}/collaborators`);
    const list = document.getElementById('collaborators');
    const collabs = res.data || [];

    list.innerHTML = '';

    if (collabs.length === 0) {
      list.innerHTML = '<p style="color:#666;font-size:14px;">No collaborators yet.</p>';
      return;
    }

    collabs.forEach(c => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;padding:8px;background:#f9f9f9;border-radius:6px;margin-bottom:6px;';

      row.innerHTML = `<span>${escapeHtml(c.user?.name || c.user_id)}</span>`;

      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.style.cssText = 'width:auto;background:#dc2626;padding:4px 8px;font-size:12px;';
      btn.addEventListener('click', () => removeCollab(c.user_id));

      row.appendChild(btn);
      list.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('addCollabForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('collabEmail').value;
  try {
    await api(`/tasks/${taskId}/collaborators`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    document.getElementById('collabEmail').value = '';
    loadCollaborators();
  } catch (err) {
    alert(err.message);
  }
});

async function removeCollab(userId) {
  if (!confirm('Remove this collaborator?')) return;
  try {
    await api(`/tasks/${taskId}/collaborators/${userId}`, { method: 'DELETE' });
    loadCollaborators();
  } catch (err) {
    alert(err.message);
  }
}

async function loadMessages() {
  try {
    const res = await api(`/tasks/${taskId}/messages?page=1&limit=50`);
    const msgs = res.data?.rows || res.data || [];
    const box = document.getElementById('chatMessages');
    box.innerHTML = msgs.map(m => renderMsg(m)).join('');
    box.scrollTop = box.scrollHeight;
  } catch (err) {
    console.error(err);
  }
}

function renderMsg(m) {
  return `
    <div class="msg">
      <strong>${escapeHtml(m.sender?.name || 'Unknown')}</strong>
      <time>${new Date(m.created_at).toLocaleTimeString()}</time>
      <p>${escapeHtml(m.body)}</p>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}