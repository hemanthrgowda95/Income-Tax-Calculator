document.getElementById('tax-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const salary = parseFloat(document.getElementById('salary').value);
    const otherIncome = parseFloat(document.getElementById('other-income').value);
    const hra = parseFloat(document.getElementById('hra').value);
    const section80c = parseFloat(document.getElementById('section80c').value);
    const otherDeductions = parseFloat(document.getElementById('other-deductions').value);
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
        previousLimit = limit;
    }

    return tax;
}