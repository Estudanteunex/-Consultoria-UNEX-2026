// App Logic & Interactivity

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize Charts
  initCharts();
  
  // Initial Simulation Calculation
  updateSim();
});

// Tab Switching System
function switchTab(tabId) {
  // Hide all sections
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  
  // Show active section
  const targetSec = document.getElementById(`sec-${tabId}`);
  if (targetSec) {
    targetSec.classList.remove('hidden');
  }

  // Reset tab button styling
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50";
  });

  // Highlight active button
  const activeBtn = document.getElementById(`tab-${tabId}`);
  if (activeBtn) {
    activeBtn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-amber-400 bg-amber-400/10 border border-amber-400/30";
  }
}

// Financial Simulator Logic
function updateSim() {
  const preco = parseFloat(document.getElementById('input-preco').value);
  const custo = parseFloat(document.getElementById('input-custo').value);

  const margemAbs = preco - custo;
  const margemPct = (margemAbs / preco) * 100;
  const paybackUnits = Math.ceil(3000 / (margemAbs > 0 ? margemAbs : 1));

  document.getElementById('val-preco').innerText = `R$ ${preco.toLocaleString('pt-BR')}`;
  document.getElementById('val-custo').innerText = `R$ ${custo.toLocaleString('pt-BR')}`;

  document.getElementById('res-margem-abs').innerText = `R$ ${margemAbs.toLocaleString('pt-BR')}`;
  document.getElementById('res-margem-pct').innerText = `${margemPct.toFixed(1)}%`;
  document.getElementById('res-payback').innerText = margemAbs > 0 ? paybackUnits : "N/A";
}

// Chart.js Configuration
function initCharts() {
  // MDF Reuse Chart
  const ctxMDF = document.getElementById('chartMDF');
  if (ctxMDF) {
    new Chart(ctxMDF, {
      type: 'doughnut',
      data: {
        labels: ['Reaproveitado (Meta)', 'Descarte / Perda'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#d4af37', '#334155'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        cutout: '75%'
      }
    });
  }

  // KPIs Radar Chart
  const ctxKPIs = document.getElementById('chartKPIs');
  if (ctxKPIs) {
    new Chart(ctxKPIs, {
      type: 'polarArea',
      data: {
        labels: ['CSAT (4.5/5)', 'Conversão (10%)', 'Retrabalho (≤5%)'],
        datasets: [{
          data: [90, 75, 95],
          backgroundColor: [
            'rgba(212, 175, 55, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(16, 185, 129, 0.6)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          r: { ticks: { display: false }, grid: { color: '#334155' } }
        }
      }
    });
  }
}