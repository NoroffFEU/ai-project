import { getFromLocalStorage } from '../utils/localStorage.mjs';
import { isLoggedIn as checkIsLoggedIn } from '../auth/isLoggedIn.mjs';

const BOT_NAME = 'AI Bot Name';

let mockConversation = [];
let currentMessageIndex = 0;
let isInteractiveMockMode = false;

async function loadTaskData(taskId) {
  try {
    const response = await fetch('./data/mockData.json');
    if (!response.ok) {
      throw new Error(`Failed to load task data: ${response.status}`);
    }
    const data = await response.json();
    
    const task = data.tasks.find(t => {
      const normalizedTitle = t.title.toLowerCase().replace(/\s+/g, '-');
      const normalizedTitleNoThe = t.title.toLowerCase().replace(/\s+the\s+/g, '-').replace(/\s+/g, '-');
      return normalizedTitle === taskId || normalizedTitleNoThe === taskId;
    });
    
    return task;
  } catch (error) {
    return null;
  }
}

async function loadChatMockData(taskId = 'workout') {
  try {
    const response = await fetch('./data/chatMockData.json');
    if (!response.ok) {
      throw new Error(`Failed to load chat mock data: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.tasks && data.tasks[taskId]) {
      return data.tasks[taskId];
    } else {
      return data.tasks.workout || { conversation: [] };
    }
  } catch (error) {
    return null;
  }
}


async function loadMotivationData() {
  try {
    const response = await fetch('./data/motivateMockData.json');
    if (!response.ok) {
      throw new Error(`Failed to load motivation data: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

function getTaskIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('taskId') || 'workout';
}

function createChatMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message mb-3 d-flex ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'} align-items-start gap-2`;
  
  const iconDiv = document.createElement('div');
  iconDiv.className = 'message-icon';
  iconDiv.style.minWidth = '36px';
  iconDiv.style.width = '36px';
  iconDiv.style.height = '36px';
  iconDiv.style.borderRadius = '50%';
  iconDiv.style.display = 'flex';
  iconDiv.style.alignItems = 'center';
  iconDiv.style.justifyContent = 'center';
  iconDiv.style.fontSize = '18px';
  
  if (sender === 'bot') {
    iconDiv.style.backgroundColor = '#e9ecef';
    iconDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';
  } else {
    iconDiv.style.backgroundColor = '#0d6efd';
    iconDiv.style.color = 'white';
    iconDiv.innerHTML = '<i class="fa-solid fa-user"></i>';
  }
  
  const contentWrapper = document.createElement('div');
  contentWrapper.style.flex = '1';
  contentWrapper.style.maxWidth = '75%';
  
  const senderName = document.createElement('div');
  senderName.className = 'message-sender small text-muted mb-1';
  senderName.style.fontWeight = '600';
  senderName.textContent = sender === 'bot' ? BOT_NAME : 'Username';
  
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender === 'bot' ? 'bg-light' : 'bg-primary text-white'} p-3 rounded`;
  bubble.style.wordWrap = 'break-word';
  
  const lines = message.split('\n');
  lines.forEach((line, index) => {
    if (index > 0) {
      bubble.appendChild(document.createElement('br'));
    }
    const textNode = document.createTextNode(line);
    bubble.appendChild(textNode);
  });
  
  contentWrapper.appendChild(senderName);
  contentWrapper.appendChild(bubble);
  
  messageDiv.appendChild(iconDiv);
  messageDiv.appendChild(contentWrapper);
  
  return messageDiv;
}

function displayChatMessages(messages) {
  const chatContainer = document.getElementById('chatMessages');
  if (!chatContainer) {
    return;
  }
  
  chatContainer.innerHTML = '';
  
  messages.forEach((msg, index) => {
    const messageElement = createChatMessage(msg.message, msg.sender);
    chatContainer.appendChild(messageElement);
  });
  
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateTaskHeader(task) {
  if (!task) return;
  
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');
  const taskDueDate = document.getElementById('taskDueDate');
  const colorBadge = document.getElementById('colorBadge');
  
  if (taskTitle) taskTitle.textContent = task.title;
  if (taskDescription) taskDescription.textContent = task.description;
  
  if (taskDueDate && task.dueDate) {
    const date = new Date(task.dueDate);
    taskDueDate.textContent = `Due: ${date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }
  
  if (colorBadge && task.color) {
    colorBadge.style.backgroundColor = task.color;
    colorBadge.textContent = task.category || 'Task';
  }
}

function addMessageToChat(message, sender) {
  const chatContainer = document.getElementById('chatMessages');
  if (!chatContainer) return;
  
  const messageElement = createChatMessage(message, sender);
  chatContainer.appendChild(messageElement);
  
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showNextMockMessage() {
  const userInput = document.getElementById('userInput');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!isInteractiveMockMode || currentMessageIndex >= mockConversation.length) {
    if (userInput) {
      userInput.value = 'End of demo';
      userInput.disabled = true;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
    }
    return;
  }
  
  const currentMsg = mockConversation[currentMessageIndex];
  
  if (currentMsg.sender === 'user') {
    if (userInput) {
      userInput.value = currentMsg.message;
      userInput.disabled = true;
    }
    
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  } else if (currentMsg.sender === 'bot') {
    addMessageToChat(currentMsg.message, currentMsg.sender);
    currentMessageIndex++;
    
    if (currentMessageIndex < mockConversation.length && 
        mockConversation[currentMessageIndex].sender === 'bot') {
      setTimeout(() => showNextMockMessage(), 300);
    } else {
      showNextMockMessage();
    }
  }
}

function handleMockSubmit() {
  const userInput = document.getElementById('userInput');
  const submitBtn = document.getElementById('submitBtn');
  
  if (!isInteractiveMockMode || currentMessageIndex >= mockConversation.length) {
    return;
  }
  
  const currentMsg = mockConversation[currentMessageIndex];
  
  if (currentMsg.sender === 'user') {
    addMessageToChat(currentMsg.message, currentMsg.sender);
    
    if (userInput) {
      userInput.value = '';
    }
    
    if (submitBtn) {
      submitBtn.disabled = true;
    }
    
    currentMessageIndex++;
    
    setTimeout(() => showNextMockMessage(), 500);
  }
}

async function initializeChatInterface() {
  const taskId = getTaskIdFromUrl();
  const taskData = await loadTaskData(taskId);
  if (taskData) {
    updateTaskHeader(taskData);
  }
  
  const isLoggedIn = checkIsLoggedIn();
  
  const userInput = document.getElementById('userInput');
  const motivateBtn = document.getElementById('motivateBtn');
  const submitBtn = document.getElementById('submitBtn');
  const loginPrompt = document.getElementById('loginPrompt');
  const chatContainer = document.getElementById('chatMessages');
  
  if (!isLoggedIn) {
    const mockData = await loadChatMockData(taskId);
    
    if (mockData && mockData.conversation) {
      isInteractiveMockMode = true;
      mockConversation = mockData.conversation;
      currentMessageIndex = 0;
      
      if (chatContainer) {
        chatContainer.innerHTML = '';
      }
      
      showNextMockMessage();
      
    } else {
      if (chatContainer) {
        chatContainer.innerHTML = '<p class="text-danger text-center">Error loading chat data. Please refresh the page.</p>';
      }
    }
    
    if (userInput) {
      userInput.disabled = true;
      userInput.placeholder = '...';
    }
    if (motivateBtn) {
      motivateBtn.disabled = false;
      motivateBtn.style.opacity = '0.65';
      motivateBtn.style.cursor = 'pointer';
    }
    if (loginPrompt) loginPrompt.style.display = 'block';
    
  } else {
    if (userInput) {
      userInput.disabled = false;
      userInput.placeholder = 'Type your message...';
    }
    if (motivateBtn) {
      motivateBtn.disabled = false;
      motivateBtn.style.opacity = '1';
      motivateBtn.style.cursor = 'pointer';
      motivateBtn.removeAttribute('data-bs-toggle');
      motivateBtn.removeAttribute('data-bs-original-title');
      motivateBtn.removeAttribute('title');
    }
    if (submitBtn) submitBtn.disabled = false;
    if (loginPrompt) loginPrompt.style.display = 'none';
    
    if (chatContainer) {
      chatContainer.innerHTML = '<p class="text-muted text-center">Start a conversation with the AI assistant</p>';
    }
  }
}

async function handleMotivateClick() {
  const motivationData = await loadMotivationData();
  if (motivationData && motivationData.responses) {
    const randomIndex = Math.floor(Math.random() * motivationData.responses.length);
    const motivation = motivationData.responses[randomIndex];
    addMessageToChat(motivation.message, 'bot');
  }
}

function showLoginModal() {
  const modal = document.getElementById('loginModal');
  
  if (modal) {
    if (typeof bootstrap !== 'undefined') {
      let bsModal = bootstrap.Modal.getInstance(modal);
      if (!bsModal) {
        bsModal = new bootstrap.Modal(modal);
      }
      bsModal.show();
    } else {
      window.location.href = './login.html';
    }
  } else {
    window.location.href = './login.html';
  }
}

function handleSubmitClick() {
  if (isInteractiveMockMode) {
    handleMockSubmit();
    return;
  }
  
  const userInput = document.getElementById('userInput');
  if (!userInput || !userInput.value.trim()) return;
  
  const message = userInput.value.trim();
  addMessageToChat(message, 'user');
  userInput.value = '';
  
  setTimeout(() => {
    addMessageToChat('Thank you for your message. This is a placeholder response. In production, this would connect to an AI service.', 'bot');
  }, 1000);
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleSubmitClick();
  }
}

function initializeEventListeners() {
  const motivateBtn = document.getElementById('motivateBtn');
  const submitBtn = document.getElementById('submitBtn');
  const userInput = document.getElementById('userInput');
  
  if (motivateBtn) {
    motivateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (!checkIsLoggedIn()) {
        showLoginModal();
      } else {
        handleMotivateClick();
      }
    });
  }
  
  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmitClick);
  }
  
  if (userInput) {
    userInput.addEventListener('keypress', handleKeyPress);
  }
}

export async function initializeChatbot() {
  await initializeChatInterface();
  initializeEventListeners();
  
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

document.addEventListener('DOMContentLoaded', () => {
  initializeChatbot();
});
