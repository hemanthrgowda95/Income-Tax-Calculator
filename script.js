document.addEventListener('DOMContentLoaded', function () {
    const regimeSwitchCheckbox = document.getElementById('regime-switch-checkbox');
    const oldRegimeSection = document.querySelector('.old-regime-section');
    const newRegimeLabel = document.querySelector('.label-new');
    const oldRegimeLabel = document.querySelector('.label-old');

    // Hide old regime section by default
    oldRegimeSection.style.display = 'none';

    // Show/hide old regime section based on switch state
    regimeSwitchCheckbox.addEventListener('change', function () {
        if (regimeSwitchCheckbox.checked) {
            oldRegimeSection.style.display = 'none';
            newRegimeLabel.classList.add('active');
            oldRegimeLabel.classList.remove('active');
        } else {
            oldRegimeSection.style.display = 'block';
            oldRegimeLabel.classList.add('active');
            newRegimeLabel.classList.remove('active');
        }
    });

    document.getElementById('tax-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const salary = parseFloat(document.getElementById('salary').value);
        const otherIncome = parseFloat(document.getElementById('other-income').value);
        const hra = parseFloat(document.getElementById('hra').value || 0);
        const section80c = parseFloat(document.getElementById('section80c').value || 0);
        const otherDeductions = parseFloat(document.getElementById('other-deductions').value || 0);
        const isOldRegime = !regimeSwitchCheckbox.checked;

        const totalIncome = salary + otherIncome;

        let totalDeductions, taxableIncome, tax;
        if (!isOldRegime) {
            totalDeductions = 75000;
            taxableIncome = Math.max(totalIncome - totalDeductions, 0);
            tax = computeTax(taxableIncome, [
                [400000, 0.00], [800000, 0.05], [1200000, 0.10],
                [1600000, 0.15], [2000000, 0.20], [2400000, 0.25],
                [Infinity, 0.30]
            ]);
        } else {
            const hraExemption[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/antydemant/lessons-2020/tree/0c6095f45bfd841914ac8e7e25f8c9df273dea69/02-closure-and-context%2Fhomework%2FREADME.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/GCES-Batch-2018-Minor-project-group/Minor_Project_SBR/tree/167f153115d7e61f490ce79d977f6405b389de83/PAGES%2FtaxCalculator.php?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")