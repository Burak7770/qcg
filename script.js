document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });


    // Funding Calculator Logic
    const employeeRange = document.getElementById('employee-range');
    const employeeInput = document.getElementById('employee-input');
    const salaryInput = document.getElementById('salary-input');
    const stateInput = document.getElementById('state-input');
    
    const resultTotal = document.getElementById('result-total');
    const resultWage = document.getElementById('result-wage');
    const resultCourse = document.getElementById('result-course');
    const resultBonus = document.getElementById('result-bonus');

    const updateCalculator = () => {
        const count = parseInt(employeeInput.value) || 0;
        const salary = parseInt(salaryInput.value) || 0;
        const state = stateInput.value;

        // 1. QCG Base Logic (75% wage subsidy, 7000€ avg training cost)
        const wageSubsidyRate = 0.75; 
        const courseCostsPerPerson = 7000;

        const totalWageSubsidy = count * salary * wageSubsidyRate * 6; // 6 months
        const totalCourseSubsidy = count * courseCostsPerPerson;

        // 2. Regional Bonus Logic (ESF+ and State Programs)
        let stateBonusPerPerson = 500; // Base bonus
        if (['BW', 'BY', 'NW'].includes(state)) stateBonusPerPerson = 1000; // Strong state grants
        if (['BE', 'HH'].includes(state)) stateBonusPerPerson = 1500; // High urban subsidies
        if (['HE', 'RP', 'HB'].includes(state)) stateBonusPerPerson = 800;

        const totalStateBonus = count * stateBonusPerPerson;
        
        const total = totalWageSubsidy + totalCourseSubsidy + totalStateBonus;

        resultTotal.innerText = `${total.toLocaleString('de-DE')}€`;
        resultWage.innerText = `${totalWageSubsidy.toLocaleString('de-DE')}€`;
        resultCourse.innerText = `${totalCourseSubsidy.toLocaleString('de-DE')}€`;
        resultBonus.innerText = `${totalStateBonus.toLocaleString('de-DE')}€`;
    };

    if (employeeRange) {
        employeeRange.addEventListener('input', () => {
            employeeInput.value = employeeRange.value;
            updateCalculator();
        });
        employeeInput.addEventListener('input', () => {
            employeeRange.value = employeeInput.value;
            updateCalculator();
        });
        salaryInput.addEventListener('input', updateCalculator);
        stateInput.addEventListener('change', updateCalculator);
        updateCalculator();
    }

    // Sticky Nav & Parallax Logic
    const nav = document.querySelector('nav');
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Sticky Nav
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax Effect
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
});
