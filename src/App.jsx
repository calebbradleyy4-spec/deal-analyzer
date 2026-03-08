import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    color: #e8e0d0;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0a;
    padding: 40px 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .header h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 8vw, 96px);
    letter-spacing: 4px;
    color: #e8e0d0;
    line-height: 1;
  }

  .header h1 span {
    color: #c8a96e;
  }

  .header p {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #666;
    margin-top: 8px;
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 40px;
    border: 1px solid #222;
    border-radius: 4px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }

  .tab {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 12px 32px;
    background: transparent;
    color: #555;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab.active {
    background: #c8a96e;
    color: #0a0a0a;
  }

  .tab:hover:not(.active) {
    color: #e8e0d0;
    background: #111;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 640px) {
    .grid { grid-template-columns: 1fr; }
  }

  .card {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    padding: 28px;
  }

  .card-title {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 20px;
  }

  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 6px;
  }

  .field input {
    width: 100%;
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 3px;
    padding: 10px 14px;
    color: #e8e0d0;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus {
    border-color: #c8a96e;
  }

  .field input::placeholder {
    color: #333;
  }

  .analyze-btn {
    width: 100%;
    padding: 16px;
    background: #c8a96e;
    color: #0a0a0a;
    border: none;
    border-radius: 4px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    cursor: pointer;
    margin-top: 24px;
    transition: all 0.2s;
  }

  .analyze-btn:hover {
    background: #d4b87e;
    transform: translateY(-1px);
  }

  .results {
    margin-top: 32px;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .verdict {
    padding: 28px 32px;
    border-radius: 4px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .verdict.go {
    background: #0d1f0d;
    border: 1px solid #1a4d1a;
  }

  .verdict.nogo {
    background: #1f0d0d;
    border: 1px solid #4d1a1a;
  }

  .verdict-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 3px;
    color: #555;
  }

  .verdict-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 6vw, 56px);
    letter-spacing: 4px;
    line-height: 1;
  }

  .verdict.go .verdict-text { color: #4caf50; }
  .verdict.nogo .verdict-text { color: #ef5350; }

  .verdict-reason {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #666;
    text-align: right;
    max-width: 240px;
    line-height: 1.6;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }

  .metric {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    padding: 20px;
  }

  .metric-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 8px;
  }

  .metric-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 1px;
    color: #e8e0d0;
  }

  .metric-value.positive { color: #4caf50; }
  .metric-value.negative { color: #ef5350; }
  .metric-value.neutral { color: #c8a96e; }

  .breakdown {
    background: #111;
    border: 1px solid #1e1e1e;
    border-radius: 4px;
    padding: 24px;
  }

  .breakdown-title {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8a96e;
    margin-bottom: 16px;
  }

  .breakdown-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #1a1a1a;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
  }

  .breakdown-row:last-child { border-bottom: none; }

  .breakdown-row .label { color: #555; }
  .breakdown-row .value { color: #e8e0d0; }
  .breakdown-row .value.positive { color: #4caf50; }
  .breakdown-row .value.negative { color: #ef5350; }
  .breakdown-row .value.gold { color: #c8a96e; }

  .divider {
    border: none;
    border-top: 1px solid #222;
    margin: 8px 0;
  }

  .reset-btn {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #444;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 8px 16px;
    transition: color 0.2s;
  }

  .reset-btn:hover { color: #c8a96e; }
`;

function fmt(n, prefix = "$") {
  if (n === undefined || n === null || isNaN(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  return `${sign}${prefix}${abs.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function fmtPct(n) {
  if (n === undefined || isNaN(n)) return "—";
  return `${n.toFixed(1)}%`;
}

function colorClass(n) {
  if (n > 0) return "positive";
  if (n < 0) return "negative";
  return "neutral";
}

// ── BRRRR ANALYZER ──────────────────────────────────────────────────────────

const warningStyle = `
  .warning-box {
    background: #1a1400;
    border: 1px solid #4d3a00;
    border-radius: 4px;
    padding: 16px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .warning-icon { color: #f0a500; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .warning-text { font-family: 'DM Mono', monospace; font-size: 11px; color: #f0a500; line-height: 1.6; }
  .warning-text strong { display: block; font-size: 12px; margin-bottom: 2px; }
  .threshold-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .threshold-row label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #555; white-space: nowrap; }
  .threshold-row input { flex: 1; }
`;

function BRRRRAnalyzer() {
  const [f, setF] = useState({
    purchasePrice: "", rehabCost: "", arv: "",
    refiFee: "3", monthlyRent: "", vacancy: "8",
    taxes: "", insurance: "", maintenance: "100", mgmt: "8",
    refiRate: "", refiTerm: "30", maxCapitalLeft: "",
  });
  const [results, setResults] = useState(null);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function analyze() {
    const purchase = +f.purchasePrice;
    const rehab = +f.rehabCost;
    const arv = +f.arv;
    const refiFeeRate = +f.refiFee / 100;
    const rent = +f.monthlyRent;
    const vacancyRate = +f.vacancy / 100;
    const taxes = +f.taxes;
    const insurance = +f.insurance;
    const maintenance = +f.maintenance;
    const mgmtRate = +f.mgmt / 100;
    const refiRate = +f.refiRate / 100 / 12;
    const refiTermMonths = +f.refiTerm * 12;
    const maxCapitalLeft = f.maxCapitalLeft !== "" ? +f.maxCapitalLeft : null;

    const totalInvested = purchase + rehab;
    const refiLoan = arv * 0.75;
    const refiFees = refiLoan * refiFeeRate;
    const cashReturned = refiLoan - refiFees;
    const cashLeftIn = totalInvested - cashReturned;

    const mortgage = refiRate > 0
      ? refiLoan * (refiRate * Math.pow(1 + refiRate, refiTermMonths)) / (Math.pow(1 + refiRate, refiTermMonths) - 1)
      : refiLoan / refiTermMonths;

    const effectiveRent = rent * (1 - vacancyRate);
    const mgmtCost = rent * mgmtRate;
    const totalExpenses = mortgage + taxes + insurance + maintenance + mgmtCost;
    const monthlyCashFlow = effectiveRent - totalExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const cocReturn = cashLeftIn > 0 ? (annualCashFlow / cashLeftIn) * 100 : Infinity;
    const equity = arv - refiLoan;

    // Verdict logic
    const failReasons = [];
    const passReasons = [];

    if (monthlyCashFlow < 150) failReasons.push("cash flow below $150/mo minimum");
    else passReasons.push(`cash flow ${fmt(monthlyCashFlow)}/mo`);

    if (cashLeftIn > 0 && cocReturn < 8) failReasons.push(`CoC return ${fmtPct(cocReturn)} below 8% minimum`);
    else if (cashLeftIn > 0) passReasons.push(`CoC return ${fmtPct(cocReturn)}`);

    if (maxCapitalLeft !== null && cashLeftIn > maxCapitalLeft) {
      failReasons.push(`${fmt(cashLeftIn)} left in deal exceeds your ${fmt(maxCapitalLeft)} max`);
    } else if (maxCapitalLeft !== null && cashLeftIn > 0) {
      passReasons.push(`${fmt(cashLeftIn)} left in deal within threshold`);
    }

    if (cashLeftIn <= 0) passReasons.push("full capital returned at refi");

    const isGo = failReasons.length === 0;
    const capitalWarning = cashLeftIn > 0 && maxCapitalLeft === null;

    setResults({ totalInvested, refiLoan, refiFees, cashReturned, cashLeftIn, mortgage, effectiveRent, mgmtCost, totalExpenses, monthlyCashFlow, annualCashFlow, cocReturn, equity, isGo, failReasons, passReasons, capitalWarning, maxCapitalLeft });
  }

  if (results) return (
    <div className="results">
      <style>{warningStyle}</style>

      {results.capitalWarning && (
        <div className="warning-box">
          <div className="warning-icon">⚠</div>
          <div className="warning-text">
            <strong>Unreturned Capital: {fmt(results.cashLeftIn)}</strong>
            You invested {fmt(results.totalInvested)} but only got {fmt(results.cashReturned)} back at refi — leaving {fmt(results.cashLeftIn)} of your own money still in this deal. No max capital threshold was set, so this did not affect the verdict. Consider whether tying up {fmt(results.cashLeftIn)} is acceptable given your other opportunities.
          </div>
        </div>
      )}

      <div className={`verdict ${results.isGo ? "go" : "nogo"}`}>
        <div>
          <div className="verdict-label">Deal Verdict</div>
          <div className="verdict-text">{results.isGo ? "GO" : "NO-GO"}</div>
        </div>
        <div className="verdict-reason">
          {results.failReasons.length > 0 ? results.failReasons.join("; ") : results.passReasons.join("; ")}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-label">Monthly Cash Flow</div>
          <div className={`metric-value ${colorClass(results.monthlyCashFlow)}`}>{fmt(results.monthlyCashFlow)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Cash-on-Cash Return</div>
          <div className={`metric-value ${results.cocReturn === Infinity ? "positive" : colorClass(results.cocReturn - 8)}`}>
            {results.cocReturn === Infinity ? "∞" : fmtPct(results.cocReturn)}
          </div>
        </div>
        <div className="metric">
          <div className="metric-label">Cash Left In Deal</div>
          <div className={`metric-value ${results.cashLeftIn > 0 ? (results.maxCapitalLeft !== null && results.cashLeftIn > results.maxCapitalLeft ? "negative" : "neutral") : "positive"}`}>
            {fmt(results.cashLeftIn)}
          </div>
        </div>
        <div className="metric">
          <div className="metric-label">Equity at Refi</div>
          <div className="metric-value neutral">{fmt(results.equity)}</div>
        </div>
      </div>

      <div className="breakdown">
        <div className="breakdown-title">Full Breakdown</div>
        <div className="breakdown-row"><span className="label">Purchase Price</span><span className="value">{fmt(+f.purchasePrice)}</span></div>
        <div className="breakdown-row"><span className="label">Rehab Cost</span><span className="value">{fmt(+f.rehabCost)}</span></div>
        <div className="breakdown-row"><span className="label">Total Invested</span><span className="value gold">{fmt(results.totalInvested)}</span></div>
        <hr className="divider" />
        <div className="breakdown-row"><span className="label">ARV</span><span className="value">{fmt(+f.arv)}</span></div>
        <div className="breakdown-row"><span className="label">Refi Loan (75% LTV)</span><span className="value">{fmt(results.refiLoan)}</span></div>
        <div className="breakdown-row"><span className="label">Refi Fees</span><span className="value negative">{fmt(results.refiFees)}</span></div>
        <div className="breakdown-row"><span className="label">Cash Returned to You</span><span className="value positive">{fmt(results.cashReturned)}</span></div>
        <div className="breakdown-row"><span className="label">Cash Still Left In Deal</span><span className={`value ${results.cashLeftIn > 0 ? "negative" : "positive"}`}>{fmt(results.cashLeftIn)}</span></div>
        <hr className="divider" />
        <div className="breakdown-row"><span className="label">Effective Rent ({f.vacancy}% vacancy)</span><span className="value">{fmt(results.effectiveRent)}</span></div>
        <div className="breakdown-row"><span className="label">Mortgage (post-refi)</span><span className="value negative">{fmt(results.mortgage)}</span></div>
        <div className="breakdown-row"><span className="label">Taxes</span><span className="value negative">{fmt(+f.taxes)}</span></div>
        <div className="breakdown-row"><span className="label">Insurance</span><span className="value negative">{fmt(+f.insurance)}</span></div>
        <div className="breakdown-row"><span className="label">Maintenance</span><span className="value negative">{fmt(+f.maintenance)}</span></div>
        <div className="breakdown-row"><span className="label">Property Mgmt ({f.mgmt}%)</span><span className="value negative">{fmt(results.mgmtCost)}</span></div>
        <hr className="divider" />
        <div className="breakdown-row"><span className="label">Net Monthly Cash Flow</span><span className={`value ${colorClass(results.monthlyCashFlow)}`}>{fmt(results.monthlyCashFlow)}</span></div>
        <div className="breakdown-row"><span className="label">Annual Cash Flow</span><span className={`value ${colorClass(results.annualCashFlow)}`}>{fmt(results.annualCashFlow)}</span></div>
      </div>
      <button className="reset-btn" onClick={() => setResults(null)}>← analyze another deal</button>
    </div>
  );

  return (
    <>
      <style>{warningStyle}</style>
      <div className="grid">
        <div className="card">
          <div className="card-title">Acquisition</div>
          <div className="field"><label>Purchase Price</label><input type="number" placeholder="180000" value={f.purchasePrice} onChange={set("purchasePrice")} /></div>
          <div className="field"><label>Rehab Cost</label><input type="number" placeholder="35000" value={f.rehabCost} onChange={set("rehabCost")} /></div>
          <div className="field"><label>After Repair Value (ARV)</label><input type="number" placeholder="280000" value={f.arv} onChange={set("arv")} /></div>
        </div>
        <div className="card">
          <div className="card-title">Refinance</div>
          <div className="field"><label>Refi Interest Rate (%)</label><input type="number" placeholder="7.5" value={f.refiRate} onChange={set("refiRate")} /></div>
          <div className="field"><label>Loan Term (years)</label><input type="number" placeholder="30" value={f.refiTerm} onChange={set("refiTerm")} /></div>
          <div className="field"><label>Refi Closing Costs (%)</label><input type="number" placeholder="3" value={f.refiFee} onChange={set("refiFee")} /></div>
        </div>
        <div className="card">
          <div className="card-title">Rental Income</div>
          <div className="field"><label>Monthly Rent</label><input type="number" placeholder="1800" value={f.monthlyRent} onChange={set("monthlyRent")} /></div>
          <div className="field"><label>Vacancy Rate (%)</label><input type="number" placeholder="8" value={f.vacancy} onChange={set("vacancy")} /></div>
          <div className="field"><label>Property Mgmt (%)</label><input type="number" placeholder="8" value={f.mgmt} onChange={set("mgmt")} /></div>
        </div>
        <div className="card">
          <div className="card-title">Monthly Expenses</div>
          <div className="field"><label>Property Taxes (monthly)</label><input type="number" placeholder="200" value={f.taxes} onChange={set("taxes")} /></div>
          <div className="field"><label>Insurance (monthly)</label><input type="number" placeholder="100" value={f.insurance} onChange={set("insurance")} /></div>
          <div className="field"><label>Maintenance Reserve</label><input type="number" placeholder="100" value={f.maintenance} onChange={set("maintenance")} /></div>
        </div>
      </div>
      <div className="card" style={{marginTop: "24px"}}>
        <div className="card-title">Your Thresholds</div>
        <div className="threshold-row">
          <label>Max Capital Left in Deal</label>
          <input type="number" placeholder="e.g. 20000 — leave blank to just see a warning" value={f.maxCapitalLeft} onChange={set("maxCapitalLeft")} style={{background:"#0a0a0a", border:"1px solid #222", borderRadius:"3px", padding:"10px 14px", color:"#e8e0d0", fontFamily:"'DM Mono', monospace", fontSize:"14px", outline:"none"}} />
        </div>
        <p style={{fontFamily:"'DM Mono',monospace", fontSize:"10px", color:"#444", lineHeight:"1.6"}}>
          If left blank, unreturned capital will show as a warning but won't affect the verdict. Set a number to make it a hard No-Go condition.
        </p>
      </div>
      <button className="analyze-btn" onClick={analyze}>ANALYZE DEAL</button>
    </>
  );
}

// ── FLIP ANALYZER ────────────────────────────────────────────────────────────

function FlipAnalyzer() {
  const [f, setF] = useState({
    purchasePrice: "", rehabCost: "", arv: "",
    holdingMonths: "6", holdingCostPerMonth: "",
    closingBuy: "1", closingSell: "7", financingRate: "", financingPoints: "2",
  });
  const [results, setResults] = useState(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function analyze() {
    const purchase = +f.purchasePrice;
    const rehab = +f.rehabCost;
    const arv = +f.arv;
    const months = +f.holdingMonths;
    const holdingPerMonth = +f.holdingCostPerMonth;
    const closingBuyPct = +f.closingBuy / 100;
    const closingSellPct = +f.closingSell / 100;
    const financingRate = +f.financingRate / 100 / 12;
    const points = +f.financingPoints / 100;

    const closingBuy = purchase * closingBuyPct;
    const closingSell = arv * closingSellPct;
    const holdingTotal = holdingPerMonth * months;
    const financingCost = financingRate > 0 ? purchase * financingRate * months : 0;
    const originationFee = purchase * points;
    const totalCost = purchase + rehab + closingBuy + closingSell + holdingTotal + financingCost + originationFee;
    const profit = arv - totalCost;
    const roi = ((profit / totalCost) * 100);
    const annualizedRoi = roi / (months / 12);
    const isGo = profit >= 20000;

    setResults({ purchase, rehab, closingBuy, closingSell, holdingTotal, financingCost, originationFee, totalCost, profit, roi, annualizedRoi, isGo });
  }

  if (results) return (
    <div className="results">
      <div className={`verdict ${results.isGo ? "go" : "nogo"}`}>
        <div>
          <div className="verdict-label">Deal Verdict</div>
          <div className="verdict-text">{results.isGo ? "GO" : "NO-GO"}</div>
        </div>
        <div className="verdict-reason">
          {results.isGo ? `${fmt(results.profit)} profit — above $20K minimum` : `${fmt(results.profit)} profit — below $20K minimum`}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-label">Net Profit</div>
          <div className={`metric-value ${colorClass(results.profit)}`}>{fmt(results.profit)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">ROI</div>
          <div className={`metric-value ${colorClass(results.roi)}`}>{fmtPct(results.roi)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Annualized ROI</div>
          <div className={`metric-value ${colorClass(results.annualizedRoi)}`}>{fmtPct(results.annualizedRoi)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Total All-In Cost</div>
          <div className="metric-value neutral">{fmt(results.totalCost)}</div>
        </div>
      </div>

      <div className="breakdown">
        <div className="breakdown-title">Cost Breakdown</div>
        <div className="breakdown-row"><span className="label">Purchase Price</span><span className="value">{fmt(results.purchase)}</span></div>
        <div className="breakdown-row"><span className="label">Rehab Cost</span><span className="value">{fmt(results.rehab)}</span></div>
        <div className="breakdown-row"><span className="label">Buying Closing Costs</span><span className="value">{fmt(results.closingBuy)}</span></div>
        <div className="breakdown-row"><span className="label">Selling Closing Costs</span><span className="value">{fmt(results.closingSell)}</span></div>
        <div className="breakdown-row"><span className="label">Holding Costs</span><span className="value">{fmt(results.holdingTotal)}</span></div>
        {results.financingCost > 0 && <div className="breakdown-row"><span className="label">Financing Interest</span><span className="value">{fmt(results.financingCost)}</span></div>}
        {results.originationFee > 0 && <div className="breakdown-row"><span className="label">Origination Fee</span><span className="value">{fmt(results.originationFee)}</span></div>}
        <hr className="divider" />
        <div className="breakdown-row"><span className="label">Total All-In Cost</span><span className="value gold">{fmt(results.totalCost)}</span></div>
        <div className="breakdown-row"><span className="label">Sale Price (ARV)</span><span className="value">{fmt(+f.arv)}</span></div>
        <hr className="divider" />
        <div className="breakdown-row"><span className="label">Net Profit</span><span className={`value ${colorClass(results.profit)}`}>{fmt(results.profit)}</span></div>
      </div>
      <button className="reset-btn" onClick={() => setResults(null)}>← analyze another deal</button>
    </div>
  );

  return (
    <>
      <div className="grid">
        <div className="card">
          <div className="card-title">Property</div>
          <div className="field"><label>Purchase Price</label><input type="number" placeholder="150000" value={f.purchasePrice} onChange={set("purchasePrice")} /></div>
          <div className="field"><label>Rehab Cost</label><input type="number" placeholder="45000" value={f.rehabCost} onChange={set("rehabCost")} /></div>
          <div className="field"><label>After Repair Value (ARV)</label><input type="number" placeholder="260000" value={f.arv} onChange={set("arv")} /></div>
        </div>
        <div className="card">
          <div className="card-title">Holding & Financing</div>
          <div className="field"><label>Holding Period (months)</label><input type="number" placeholder="6" value={f.holdingMonths} onChange={set("holdingMonths")} /></div>
          <div className="field"><label>Monthly Holding Costs</label><input type="number" placeholder="1200" value={f.holdingCostPerMonth} onChange={set("holdingCostPerMonth")} /></div>
          <div className="field"><label>Hard Money Rate (%/yr)</label><input type="number" placeholder="10" value={f.financingRate} onChange={set("financingRate")} /></div>
          <div className="field"><label>Origination Points (%)</label><input type="number" placeholder="2" value={f.financingPoints} onChange={set("financingPoints")} /></div>
        </div>
        <div className="card">
          <div className="card-title">Closing Costs</div>
          <div className="field"><label>Buy-Side Closing Costs (%)</label><input type="number" placeholder="1" value={f.closingBuy} onChange={set("closingBuy")} /></div>
          <div className="field"><label>Sell-Side Closing Costs (%)</label><input type="number" placeholder="7" value={f.closingSell} onChange={set("closingSell")} /></div>
        </div>
      </div>
      <button className="analyze-btn" onClick={analyze}>ANALYZE DEAL</button>
    </>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("brrrr");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <h1>DEAL<span>CHECK</span></h1>
          <p>Real Estate Deal Analyzer · Richmond, VA</p>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === "brrrr" ? "active" : ""}`} onClick={() => setTab("brrrr")}>BRRRR Rental</button>
          <button className={`tab ${tab === "flip" ? "active" : ""}`} onClick={() => setTab("flip")}>Fix & Flip</button>
        </div>
        <div className="container">
          {tab === "brrrr" ? <BRRRRAnalyzer /> : <FlipAnalyzer />}
        </div>
      </div>
    </>
  );
}
