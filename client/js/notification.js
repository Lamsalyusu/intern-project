// async function loadNotifications() {
//   try {
//     const res = await api('/notifications?unreadOnly=true&page=1&limit=20');
//     const list = document.getElementById('notificationsList');
//     const notifs = res.data || [];

//     if (notifs.length === 0) {
//       list.innerHTML = '<p>No notifications.</p>';
//       return;
//     }

//     list.innerHTML = ''
//     notifs.forEach(n => {
//       <div class="task-card" style="display:flex;justify-content:space-between;align-items:center;">
//         <div>
//           <strong>${escapeHtml(n.type)}</strong>
//           <p style="font-size:14px;color:#666;">${JSON.stringify(n.payload)}</p>
//           <time style="font-size:12px;color:#999;">${new Date(n.created_at).toLocaleString()}</time>
//         </div>
//         <!-- <button onclick="markRead('${n.id}')" style="width:auto;">Mark Read</button> -->
//       </div>
//     `).join('');
//   } catch (error) {
//     console.error(error);
//   }
// }

async function loadNotifications() {
  try {
    const res = await api('/notifications?unreadOnly=true&page=1&limit=20');
    const list = document.getElementById('notificationsList');
    const notifs = res.data || [];

    list.innerHTML = '';

    if (notifs.length === 0) {
      list.innerHTML = '<p>No notifications.</p>';
      return;
    }

    notifs.forEach(n => {
      const row = document.createElement('div');
      row.className = 'task-card';
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';

      row.innerHTML = `
        <div>
          <strong>${escapeHtml(n.type)}</strong>
          <p style="font-size:14px;color:#666;">${escapeHtml(JSON.stringify(n.payload))}</p>
          <time style="font-size:12px;color:#999;">${new Date(n.created_at).toLocaleString()}</time>
        </div>
      `;

      const btn = document.createElement('button');
      btn.textContent = 'Mark Read';
      btn.style.width = 'auto';
      btn.addEventListener('click', () => markRead(n.id));

      row.appendChild(btn);
      list.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadUnreadCount() {
  try {
    const res = await api('/notifications/unread/count');
    const count = res.data?.count || 0;
    const badge = document.getElementById('unreadBadge');
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline';
    }
  } catch (error) {
    console.error(error);
  }
}

async function markRead(id) {
  try {
    await api(`/notifications/${id}/read`, { method: 'PUT' });
    loadNotifications();
    loadUnreadCount();
  } catch (error) {
    alert(error .message);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById('btnLogout')?.addEventListener('click', logout);