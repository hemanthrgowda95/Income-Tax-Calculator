document.addEventListener('DOMContentLoaded', function () {
    const oldRegimeRadio = document.getElementById('old-regime');
    const newRegimeRadio = document.getElementById('new-regime');
    const oldRegimeSection = document.querySelector('.old-regime-section');

    // Hide HRA and 80C inputs by default
    oldRegimeSection.style.display = 'none';

    // Show/hide HRA and 80C inputs based on selected regime
    oldRegimeRadio.addEventListener('change', function () {
        if (oldRegimeRadio.checked) {
            oldRegimeSection.style.display = 'block';
        }
    });

    newRegimeRadio.addEventListener('change', function () {
        if (newRegimeRadio.checked) {
            oldRegimeSection.style.display = 'none';
        }
    });

    document.getElementById('tax-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const salary = parseFloat(document.getElementById('salary').value);
        const otherIncome = parseFloat(document.getElementById('other-income').value);
        const hra = parseFloat(document.getElementById('hra').value || 0);
        const section80c = parseFloat(document.getElementById('section80c').value || 0);
        const otherDeductions = parseFloat(document.getElementById('other-deductions').value || 0);
        const regime = document.querySelector('input[name="regime"]:checked').value;

        const totalIncome = salary + otherIncome;

        let totalDeductions, taxableIncome, tax;
        if (regime === "New") {
            totalDeductions = 75000;
            taxableIncome = Math.max(totalIncome - totalDeductions, 0);
            tax = computeTax(taxableIncome, [
                [400000, 0.00], [800000, 0.05], [1200000, 0.10],
                [1600000, 0.15], [2000000, 0.20], [2400000, 0.25],
                [Infinity, 0.30]
            ]);
        } else {
            totalDeductions = section80c + hra + otherDeductions + 50000; // 80C + HRA + Other Deductions + Standard Deduction
            taxableIncome = Math.max(totalIncome - totalDeductions, 0);
            tax = computeTax(taxableIncome, [
                [250000, 0.00], [500000, 0.05], [1000000, 0.20],
                [Infinity, 0.30]
            ]);
        }

        const cess = tax * 0.04;
        const totalTaxWithCess = tax + cess;

        document.getElementById('result').innerHTML = `
            <p>Total Income: Rs ${totalIncome.toFixed(2)}</p>
            <p>Selected: ${regime} Tax Regime</p>
            <p>Total Deductions: Rs ${totalDeductions}</p>
            <p>Taxable Income: Rs ${taxableIncome}</p>
            <p>Tax before cess: Rs ${tax.toFixed(2)}</p>
            <p>Cess (4%): Rs ${cess.toFixed(2)}</p>
            <p>Total Tax Payable: Rs ${totalTaxWithCess.toFixed(2)}</p>
        `;
    });

    function computeTax(taxableIncome, taxBrackets) {
        let previousLimit = 0;
        let tax = 0;

        for (const [limit, rate] of taxBrackets) {
            if (taxableIncome > previousLimit) {
                const taxableAmount = Math.min(taxableIncome, limit) - previousLimit;
                tax += taxableAmount * rate;
            } else {
                break;
            }
            previousLimit = limit[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/antydemant/lessons-2020/tree/0c6095f45bfd841914ac8e7e25f8c9df273dea69/02-closure-and-context%2Fhomework%2FREADME.md?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://github.com/GCES-Batch-2018-Minor-project-group/Minor_Project_SBR/tree/167f153115d7e61f490ce79d977f6405b389de83/PAGES%2FtaxCalculator.php?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "2")