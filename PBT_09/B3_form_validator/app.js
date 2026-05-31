const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const nameFeedback = document.getElementById('nameFeedback');
const emailFeedback = document.getElementById('emailFeedback');
const confirmFeedback = document.getElementById('confirmFeedback');
const phoneFeedback = document.getElementById('phoneFeedback');
const strengthBar = document.getElementById('strengthBar');

const successModal = document.getElementById('successModal');
const successData = document.getElementById('successData');
const closeModal = document.getElementById('closeModal');

const state = {
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

function checkFormValid() {
    const isValid = Object.values(state).every(val => val === true);
    submitBtn.disabled = !isValid;
}

function setValid(input, feedback, message = '✅') {
    input.classList.remove('invalid');
    input.classList.add('valid');
    if (feedback) {
        feedback.textContent = message;
        feedback.style.color = '#28a745';
    }
}

function setInvalid(input, feedback, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    if (feedback) {
        feedback.textContent = `❌ ${message}`;
        feedback.style.color = '#dc3545';
    }
}

// Validate Name
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        setValid(nameInput, nameFeedback);
        state.name = true;
    } else {
        setInvalid(nameInput, nameFeedback, 'Tên phải từ 2-50 ký tự');
        state.name = false;
    }
    checkFormValid();
});

// Validate Email
emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) {
        setValid(emailInput, emailFeedback);
        state.email = true;
    } else {
        setInvalid(emailInput, emailFeedback, 'Email không hợp lệ');
        state.email = false;
    }
    checkFormValid();
});

// Validate Password Strength
passwordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    
    // Check strength
    const hasLetters = /[a-zA-Z]/.test(val);
    const hasNumbers = /[0-9]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);
    const hasUpperAndLower = /[a-z]/.test(val) && /[A-Z]/.test(val);

    let strength = 0;
    if (val.length >= 8) {
        if (hasUpperAndLower && hasNumbers && hasSpecial) strength = 3; // Mạnh
        else if (hasLetters && hasNumbers) strength = 2; // Trung bình
        else strength = 1; // Yếu
    }

    if (val.length === 0) strength = 0;

    strengthBar.className = 'strength-bar';
    if (strength === 0) {
        strengthBar.style.width = '0';
        state.password = false;
    } else if (strength === 1) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = '#dc3545'; // Đỏ
        state.password = true; // Chấp nhận cả pass yếu
    } else if (strength === 2) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = '#ffc107'; // Vàng
        state.password = true;
    } else if (strength === 3) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = '#28a745'; // Xanh
        state.password = true;
    }

    // Re-validate confirm password if it has value
    if (confirmPasswordInput.value) {
        confirmPasswordInput.dispatchEvent(new Event('input'));
    }
    checkFormValid();
});

// Validate Confirm Password
confirmPasswordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val === passwordInput.value && val.length > 0) {
        setValid(confirmPasswordInput, confirmFeedback);
        state.confirmPassword = true;
    } else {
        setInvalid(confirmPasswordInput, confirmFeedback, 'Mật khẩu không khớp');
        state.confirmPassword = false;
    }
    checkFormValid();
});

// Validate Phone (Auto-format)
phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Bỏ hết chữ, chỉ giữ số
    
    if (val.length > 10) val = val.substring(0, 10);
    
    // Format 0901-234-567
    let formatted = val;
    if (val.length > 7) {
        formatted = val.substring(0, 4) + '-' + val.substring(4, 7) + '-' + val.substring(7);
    } else if (val.length > 4) {
        formatted = val.substring(0, 4) + '-' + val.substring(4);
    }
    
    e.target.value = formatted;

    if (val.length === 10) {
        setValid(phoneInput, phoneFeedback);
        state.phone = true;
    } else {
        setInvalid(phoneInput, phoneFeedback, 'Số điện thoại phải đủ 10 số');
        state.phone = false;
    }
    checkFormValid();
});

// Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        const data = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            // Không nên show password ra, nhưng demo thì ok
            password_length: passwordInput.value.length
        };
        successData.textContent = JSON.stringify(data, null, 2);
        successModal.classList.add('show');
    }
});

closeModal.addEventListener('click', () => {
    successModal.classList.remove('show');
    form.reset();
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    document.querySelectorAll('.feedback').forEach(fb => fb.textContent = '');
    strengthBar.style.width = '0';
    Object.keys(state).forEach(k => state[k] = false);
    checkFormValid();
});
