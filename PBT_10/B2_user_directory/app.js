// --- API Layer ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async getUsers() {
        return this.request("/users");
    },
    
    async createUser(data) {
        return this.request("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    },
    
    async updateUser(id, data) {
        return this.request(`/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    },
    
    async deleteUser(id) {
        return this.request(`/users/${id}`, {
            method: "DELETE"
        });
    }
};

// --- State ---
let users = [];
let currentDeleteId = null;

// --- UI Elements ---
const DOM = {
    userList: document.getElementById('userList'),
    searchInput: document.getElementById('searchInput'),
    loadingSkeleton: document.getElementById('loadingSkeleton'),
    usersTable: document.getElementById('usersTable'),
    
    // Modals
    userModal: document.getElementById('userModal'),
    modalTitle: document.getElementById('modalTitle'),
    userForm: document.getElementById('userForm'),
    userId: document.getElementById('userId'),
    userName: document.getElementById('userName'),
    userEmail: document.getElementById('userEmail'),
    userPhone: document.getElementById('userPhone'),
    
    confirmModal: document.getElementById('confirmModal'),
    deleteUserName: document.getElementById('deleteUserName'),
    
    // Buttons
    openAddModalBtn: document.getElementById('openAddModalBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    saveUserBtn: document.getElementById('saveUserBtn'),
    
    toastContainer: document.getElementById('toastContainer')
};

// --- UI Layer ---
const ui = {
    renderUsers(userArray) {
        DOM.userList.innerHTML = '';
        userArray.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-warning edit-btn" data-id="${user.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${user.id}">Delete</button>
                    </div>
                </td>
            `;
            DOM.userList.appendChild(tr);
        });
        this.attachRowEvents();
    },
    
    attachRowEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                openEditModal(id);
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                openDeleteConfirm(id);
            });
        });
    },

    showLoading() {
        DOM.loadingSkeleton.innerHTML = '';
        for (let i=0; i<5; i++) {
            const div = document.createElement('div');
            div.className = 'skeleton-row';
            DOM.loadingSkeleton.appendChild(div);
        }
        DOM.loadingSkeleton.classList.remove('hidden');
        DOM.usersTable.style.display = 'none';
    },
    
    hideLoading() {
        DOM.loadingSkeleton.classList.add('hidden');
        DOM.usersTable.style.display = 'table';
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        DOM.toastContainer.appendChild(toast);
        
        // Trigger reflow to animate
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// --- Controller Logic ---

async function loadInitialUsers() {
    ui.showLoading();
    try {
        users = await api.getUsers();
        ui.renderUsers(users);
    } catch (error) {
        ui.showToast(error.message, 'error');
    } finally {
        ui.hideLoading();
    }
}

// Search
DOM.searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
    );
    ui.renderUsers(filtered);
});

// Modals Setup
function openModal(title) {
    DOM.modalTitle.textContent = title;
    DOM.userModal.classList.remove('hidden');
}

function closeModal() {
    DOM.userModal.classList.add('hidden');
    DOM.userForm.reset();
    DOM.userId.value = '';
}

DOM.openAddModalBtn.addEventListener('click', () => {
    openModal("Add New User");
});

DOM.closeModalBtn.addEventListener('click', closeModal);

function openEditModal(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        DOM.userId.value = user.id;
        DOM.userName.value = user.name;
        DOM.userEmail.value = user.email;
        DOM.userPhone.value = user.phone;
        openModal("Edit User");
    }
}

function openDeleteConfirm(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        currentDeleteId = id;
        DOM.deleteUserName.textContent = user.name;
        DOM.confirmModal.classList.remove('hidden');
    }
}

function closeDeleteConfirm() {
    DOM.confirmModal.classList.add('hidden');
    currentDeleteId = null;
}

DOM.cancelDeleteBtn.addEventListener('click', closeDeleteConfirm);

// Create / Update
DOM.userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = DOM.userId.value;
    const userData = {
        name: DOM.userName.value,
        email: DOM.userEmail.value,
        phone: DOM.userPhone.value
    };

    const isEdit = id !== '';
    const btnText = DOM.saveUserBtn.textContent;
    DOM.saveUserBtn.textContent = 'Saving...';
    DOM.saveUserBtn.disabled = true;

    try {
        if (isEdit) {
            // Cập nhật lên API
            const updatedUser = await api.updateUser(id, userData);
            // JSONPlaceholder trả về id dạng chuỗi nếu ta gửi put, ta cần ghép lại
            const index = users.findIndex(u => u.id == id);
            users[index] = { ...users[index], ...userData };
            ui.showToast("User updated successfully!");
        } else {
            // Thêm mới lên API
            const newUser = await api.createUser(userData);
            // Vì API fake nên ID có thể là 11
            newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; 
            users.push(newUser);
            ui.showToast("User added successfully!");
        }
        ui.renderUsers(users);
        closeModal();
    } catch (error) {
        ui.showToast(error.message, 'error');
    } finally {
        DOM.saveUserBtn.textContent = btnText;
        DOM.saveUserBtn.disabled = false;
    }
});

// Delete
DOM.confirmDeleteBtn.addEventListener('click', async () => {
    if (!currentDeleteId) return;
    
    const btnText = DOM.confirmDeleteBtn.textContent;
    DOM.confirmDeleteBtn.textContent = 'Deleting...';
    DOM.confirmDeleteBtn.disabled = true;

    try {
        await api.deleteUser(currentDeleteId);
        users = users.filter(u => u.id !== currentDeleteId);
        
        // Re-apply search filter if any
        DOM.searchInput.dispatchEvent(new Event('input'));
        
        ui.showToast("User deleted successfully!");
        closeDeleteConfirm();
    } catch (error) {
        ui.showToast(error.message, 'error');
    } finally {
        DOM.confirmDeleteBtn.textContent = btnText;
        DOM.confirmDeleteBtn.disabled = false;
    }
});

// Start
loadInitialUsers();
