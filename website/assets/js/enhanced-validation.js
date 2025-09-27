// Enhanced Form Validation with User-Friendly Messages

const ValidationMessages = {
    it: {
        required: 'Questo campo è obbligatorio',
        email: 'Inserisci un indirizzo email valido (es: nome@azienda.it)',
        phone: 'Inserisci un numero di telefono valido (es: +39 123 456 7890)',
        number: 'Inserisci un numero valido',
        min: 'Il valore deve essere almeno {min}',
        max: 'Il valore non può superare {max}',
        minLength: 'Inserisci almeno {min} caratteri',
        maxLength: 'Non superare i {max} caratteri',
        employees: 'Inserisci un numero di dipendenti valido (1-10000)',
        revenue: 'Inserisci un fatturato annuo realistico',
        percentage: 'Inserisci una percentuale tra 0 e 100',
        hours: 'Inserisci un numero di ore valido (0-24)',
        investment: 'Inserisci un importo di investimento valido',
        companyName: 'Il nome dell\'azienda deve contenere almeno 2 caratteri',
        sector: 'Seleziona un settore dalla lista',
        success: 'Campo compilato correttamente',
        calculating: 'Calcolo in corso...',
        calculationComplete: 'Calcolo completato con successo!'
    },
    en: {
        required: 'This field is required',
        email: 'Please enter a valid email address (e.g., name@company.com)',
        phone: 'Please enter a valid phone number (e.g., +39 123 456 7890)',
        number: 'Please enter a valid number',
        min: 'Value must be at least {min}',
        max: 'Value cannot exceed {max}',
        minLength: 'Please enter at least {min} characters',
        maxLength: 'Maximum {max} characters allowed',
        employees: 'Enter a valid number of employees (1-10000)',
        revenue: 'Enter a realistic annual revenue',
        percentage: 'Enter a percentage between 0 and 100',
        hours: 'Enter a valid number of hours (0-24)',
        investment: 'Enter a valid investment amount',
        companyName: 'Company name must be at least 2 characters',
        sector: 'Please select a sector from the list',
        success: 'Field completed successfully',
        calculating: 'Calculating...',
        calculationComplete: 'Calculation completed successfully!'
    }
};

class EnhancedValidator {
    constructor(form, lang = 'it') {
        this.form = form;
        this.lang = lang;
        this.messages = ValidationMessages[lang];
        this.validationRules = new Map();
        this.setupValidation();
    }

    setupValidation() {
        // Define validation rules for each field type
        this.validationRules.set('email', {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: this.messages.email
        });

        this.validationRules.set('phone', {
            pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
            message: this.messages.phone
        });

        this.validationRules.set('employees', {
            min: 1,
            max: 10000,
            type: 'number',
            message: this.messages.employees
        });

        this.validationRules.set('revenue', {
            min: 10000,
            max: 1000000000,
            type: 'number',
            message: this.messages.revenue
        });

        this.validationRules.set('percentage', {
            min: 0,
            max: 100,
            type: 'number',
            message: this.messages.percentage
        });

        // Add real-time validation
        this.attachEventListeners();
    }

    attachEventListeners() {
        const inputs = this.form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            // Create or get error message container
            let errorContainer = input.parentElement.querySelector('.validation-message');
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.className = 'validation-message';
                input.parentElement.appendChild(errorContainer);
            }

            // Add validation on blur
            input.addEventListener('blur', () => this.validateField(input));

            // Add validation on input for better UX
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const errorContainer = field.parentElement.querySelector('.validation-message');

        // Reset state
        field.classList.remove('error', 'success');
        errorContainer.textContent = '';
        errorContainer.classList.remove('show', 'error', 'success');

        // Check if required
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field, this.messages.required);
            return false;
        }

        // Skip validation if field is empty and not required
        if (!field.value.trim()) return true;

        // Type-specific validation
        const fieldType = field.getAttribute('data-validation') || field.type;
        const rule = this.validationRules.get(fieldType);

        if (rule) {
            if (rule.pattern && !rule.pattern.test(field.value)) {
                this.showError(field, rule.message);
                return false;
            }

            if (rule.type === 'number') {
                const value = parseFloat(field.value);
                if (isNaN(value)) {
                    this.showError(field, this.messages.number);
                    return false;
                }
                if (rule.min !== undefined && value < rule.min) {
                    this.showError(field, this.messages.min.replace('{min}', rule.min));
                    return false;
                }
                if (rule.max !== undefined && value > rule.max) {
                    this.showError(field, this.messages.max.replace('{max}', rule.max));
                    return false;
                }
            }
        }

        // Min/max length validation
        if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (field.value.length < minLength) {
                this.showError(field, this.messages.minLength.replace('{min}', minLength));
                return false;
            }
        }

        if (field.hasAttribute('maxlength')) {
            const maxLength = parseInt(field.getAttribute('maxlength'));
            if (field.value.length > maxLength) {
                this.showError(field, this.messages.maxLength.replace('{max}', maxLength));
                return false;
            }
        }

        // Field is valid
        this.showSuccess(field);
        return true;
    }

    showError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');

        const errorContainer = field.parentElement.querySelector('.validation-message');
        errorContainer.textContent = message;
        errorContainer.classList.add('show', 'error');
        errorContainer.classList.remove('success');

        // Add aria attributes for accessibility
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorContainer.id || this.generateErrorId(field));

        // Shake animation
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
    }

    showSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');

        const errorContainer = field.parentElement.querySelector('.validation-message');
        errorContainer.textContent = '✓';
        errorContainer.classList.add('show', 'success');
        errorContainer.classList.remove('error');

        field.setAttribute('aria-invalid', 'false');
    }

    generateErrorId(field) {
        const id = `error-${field.name || field.id || Math.random().toString(36).substr(2, 9)}`;
        const errorContainer = field.parentElement.querySelector('.validation-message');
        errorContainer.id = id;
        return id;
    }

    validateStep(stepElement) {
        const fields = stepElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `validation-notification ${type}`;
        notification.textContent = message;

        // Add to form
        this.form.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// CSS for validation messages
const validationStyles = `
<style>
.validation-message {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    opacity: 0;
    transform: translateY(-5px);
    transition: all 0.3s ease;
    position: relative;
}

.validation-message.show {
    opacity: 1;
    transform: translateY(0);
}

.validation-message.error {
    color: #c0392b;
}

.validation-message.success {
    color: #27ae60;
}

input.error, select.error, textarea.error {
    border-color: #c0392b !important;
    background-color: rgba(192, 57, 43, 0.05);
}

input.success, select.success, textarea.success {
    border-color: #27ae60 !important;
    background-color: rgba(39, 174, 96, 0.05);
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake {
    animation: shake 0.5s;
}

.validation-notification {
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 300px;
}

.validation-notification.show {
    opacity: 1;
    transform: translateX(0);
}

.validation-notification.info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.validation-notification.success {
    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
    color: #1a2332;
}

.validation-notification.error {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

/* Tooltip for field hints */
.field-hint {
    position: relative;
    display: inline-block;
    margin-left: 0.5rem;
    cursor: help;
}

.field-hint::before {
    content: '?';
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #e0e0e0;
    color: #666;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    font-weight: bold;
}

.field-hint .hint-text {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    margin-bottom: 0.5rem;
}

.field-hint:hover .hint-text {
    opacity: 1;
}
</style>
`;

// Auto-inject styles
if (!document.getElementById('validation-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'validation-styles';
    styleElement.innerHTML = validationStyles;
    document.head.appendChild(styleElement.firstChild);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedValidator;
}