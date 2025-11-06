// Notification System

function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notifications');
    if (!container) return;

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const messageEl = document.createElement('span');
    messageEl.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => removeNotification(notification);

    notification.appendChild(messageEl);
    notification.appendChild(closeBtn);

    container.appendChild(notification);

    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }

    return notification;
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Clear all notifications
function clearNotifications() {
    const container = document.getElementById('notifications');
    if (container) {
        container.innerHTML = '';
    }
}
