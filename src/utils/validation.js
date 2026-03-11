export function validateLogin(email, password) {
    const errors = {};

    if (!email || !email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!password || !password.trim()) {
        errors.password = "Password is required";
    } else if (password.length < 4) {
        errors.password = "Password must be at least 4 characters";
    }

    return errors;
}

export function validateDPR(formData) {
    const errors = {};

    if (!formData.project) {
        errors.project = "Please select a project";
    }

    if (!formData.date) {
        errors.date = "Date is required";
    }

    if (!formData.weather) {
        errors.weather = "Please select the weather condition";
    }

    if (!formData.description || !formData.description.trim()) {
        errors.description = "Work description is required";
    } else if (formData.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters";
    }

    if (
        !formData.workerCount ||
        isNaN(formData.workerCount) ||
        Number(formData.workerCount) <= 0
    ) {
        errors.workerCount = "Worker count must be greater than 0";
    }

    if (formData.images && formData.images.length > 3) {
        errors.images = "Maximum 3 images allowed";
    }

    return errors;
}
